import pRetry from 'p-retry'
import pTimeout from 'p-timeout'
import type {ParsedEvent} from 'starknet'

import {StarknetChainId} from './chains'
import {getSatoruContractAddress, SatoruContract} from './contracts'
import {getSatoruEventHash, type ParsedSatoruEvent, parseSatoruEvent, SatoruEvent} from './events'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type -- in order to achieve optional generic
export type SatoruEventHandler<T extends SatoruEvent | void = void> = (
  event: T extends SatoruEvent ? ParsedSatoruEvent<T> : ParsedEvent,
) => void

export type SatoruWebSocketProvider = ReturnType<typeof createWebsocketProvider>

export default function createWebsocketProvider(url: string, chainId: StarknetChainId) {
  const eventEmitterAddress = getSatoruContractAddress(chainId, SatoruContract.EventEmitter)

  const ws = new WebSocket(url)
  let id = 0
  const pendingMessages: string[] = []
  const promises = new Map<
    number,
    | {
        isSubscribe: true
        eventHandler: SatoruEventHandler
        eventName: SatoruEvent
        resolve: (unsubscriber: () => Promise<void>) => void
        reject: (error: Error) => void
      }
    | {
        isSubscribe: false
        resolve: (result: boolean) => void
        reject: (error: Error) => void
      }
  >()
  const eventHandlers = new Map<number, SatoruEventHandler>()
  const eventNames = new Map<number, SatoruEvent>()
  let onOpenEventHandler: (() => void) | undefined = undefined
  let onCloseEventHandler: (() => void) | undefined = undefined
  let onErrorEventHandler: ((error: unknown) => void) | undefined = undefined

  ws.onopen = () => {
    if (onOpenEventHandler) {
      onOpenEventHandler()
    } else {
      console.debug(`WebSocket Provider connected to ${url}`)
    }
    while (pendingMessages.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guranteed non-null
      ws.send(pendingMessages.shift()!)
    }
  }

  ws.onerror = error => {
    if (onErrorEventHandler) {
      onErrorEventHandler(error)
      return
    }

    console.error(`WebSocketProvider error:`, error)
  }

  ws.onclose = () => {
    if (onCloseEventHandler) {
      onCloseEventHandler()
      return
    }

    console.debug('WebSocket Provider disconnected')
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity -- TODO: refactor to reduce cognitive complexity
  ws.onmessage = message => {
    console.debug(`WebSocketProvider received message: ${message.data}`)

    if (typeof message.data !== 'string') return
    const data = JSON.parse(message.data)

    if (data && typeof data === 'object' && 'result' in data) {
      // Subscribe & Unsubscribe messages
      if ('id' in data && typeof data.id === 'number') {
        const id = data.id
        if (promises.has(id)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guranteed non-null
          const promise = promises.get(id)!

          if (promise.isSubscribe) {
            if (typeof data.result === 'number') {
              const subscription = data.result
              eventHandlers.set(subscription, promise.eventHandler)
              eventNames.set(subscription, promise.eventName)
              promise.resolve(async () => unsubscribe(subscription))
            } else {
              promise.reject(new Error('Invalid subscription result', {cause: data}))
            }
          } else if (typeof data.result === 'boolean') promise.resolve(data.result)
          else promise.resolve(false)
          promises.delete(id)
        }
        return
      }

      // Subscription event messages
      if (
        'method' in data &&
        data.method === 'pathfinder_subscription' &&
        data.result &&
        typeof data.result === 'object' &&
        'subscription' in data.result &&
        typeof data.result.subscription === 'number' &&
        'result' in data.result
      ) {
        const handler = eventHandlers.get(data.result.subscription)
        const eventName = eventNames.get(data.result.subscription)
        if (!handler) return
        const parsedEvent = parseSatoruEvent(eventName, data.result.result)
        if (!parsedEvent) return
        handler(parsedEvent as never)
      }
    }
  }

  async function send<T extends SatoruEvent>(
    message: {method: string; params: unknown},
    eventName: T,
    eventHandler: SatoruEventHandler<T>,
    timeout: number,
  ): Promise<() => Promise<boolean>>
  async function send(message: {method: string; params: unknown}): Promise<void>
  async function send(
    message: {method: string; params: unknown},
    eventName?: SatoruEvent,
    eventHandler?: SatoruEventHandler,
    timeout = 10000, // ms
  ) {
    if ([WebSocket.CLOSED, WebSocket.CLOSING].includes(ws.readyState)) {
      return Promise.reject(new Error('WebSocket Provider is closed'))
    }

    id++
    const toSend = JSON.stringify({
      id,
      jsonrpc: '2.0',
      method: message.method,
      params: message.params,
    })

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(toSend)
    } else if (ws.readyState === WebSocket.CONNECTING) {
      pendingMessages.push(toSend)
    }

    const promise = new Promise((resolve, reject) => {
      if (eventName && eventHandler) {
        promises.set(id, {isSubscribe: true, eventName, eventHandler, resolve, reject})
        return
      }

      promises.set(id, {isSubscribe: false, resolve, reject})
    })

    const timeoutPromise = pTimeout(promise, {
      milliseconds: timeout,
      message: `Send message timed out after ${timeout}ms`,
    }).catch(error => {
      promises.delete(id)
      throw error
    })

    return timeoutPromise
  }

  async function subscribeTo<T extends SatoruEvent>(
    event: T,
    eventHandler: SatoruEventHandler<T>,
    timeout = 10000, // ms
    retries: number = 3, // number of retries before reject, 0 for no retries
  ): Promise<() => Promise<boolean>> {
    const eventHash = getSatoruEventHash(event)

    async function trySend() {
      return send(
        {
          method: 'pathfinder_subscribe',
          params: {
            kind: 'events',
            address: eventEmitterAddress,
            keys: [[eventHash]],
          },
        },
        event,
        eventHandler,
        timeout,
      )
    }

    return await pRetry(trySend, {retries, minTimeout: 0, maxTimeout: 0, factor: 1})
  }

  // TODO: implement timeout and retry
  async function unsubscribe(id: number) {
    eventHandlers.delete(id)
    eventNames.delete(id)

    return send({
      method: 'pathfinder_unsubscribe',
      params: [id],
    })
  }

  function onOpen(handler: () => void) {
    onOpenEventHandler = handler
  }

  function onClose(handler: () => void) {
    onCloseEventHandler = handler
  }

  function onError(handler: (error: unknown) => void) {
    onErrorEventHandler = handler
  }

  function close() {
    ws.close()
  }

  return {
    subscribeTo,
    close,
    onOpen,
    onClose,
    onError,
  }
}

// Usages:
// const wssProvider = getProvider(ProviderType.WSS, StarknetChainId.SN_SEPOLIA)

// const eventHandler: SatoruEventHandler<SatoruEvent.OrderCreated> = e => {
//   console.log(e.order)
// }
// const unsubscribe = await wssProvider.subscribeTo(SatoruEvent.OrderCreated, eventHandler)
// const handleOnOpen = () => {
//   console.log('wss openned')
// }
// wssProvider.onOpen(handleOnOpen)
// const handleOnClose = () => {
//   console.log('wss closed')
// }
// wssProvider.onClose(handleOnClose)
// const handleOnError = (error: unknown) => {
//   console.log('wss error:', error)
// }
// wssProvider.onError(handleOnError)

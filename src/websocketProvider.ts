import type {ParsedEvent} from 'starknet'

import type {StarknetChainId} from './chains'
import {getSatoruContractAddress, SatoruContract} from './contracts'
import {
  getSatoruEventHash,
  type ParsedSatoruEvent,
  parseSatoruEvent,
  type SatoruEvent,
} from './events'

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
        eventHandler: SatoruEventHandler
        resolve: (unsubscriber: () => Promise<void>) => void
        reject: (error: Error) => void
      }
    | {
        eventHandler: undefined
        resolve: (result: boolean) => void
        reject: (error: Error) => void
      }
  >()
  const eventHandlers = new Map<number, SatoruEventHandler>()

  ws.onopen = () => {
    console.log(`WebSocket Provider connected to ${url}`)
    while (pendingMessages.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guranteed non-null
      ws.send(pendingMessages.shift()!)
    }
  }

  ws.onerror = error => {
    console.error(`WebSocketProvider error:`, error)
  }

  ws.onmessage = message => {
    console.log(`WebSocketProvider received message: ${message.data}`)

    if (typeof message.data !== 'string') return
    const data = JSON.parse(message.data)

    if (data && typeof data === 'object' && 'result' in data) {
      // Subscribe & Unsubscribe messages
      if ('id' in data && typeof data.id === 'number') {
        const id = data.id
        if (promises.has(id)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guranteed non-null
          const promise = promises.get(id)!

          if (promise.eventHandler) {
            if (typeof data.result === 'number') {
              const subscription = data.result
              eventHandlers.set(subscription, promise.eventHandler)
              promise.resolve(async () => unsubscribe(subscription))
            } else
              promise.resolve(async () => {
                // empty
              })
          } else {
            if (typeof data.result === 'boolean') promise.resolve(data.result)
            else promise.resolve(false)
          }
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
        if (!handler) return
        const parsedEvent = parseSatoruEvent(data.result.result)
        if (!parsedEvent) return
        handler(parsedEvent as never)
      }
    }
  }

  ws.onclose = () => {
    console.log('WebSocket Provider disconnected')
  }

  async function send<T extends SatoruEvent>(
    message: {method: string; params: unknown},
    eventHandler: SatoruEventHandler<T>,
  ): Promise<() => Promise<boolean>>
  async function send(message: {method: string; params: unknown}): Promise<void>
  async function send(
    message: {method: string; params: unknown},
    eventHandler?: SatoruEventHandler,
  ) {
    if ([WebSocket.CLOSED, WebSocket.CLOSING].includes(ws.readyState)) {
      return Promise.reject(new Error('WebSocket Provider is not closed'))
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
    }

    if (ws.readyState === WebSocket.CONNECTING) {
      pendingMessages.push(toSend)
    }

    return new Promise((resolve, reject) => {
      promises.set(id, {eventHandler, resolve, reject})
    })
  }

  async function subscribeToEvent<T extends SatoruEvent>(
    event: T,
    eventHandler: SatoruEventHandler<T>,
  ) {
    const eventHash = getSatoruEventHash(event)
    return send(
      {
        method: 'pathfinder_subscribe',
        params: {
          kind: 'events',
          address: eventEmitterAddress,
          keys: [[eventHash]],
        },
      },
      eventHandler,
    )
  }

  async function unsubscribe(id: number) {
    return send({
      method: 'pathfinder_unsubscribe',
      params: [id],
    })
  }

  function close() {
    ws.close()
  }

  return {
    subscribeToEvent,
    close,
  }
}

// Usages:
// const wssProvider = getWssProvider(chainId)

// const eventHandler: SatoruEventHandler<SatoruEvent.OrderCreated> = e => {
//   console.log(e)
// }
// const unsubscribe = await wssProvider.subscribeToEvent(SatoruEvent.OrderCreated, eventHandler)

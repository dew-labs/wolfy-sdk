import random from 'just-random'
import {RpcProvider} from 'starknet'
import invariant from 'tiny-invariant'

import {StarknetChainId} from './chains'
import type {WolfyWebSocketProvider} from './websocketProvider'
import createWebsocketProvider from './websocketProvider'

export enum ProviderType {
  HTTP = 'HTTP',
  WSS = 'WSS',
}

export interface ProviderConfig {
  url: string
  weight: number
}

const RPC_PROVIDERS: Record<ProviderType, Record<StarknetChainId, ProviderConfig[]>> = {
  [ProviderType.HTTP]: {
    [StarknetChainId.SN_SEPOLIA]: [],
    [StarknetChainId.SN_MAIN]: [],
    [StarknetChainId.SN_KATANA]: [],
  },
  [ProviderType.WSS]: {
    [StarknetChainId.SN_SEPOLIA]: [],
    [StarknetChainId.SN_MAIN]: [],
    [StarknetChainId.SN_KATANA]: [],
  },
}

export function registerProvider(
  type: ProviderType,
  chainId: StarknetChainId,
  url: string,
  weight = 1,
): void {
  if (!Number.isSafeInteger(weight) || weight < 1) {
    throw new Error('Weight must be a positive safe integer')
  }

  const providersConfigs = RPC_PROVIDERS[type][chainId]

  const existProviderConfigIndex = providersConfigs.findIndex(provider => {
    return provider.url === url && provider.weight === weight
  })

  if (existProviderConfigIndex !== -1) {
    providersConfigs[existProviderConfigIndex] = {
      url,
      weight,
    }
    return
  }

  providersConfigs.push({
    url,
    weight,
  })
}

export function unregisterProvider(
  type: ProviderType,
  chainId: StarknetChainId,
  url: string,
): void {
  const providersConfigs = RPC_PROVIDERS[type][chainId]
  const index = providersConfigs.findIndex(provider => provider.url === url)
  if (index !== -1) {
    providersConfigs.splice(index, 1)
  }
}

export function clearProviders(type: ProviderType, chainId: StarknetChainId): void {
  RPC_PROVIDERS[type][chainId] = []
}

export function getProvider(type: ProviderType.HTTP, chainId: StarknetChainId): RpcProvider
export function getProvider(
  type: ProviderType.WSS,
  chainId: StarknetChainId,
): WolfyWebSocketProvider
export function getProvider(
  type: ProviderType,
  chainId: StarknetChainId,
): RpcProvider | WolfyWebSocketProvider {
  const providersConfigs = RPC_PROVIDERS[type][chainId]

  if (providersConfigs.length === 0) {
    throw new Error(`No provider found for type: ${type} and chain ID: ${chainId}`)
  }

  const providers: string[] = []

  providersConfigs.forEach(providerConfig => {
    providers.push(...(new Array(providerConfig.weight).fill(providerConfig.url) as string[]))
  })

  const providerUrl = random(providers)
  invariant(providerUrl)

  if (type === ProviderType.HTTP) {
    return new RpcProvider({
      nodeUrl: providerUrl,
      batch: 0,
    })
  }

  return createWebsocketProvider(providerUrl, chainId)
}

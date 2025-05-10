import random from 'just-random'
import {RpcProvider, type RpcProviderOptions} from 'starknet'
import invariant from 'tiny-invariant'

import {StarknetChainId} from './chains'
import type {WolfyWebSocketProvider} from './websocketProvider'
import createWebsocketProvider from './websocketProvider'

export type ProviderSpec = '0.7.1' | '0.8.1'
const DEFAULT_SPEC_VERSION: ProviderSpec = '0.7.1'

export enum ProviderType {
  HTTP = 'HTTP',
  WSS = 'WSS',
}

export interface ProviderConfig {
  url: string
  weight: number
  specVersion: ProviderSpec
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
  specVersion: ProviderSpec = DEFAULT_SPEC_VERSION,
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
      specVersion,
    }
    return
  }

  providersConfigs.push({
    url,
    weight,
    specVersion,
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

export function getProvider(
  type: ProviderType.HTTP,
  chainId: StarknetChainId,
  options?: RpcProviderOptions,
): RpcProvider
export function getProvider(
  type: ProviderType.WSS,
  chainId: StarknetChainId,
  options?: RpcProviderOptions,
): WolfyWebSocketProvider
export function getProvider(
  type: ProviderType,
  chainId: StarknetChainId,
  options?: RpcProviderOptions,
): RpcProvider | WolfyWebSocketProvider {
  const providersConfigs = RPC_PROVIDERS[type][chainId]

  if (providersConfigs.length === 0) {
    throw new Error(`No provider found for type: ${type} and chain ID: ${chainId}`)
  }

  const desiredSpecVersion = options?.specVersion ?? DEFAULT_SPEC_VERSION

  const providers: {url: string; specVersion: ProviderSpec}[] = []

  providersConfigs.forEach(providerConfig => {
    if (providerConfig.specVersion !== desiredSpecVersion) return

    providers.push(
      ...(new Array(providerConfig.weight).fill({
        url: providerConfig.url,
        specVersion: providerConfig.specVersion,
      }) as {url: string; specVersion: ProviderSpec}[]),
    )
  })

  const provider = random(providers)
  invariant(provider)

  if (type === ProviderType.HTTP) {
    return new RpcProvider({
      nodeUrl: provider.url,
      specVersion: provider.specVersion,
      batch: 0,
      ...options,
    })
  }

  return createWebsocketProvider(provider.url, chainId)
}

import random from 'just-random'
import {RpcProvider} from 'starknet'

import {StarknetChainId} from './chains'

export enum ProviderType {
  HTTP = 'HTTP',
  WSS = 'WSS',
}

interface ProviderConfig {
  url: string
  weight: number
}

const RPC_PROVIDERS: Record<ProviderType, Record<StarknetChainId, ProviderConfig[]>> = {
  [ProviderType.HTTP]: {
    [StarknetChainId.SN_SEPOLIA]: [],
    [StarknetChainId.SN_MAIN]: [],
  },
  [ProviderType.WSS]: {
    [StarknetChainId.SN_SEPOLIA]: [],
    [StarknetChainId.SN_MAIN]: [],
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

export function getProvider(type: ProviderType, chainId: StarknetChainId): RpcProvider | undefined {
  const providersConfigs = RPC_PROVIDERS[type][chainId]

  if (providersConfigs.length === 0) {
    throw new Error(`No provider found for type: ${type} and chain ID: ${chainId}`)
  }

  const providers: string[] = []

  providersConfigs.forEach(providerConfig => {
    providers.push(...(new Array(providerConfig.weight).fill(providerConfig.url) as string[]))
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guaranteed non-null
  const providerUrl = random(providers)!

  if (type === ProviderType.HTTP) {
    return new RpcProvider({
      nodeUrl: providerUrl,
      batch: 0,
    })
  }
}

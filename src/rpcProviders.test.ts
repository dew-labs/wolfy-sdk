import {RpcProvider} from 'starknet'
import {afterEach, describe, expect, it, vi} from 'vitest'

import {StarknetChainId} from './chains'
import {clearProviders, getProvider, ProviderType, registerProvider} from './rpcProviders'
import createWebsocketProvider from './websocketProvider'

vi.mock('./websocketProvider', () => ({
  default: vi.fn().mockImplementation(() => ({
    nodeUrl: '',
  })),
}))

describe('rpcProviders', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  describe(getProvider, () => {
    it('should throw error when no provider is registered', () => {
      expect(() => getProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN)).toThrow(
        `No provider found for type: HTTP and chain ID: ${StarknetChainId.SN_MAIN}`,
      )
    })

    it('should return HTTP provider when type is HTTP', () => {
      registerProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN, 'https://example.com', 1)
      const provider = getProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN)

      expect(provider).toBeInstanceOf(RpcProvider)
    })

    it('should return WebSocket provider when type is WSS', () => {
      registerProvider(ProviderType.WSS, StarknetChainId.SN_MAIN, 'wss://example.com', 1)
      const provider = getProvider(ProviderType.WSS, StarknetChainId.SN_MAIN)

      expect(createWebsocketProvider).toHaveBeenCalledWith(
        'wss://example.com',
        StarknetChainId.SN_MAIN,
      )
      expect(provider).toBeDefined()
    })

    it('should respect provider weights in selection', () => {
      const url1 = 'https://example1.com'
      const url2 = 'https://example2.com'

      clearProviders(ProviderType.HTTP, StarknetChainId.SN_MAIN)

      registerProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN, url1, 1)
      registerProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN, url2, 3)

      // Mock random to always return the first item
      vi.mock('just-random', () => ({
        default: (arr: string[]) => arr[0],
      }))

      const provider = getProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN)

      expect(provider).toBeDefined()

      expect(provider.channel.nodeUrl).toStrictEqual(
        expect.stringMatching(/^https:\/\/example[12]\.com$/),
      )
    })
  })

  describe(registerProvider, () => {
    it('should successfully register a provider with valid parameters', () => {
      expect(() => {
        registerProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN, 'https://example.com', 1)
      }).not.toThrow()

      const provider = getProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN)

      expect(provider).toBeDefined()
    })

    it('should throw error when weight is less than 1', () => {
      expect(() => {
        registerProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN, 'https://example.com', 0)
      }).toThrow('Weight must be a positive safe integer')
    })

    it('should throw error when weight is not a safe integer', () => {
      expect(() => {
        registerProvider(
          ProviderType.HTTP,
          StarknetChainId.SN_MAIN,
          'https://example.com',
          Number.MAX_SAFE_INTEGER + 1,
        )
      }).toThrow('Weight must be a positive safe integer')
    })

    it('should update existing provider if same URL and weight', () => {
      registerProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN, 'https://example.com', 1)
      registerProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN, 'https://example.com', 1)

      expect(() => getProvider(ProviderType.HTTP, StarknetChainId.SN_MAIN)).not.toThrow()
    })
  })
})

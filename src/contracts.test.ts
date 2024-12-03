import {Contract} from 'starknet'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {MulticallABI} from './abis'
import {StarknetChainId} from './chains'
import {
  createTokenContract,
  createWolfyContract,
  getWolfyContractAddress,
  isWolfyContract,
  registerWolfyContractAddress,
  WOLFY_CONTRACT_ADDRESSES,
  WolfyContract,
} from './contracts'
import {getProvider} from './rpcProviders'

// Mock the provider
vi.mock('./rpcProviders', () => ({
  getProvider: vi.fn(() => ({
    // Add minimal provider implementation needed for tests
    getChainId: vi.fn(),
    waitForTransaction: vi.fn(),
  })),
  ProviderType: {
    HTTP: 'http',
  },
}))

describe('wolfy Contracts', () => {
  const testAddress = '0x123456789abcdef'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('isWolfyContract', () => {
    it('should return true for valid contract names', () => {
      expect.assertions(3)

      expect(isWolfyContract('Multicall')).toBe(true)
      expect(isWolfyContract('DataStore')).toBe(true)
      expect(isWolfyContract('Router')).toBe(true)
    })

    it('should return false for invalid contract names', () => {
      expect.assertions(2)

      expect(isWolfyContract('InvalidContract')).toBe(false)
      expect(isWolfyContract('')).toBe(false)
    })
  })

  describe('contract Address Management', () => {
    beforeEach(() => {
      // Reset the WOLFY_CONTRACT_ADDRESSES for Katana chain before each test
      WOLFY_CONTRACT_ADDRESSES[StarknetChainId.SN_KATANA] = {}
    })

    it('should register and retrieve contract address', () => {
      expect.assertions(1)

      registerWolfyContractAddress(StarknetChainId.SN_KATANA, WolfyContract.Multicall, testAddress)

      const retrievedAddress = getWolfyContractAddress(
        StarknetChainId.SN_KATANA,
        WolfyContract.Multicall,
      )

      expect(retrievedAddress).toBe(testAddress)
    })

    it('should throw error when getting non-existent contract address', () => {
      expect.assertions(1)

      expect(() =>
        getWolfyContractAddress(StarknetChainId.SN_KATANA, WolfyContract.Multicall),
      ).toThrow('No contract address found for chain ID')
    })
  })

  describe('contract Creation', () => {
    beforeEach(() => {
      registerWolfyContractAddress(StarknetChainId.SN_KATANA, WolfyContract.Multicall, testAddress)
    })

    it('should create Wolfy contract instance', () => {
      expect.assertions(3)

      const contract = createWolfyContract(
        StarknetChainId.SN_KATANA,
        WolfyContract.Multicall,
        MulticallABI,
      )

      expect(getProvider).toHaveBeenCalledWith('http', StarknetChainId.SN_KATANA)
      expect(contract).toBeInstanceOf(Contract)
      expect(contract.address).toBe(testAddress)
    })

    it('should create token contract instance', () => {
      expect.assertions(3)

      const tokenContract = createTokenContract(StarknetChainId.SN_KATANA, testAddress)

      expect(getProvider).toHaveBeenCalledWith('http', StarknetChainId.SN_KATANA)
      expect(tokenContract).toBeInstanceOf(Contract)
      expect(tokenContract.address).toBe(testAddress)
    })
  })

  describe('contract Addresses Constants', () => {
    it('should have correct Multicall address for Sepolia', () => {
      expect.assertions(1)

      expect(WOLFY_CONTRACT_ADDRESSES[StarknetChainId.SN_SEPOLIA][WolfyContract.Multicall]).toBe(
        '0x062e7261fc39b214e56a5dc9b6f77674d953973d1b8892f14d76f88c97909647',
      )
    })

    it('should have correct Multicall address for Mainnet', () => {
      expect.assertions(1)

      expect(WOLFY_CONTRACT_ADDRESSES[StarknetChainId.SN_MAIN][WolfyContract.Multicall]).toBe(
        '0x620d16d511f5732fffc6ac780352619396f42f43ee3124af4123db199f0be2e',
      )
    })
  })
})

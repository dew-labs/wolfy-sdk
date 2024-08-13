import {Contract} from 'starknet'

import DataStoreABI from '@/abis/DataStoreABI'
import DepositVaultABI from '@/abis/DepositVaultABI'
import EventEmitterABI from '@/abis/EventEmitterABI'
import ExchangeRouterABI from '@/abis/ExchangeRouterABI'
import MulticallABI from '@/abis/MulticallABI'
import OrderVaultABI from '@/abis/OrderVaultABI'
import ReaderABI from '@/abis/ReaderABI'
import ReferralStorageABI from '@/abis/ReferralStorageABI'
import RouterABI from '@/abis/RouterABI'
import WithdrawalVaultABI from '@/abis/WithdrawalVaultABI'

import {StarknetChainId} from './chains'
import {getProvider, ProviderType} from './rpcProviders'

export enum SatoruContract {
  Multicall = 'Multicall',
  DataStore = 'DataStore',
  EventEmitter = 'EventEmitter',
  ReferralStorage = 'ReferralStorage',
  OrderVault = 'OrderVault',
  DepositVault = 'DepositVault',
  WithdrawalVault = 'WithdrawalVault',
  Reader = 'Reader',
  Router = 'Router',
  ExchangeRouter = 'ExchangeRouter',
}

export interface SatoruContractAbis {
  [SatoruContract.Multicall]: typeof MulticallABI
  [SatoruContract.DataStore]: typeof DataStoreABI
  [SatoruContract.EventEmitter]: typeof EventEmitterABI
  [SatoruContract.ReferralStorage]: typeof ReferralStorageABI
  [SatoruContract.OrderVault]: typeof OrderVaultABI
  [SatoruContract.DepositVault]: typeof DepositVaultABI
  [SatoruContract.WithdrawalVault]: typeof WithdrawalVaultABI
  [SatoruContract.Reader]: typeof ReaderABI
  [SatoruContract.Router]: typeof RouterABI
  [SatoruContract.ExchangeRouter]: typeof ExchangeRouterABI
}

export type SatoruContractAbi<T extends SatoruContract> = SatoruContractAbis[T]

export const SATORU_CONTRACT_ADDRESSES: Record<
  StarknetChainId,
  Partial<Record<SatoruContract, string>>
> = {
  [StarknetChainId.SN_SEPOLIA]: {
    [SatoruContract.Multicall]:
      '0x062e7261fc39b214e56a5dc9b6f77674d953973d1b8892f14d76f88c97909647',
  },
  [StarknetChainId.SN_MAIN]: {
    [SatoruContract.Multicall]: '0x620d16d511f5732fffc6ac780352619396f42f43ee3124af4123db199f0be2e',
  },
}

export function registerSatoruContractAddress(
  chainId: StarknetChainId,
  contract: SatoruContract,
  address: string,
) {
  SATORU_CONTRACT_ADDRESSES[chainId][contract] = address
}

export function getSatoruContractAddress(
  chainId: StarknetChainId,
  contract: SatoruContract,
): string {
  if (!SATORU_CONTRACT_ADDRESSES[chainId][contract]) {
    throw new Error(`No contract address found for chain ID: ${chainId}`)
  }

  return SATORU_CONTRACT_ADDRESSES[chainId][contract]
}

export function createSatoruContract<T extends SatoruContract>(
  chainId: StarknetChainId,
  contract: T,
  abi: SatoruContractAbi<T>,
) {
  const provider = getProvider(ProviderType.HTTP, chainId)
  if (!provider) {
    throw new Error(`No http provider found for chain ID: ${chainId}`)
  }

  return new Contract(abi, getSatoruContractAddress(chainId, contract), provider).typedv2(abi)
}

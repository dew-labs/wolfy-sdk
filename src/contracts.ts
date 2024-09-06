import {type AccountInterface, type Call, Contract} from 'starknet'

import {
  type AdlHandlerABI,
  type DataStoreABI,
  type DepositHandlerABI,
  type DepositVaultABI,
  ERC20ABI,
  type EventEmitterABI,
  type ExchangeRouterABI,
  type FeeHandlerABI,
  type LiquidationHandlerABI,
  type MarketFactoryABI,
  type MulticallABI,
  type OrderHandlerABI,
  type OrderVaultABI,
  type ReaderABI,
  type ReferralStorageABI,
  type RoleStoreABI,
  type RouterABI,
  type SwapHandlerABI,
  type WithdrawalHandlerABI,
  type WithdrawalVaultABI,
} from './abis'
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
  //----------------------------------------------------------------------------v
  RoleStore = 'RoleStore',
  MarketFactory = 'MarketFactory',
  OrderHandler = 'OrderHandler',
  DepositHandler = 'DepositHandler',
  WithdrawalHandler = 'WithdrawalHandler',
  AdlHandler = 'AdlHandler',
  LiquidationHandler = 'LiquidationHandler',
  SwapHandler = 'SwapHandler',
  FeeHandler = 'FeeHandler',
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
  [SatoruContract.RoleStore]: typeof RoleStoreABI
  [SatoruContract.MarketFactory]: typeof MarketFactoryABI
  [SatoruContract.SwapHandler]: typeof SwapHandlerABI
  [SatoruContract.OrderHandler]: typeof OrderHandlerABI
  [SatoruContract.DepositHandler]: typeof DepositHandlerABI
  [SatoruContract.AdlHandler]: typeof AdlHandlerABI
  [SatoruContract.LiquidationHandler]: typeof LiquidationHandlerABI
  [SatoruContract.FeeHandler]: typeof FeeHandlerABI
  [SatoruContract.WithdrawalHandler]: typeof WithdrawalHandlerABI
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
): void {
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
  contractName: T,
  abi: SatoruContractAbi<T>,
  connectTo?: AccountInterface,
) {
  const provider = getProvider(ProviderType.HTTP, chainId)

  const contract = new Contract(
    abi,
    getSatoruContractAddress(chainId, contractName),
    provider,
  ).typedv2(abi)

  if (connectTo) contract.connect(connectTo)

  return contract
}

export function createTokenContract(
  chainId: StarknetChainId,
  address: string,
  connectTo?: AccountInterface,
) {
  const provider = getProvider(ProviderType.HTTP, chainId)

  const contract = new Contract(ERC20ABI, address, provider).typedv2(ERC20ABI)

  if (connectTo) contract.connect(connectTo)

  return contract
}

export async function executeAndWait(account: AccountInterface, calls: Call | Call[]) {
  const result = await account.execute(calls)
  return await account.waitForTransaction(result.transaction_hash)
}

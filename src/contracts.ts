import {type AccountInterface, type Call, Contract, type TypedContractV2} from 'starknet'

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

export enum WolfyContract {
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

export function isWolfyContract(contractName: string): contractName is WolfyContract {
  return contractName in WolfyContract
}

export interface WolfyContractAbis {
  [WolfyContract.Multicall]: typeof MulticallABI
  [WolfyContract.DataStore]: typeof DataStoreABI
  [WolfyContract.EventEmitter]: typeof EventEmitterABI
  [WolfyContract.ReferralStorage]: typeof ReferralStorageABI
  [WolfyContract.OrderVault]: typeof OrderVaultABI
  [WolfyContract.DepositVault]: typeof DepositVaultABI
  [WolfyContract.WithdrawalVault]: typeof WithdrawalVaultABI
  [WolfyContract.Reader]: typeof ReaderABI
  [WolfyContract.Router]: typeof RouterABI
  [WolfyContract.ExchangeRouter]: typeof ExchangeRouterABI
  [WolfyContract.RoleStore]: typeof RoleStoreABI
  [WolfyContract.MarketFactory]: typeof MarketFactoryABI
  [WolfyContract.SwapHandler]: typeof SwapHandlerABI
  [WolfyContract.OrderHandler]: typeof OrderHandlerABI
  [WolfyContract.DepositHandler]: typeof DepositHandlerABI
  [WolfyContract.AdlHandler]: typeof AdlHandlerABI
  [WolfyContract.LiquidationHandler]: typeof LiquidationHandlerABI
  [WolfyContract.FeeHandler]: typeof FeeHandlerABI
  [WolfyContract.WithdrawalHandler]: typeof WithdrawalHandlerABI
}

export type WolfyContractAbi<T extends WolfyContract> = WolfyContractAbis[T]

export const WOLFY_CONTRACT_ADDRESSES: Record<
  StarknetChainId,
  Partial<Record<WolfyContract, string>>
> = {
  [StarknetChainId.SN_SEPOLIA]: {
    [WolfyContract.Multicall]: '0x062e7261fc39b214e56a5dc9b6f77674d953973d1b8892f14d76f88c97909647',
  },
  [StarknetChainId.SN_MAIN]: {
    [WolfyContract.Multicall]: '0x620d16d511f5732fffc6ac780352619396f42f43ee3124af4123db199f0be2e',
  },
  [StarknetChainId.SN_KATANA]: {},
}

export function registerWolfyContractAddress(
  chainId: StarknetChainId,
  contract: WolfyContract,
  address: string,
): void {
  WOLFY_CONTRACT_ADDRESSES[chainId][contract] = address
}

export function getWolfyContractAddress(chainId: StarknetChainId, contract: WolfyContract): string {
  if (!WOLFY_CONTRACT_ADDRESSES[chainId][contract]) {
    throw new Error(`No contract address found for chain ID: ${chainId}`)
  }

  return WOLFY_CONTRACT_ADDRESSES[chainId][contract]
}

export function createWolfyContract<T extends WolfyContract>(
  chainId: StarknetChainId,
  contractName: T,
  abi: WolfyContractAbi<T>,
  connectTo?: AccountInterface,
): TypedContractV2<WolfyContractAbi<T>> {
  const provider = getProvider(ProviderType.HTTP, chainId)

  const contract = new Contract(
    abi,
    getWolfyContractAddress(chainId, contractName),
    provider,
  ).typedv2(abi)

  if (connectTo) contract.connect(connectTo)

  return contract
}

export function createTokenContract(
  chainId: StarknetChainId,
  address: string,
  connectTo?: AccountInterface,
): TypedContractV2<typeof ERC20ABI> {
  const provider = getProvider(ProviderType.HTTP, chainId)

  const contract = new Contract(ERC20ABI, address, provider).typedv2(ERC20ABI)

  if (connectTo) contract.connect(connectTo)

  return contract
}

export async function executeAndWait(account: AccountInterface, calls: Call | Call[]) {
  const result = await account.execute(calls)
  return await account.waitForTransaction(result.transaction_hash)
}

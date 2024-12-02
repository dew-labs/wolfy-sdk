import type {ExtractAbiFunctionNames} from 'node_modules/abi-wan-kanabi/dist/kanabi'
import type {AccountInterface} from 'starknet'
import {
  type CallAndAbi,
  type ContractMethodArgs,
  createMulticallRequest,
  multicall,
  type MulticallResult,
} from 'starknet_multicall'

import {StarknetChainId} from './chains'
import {getWolfyContractAddress, WolfyContract, type WolfyContractAbi} from './contracts'
import {getProvider, ProviderType} from './rpcProviders'

export function createWolfyMulticallRequest<
  ContractName extends WolfyContract,
  ContractAbi extends WolfyContractAbi<ContractName>,
  Method extends ExtractAbiFunctionNames<ContractAbi>,
>(
  chainId: StarknetChainId,
  contractName: ContractName,
  abi: ContractAbi,
  method: Method,
  // @ts-expect-error -- complex typescript
  args?: ContractMethodArgs<ContractAbi, Method>,
) {
  return createMulticallRequest(
    getWolfyContractAddress(chainId, contractName),
    abi,
    method as ExtractAbiFunctionNames<ContractAbi>,
    args,
  ) as {
    abi: ContractAbi
    contractAddress: string
    entrypoint: Method
    calldata: bigint[]
  }
}

export async function wolfyMulticall<T extends CallAndAbi, Ts extends readonly T[]>(
  chainId: StarknetChainId,
  calls: Ts,
  account?: AccountInterface,
): MulticallResult<T, Ts> {
  const multicallContractAddress = getWolfyContractAddress(chainId, WolfyContract.Multicall)
  const provider = account ?? getProvider(ProviderType.HTTP, chainId)
  return await multicall(calls, multicallContractAddress, provider)
}

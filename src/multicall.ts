import type {
  Abi,
  ExtractAbiFunctionNames,
  FunctionArgs,
  FunctionRet,
} from 'node_modules/abi-wan-kanabi/dist/kanabi'
import {CallData, hash} from 'starknet'
import {createMulticallRequest} from 'starknet_multicall'

import MulticallABI from './abis/MulticallABI'
import type {StarknetChainId} from './chains'
import {createSatoruContract, SatoruContract, type SatoruContractAbi} from './contracts'

export function createSatoruMulticallRequest<
  ContractName extends SatoruContract,
  ContractAbi extends SatoruContractAbi<ContractName>,
  Method extends ExtractAbiFunctionNames<ContractAbi>,
  // @ts-expect-error -- complex typescript
  Args extends FunctionArgs<ContractAbi, Method> extends unknown[] // note: we have to do this because some how FunctionArgs is wrong for single element
    ? // @ts-expect-error -- complex typescript
      FunctionArgs<ContractAbi, Method>
    : // @ts-expect-error -- complex typescript
      [FunctionArgs<ContractAbi, Method>],
>(
  chainId: StarknetChainId,
  abi: ContractAbi,
  contractName: ContractName,
  method: Method,
  args?: Args,
) {
  const contract = createSatoruContract(chainId, contractName, abi)
  return createMulticallRequest(
    contract.address,
    abi,
    method as ExtractAbiFunctionNames<ContractAbi>,
    args,
  ) as {
    abi: ContractAbi
    contractAddress: string
    entrypoint: Method
    calldata: Args
  }
}

interface CallAndAbi {
  abi: Abi
  contractAddress: string
  entrypoint: string
  calldata: unknown
}

export async function satoruMulticall<T extends CallAndAbi, Ts extends T[]>(
  chainId: StarknetChainId,
  calls: Ts,
): Promise<{[k in keyof Ts]: FunctionRet<Ts[k]['abi'], Ts[k]['entrypoint']>}> {
  const multicallContract = createSatoruContract(chainId, SatoruContract.Multicall, MulticallABI)

  const results = await multicallContract.aggregate(
    calls.map(call => {
      return {
        to: call.contractAddress,
        selector: hash.getSelectorFromName(call.entrypoint),
        calldata: call.calldata as bigint[],
      }
    }),
  )

  // eslint-disable-next-line sonarjs/function-return-type -- complex typescript
  return results[1].map((result, index) => {
    const call = calls[index]
    if (!call)
      throw new Error('call is undefined, something went wrong with the multicall aggregation')

    return new CallData(call.abi).parse(call.entrypoint, result as unknown as string[])
  }) as {[k in keyof Ts]: FunctionRet<Ts[k]['abi'], Ts[k]['entrypoint']>}
}

import type {
  Abi,
  ExtractAbiFunctionNames,
  FunctionArgs,
  FunctionRet,
} from 'node_modules/abi-wan-kanabi/dist/kanabi'
import {CallData, hash, type RawArgs} from 'starknet'

import MulticallABI from './abis/MulticallABI'
import type {StarknetChainId} from './chains'
import {createSatoruContract, SatoruContract, type SatoruContractAbi} from './contracts'

export function createSatoruMulticallRequest<
  ContractName extends SatoruContract,
  ContractAbi extends SatoruContractAbi<ContractName>,
  Method extends ExtractAbiFunctionNames<ContractAbi>,
  // @ts-expect-error -- complex typescript
  Args extends FunctionArgs<ContractAbi, Method> extends unknown[]
    ? // @ts-expect-error -- complex typescript
      FunctionArgs<ContractAbi, Method>
    : // @ts-expect-error -- complex typescript
      [FunctionArgs<ContractAbi, Method>],
>(
  chainId: StarknetChainId,
  contractName: ContractName,
  abi: ContractAbi,
  method: Method,
  args?: Args,
): {
  abi: ContractAbi
  contractAddress: string
  entrypoint: Method
  calldata: Args
} {
  const contract = createSatoruContract(chainId, contractName, abi)
  const call = contract.populate(method, args as RawArgs)

  return {
    abi: abi,
    contractAddress: call.contractAddress,
    entrypoint: method,
    calldata: call.calldata as Args,
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

  // @ts-expect-error -- too complex
  return results[1].map((result, index) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guranteed
    const callData = new CallData(calls[index]!.abi)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- guranteed
    return callData.parse(calls[index]!.entrypoint, result as unknown as string[])
  })
}

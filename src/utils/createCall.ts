import type {Abi} from 'abi-wan-kanabi'
import type {ExtractAbiFunctionNames, FunctionArgs} from 'node_modules/abi-wan-kanabi/dist/kanabi'
import type {RawArgs, TypedContractV2} from 'starknet'

// TODO: typing events/data for invoked calls
export function createCall<T extends Abi, Method extends ExtractAbiFunctionNames<T>>(
  contract: TypedContractV2<T>,
  method: Method,
  args?: FunctionArgs<T, Method> extends unknown[] // note: we have to do this because some how FunctionArgs is wrong for single element array
    ? FunctionArgs<T, Method>
    : [FunctionArgs<T, Method>],
) {
  return contract.populate(method, args as RawArgs)
}

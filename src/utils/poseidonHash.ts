import {type BigNumberish, ec, num, shortString} from 'starknet'

import {type CairoInt, cairoIntToBigInt, isCairoInt} from './cairoInt'

export type Hashable = BigNumberish | CairoInt | boolean

export function poseidonHash(v: Hashable | Hashable[]) {
  const values = Array.isArray(v) ? v : [v]
  return ec.starkCurve.poseidonHashMany(
    values.map(value => {
      if (typeof value === 'boolean') return BigInt(value ? 1 : 0)
      if (typeof value === 'string') {
        if (num.isHex(value)) return num.toBigInt(value)
        return BigInt(shortString.encodeShortString(value))
      }
      if (typeof value === 'number') return BigInt(value)
      if (typeof value === 'bigint') return value
      if (isCairoInt(value)) return cairoIntToBigInt(value)
      throw new Error(`Unsupported value type for poseidonHash: ${value}`)
    }),
  )
}

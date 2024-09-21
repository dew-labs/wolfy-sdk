import {ec, num, shortString} from 'starknet'

export type Hashable = string | bigint | boolean | number

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
      return value
    }),
  )
}

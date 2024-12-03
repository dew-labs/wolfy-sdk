import {
  type BigNumberish,
  CairoUint256,
  CairoUint512,
  num,
  type Uint256,
  type Uint512,
} from 'starknet'

export interface SignedInteger {
  mag: number | bigint | `0x${string}` | Uint256 | Uint512
  sign: boolean
}

export type CairoInt = Uint256 | Uint512 | SignedInteger

export function isU256(n: unknown): n is Uint256 {
  return (
    n !== null &&
    typeof n === 'object' &&
    'low' in n &&
    'high' in n &&
    ['string', 'number', 'bigint'].includes(typeof n.low) &&
    ['string', 'number', 'bigint'].includes(typeof n.high)
  )
}

export function isU512(n: unknown): n is Uint512 {
  return (
    n !== null &&
    typeof n === 'object' &&
    'limb0' in n &&
    'limb1' in n &&
    'limb2' in n &&
    'limb3' in n &&
    ['string', 'number', 'bigint'].includes(typeof n.limb0) &&
    ['string', 'number', 'bigint'].includes(typeof n.limb1) &&
    ['string', 'number', 'bigint'].includes(typeof n.limb2) &&
    ['string', 'number', 'bigint'].includes(typeof n.limb3)
  )
}

export function isSignedInteger(n: unknown): n is SignedInteger {
  return (
    n !== null &&
    typeof n === 'object' &&
    'sign' in n &&
    typeof n.sign === 'boolean' &&
    'mag' in n &&
    (typeof n.mag === 'number' ||
      typeof n.mag === 'bigint' ||
      (typeof n.mag === 'string' && num.isHex(n.mag)) ||
      isU256(n.mag) ||
      isU512(n.mag))
  )
}

export function isCairoInt(n: unknown): n is CairoInt {
  return isSignedInteger(n) || isU256(n) || isU512(n)
}

export function cairoIntToBigInt(n: undefined | null | BigNumberish | CairoInt): bigint {
  if (n === undefined || n === null) return 0n

  if (typeof n === 'object') {
    if (isSignedInteger(n)) return cairoIntToBigInt(n.mag) * (n.sign ? -1n : 1n)
    if (isU256(n)) return new CairoUint256(n).toBigInt()
    if (isU512(n)) return new CairoUint512(n).toBigInt()
    throw new Error(`Invalid cairoInt ${JSON.stringify(n)}`)
  }
  return num.toBigInt(n)
}

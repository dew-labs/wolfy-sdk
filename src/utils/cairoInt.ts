import {CairoUint256, CairoUint512, num, type Uint256, type Uint512} from 'starknet'

interface SignedInteger {
  mag: number | bigint | Uint256 | Uint512
  sign: boolean
}

function isU256(num: unknown): num is Uint256 {
  return (
    num !== null &&
    typeof num === 'object' &&
    'low' in num &&
    'high' in num &&
    ['string', 'number', 'bigint'].includes(typeof num.low) &&
    ['string', 'number', 'bigint'].includes(typeof num.high)
  )
}

function isU512(num: unknown): num is Uint512 {
  return (
    num !== null &&
    typeof num === 'object' &&
    'limb0' in num &&
    'limb1' in num &&
    'limb2' in num &&
    'limb3' in num &&
    ['string', 'number', 'bigint'].includes(typeof num.limb0) &&
    ['string', 'number', 'bigint'].includes(typeof num.limb1) &&
    ['string', 'number', 'bigint'].includes(typeof num.limb2) &&
    ['string', 'number', 'bigint'].includes(typeof num.limb3)
  )
}

function isSignedInteger(num: unknown): num is SignedInteger {
  return (
    num !== null &&
    typeof num === 'object' &&
    'sign' in num &&
    typeof num.sign === 'boolean' &&
    'mag' in num &&
    (typeof num.mag === 'number' ||
      typeof num.mag === 'bigint' ||
      typeof num.mag === 'string' ||
      isU256(num.mag) ||
      isU512(num.mag))
  )
}

export function cairoIntToBigInt(
  n: string | number | bigint | Uint256 | Uint512 | SignedInteger,
): bigint {
  if (typeof n === 'object') {
    if (isSignedInteger(n)) return cairoIntToBigInt(n.mag) * (n.sign ? -1n : 1n)
    if (isU256(n)) return new CairoUint256(n).toBigInt()
    return new CairoUint512(n).toBigInt()
  }
  return num.toBigInt(n)
}

import type {BigNumberish} from 'starknet'

import {type CairoInt, cairoIntToBigInt} from './cairoInt'
import {STARKNET_HEX_STRING_ZERO, toStarknetHexString} from './starknetHexString'

export function isRepresentZero(value: BigNumberish | CairoInt | null | undefined): boolean {
  if (typeof value === 'number') return value === 0
  if (typeof value === 'bigint') return value === 0n
  if (typeof value === 'string') return toStarknetHexString(value) === STARKNET_HEX_STRING_ZERO
  return cairoIntToBigInt(value) === 0n
}

import type {BigNumberish} from 'starknet'

import {STARKNET_HEX_STRING_ZERO, toStarknetHexString} from './starknetHexString'

export function isRepresentZero(value: BigNumberish) {
  if (typeof value === 'number') return value === 0
  if (typeof value === 'bigint') return value === 0n
  return toStarknetHexString(value) === STARKNET_HEX_STRING_ZERO
}

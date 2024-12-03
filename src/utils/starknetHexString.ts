import {type BigNumberish, num} from 'starknet'

export const STARKNET_HEX_STRING_ZERO = toStarknetHexString(0)

export function toStarknetHexString(address: BigNumberish) {
  let hex = num.toHex(address)

  let isNegative = false
  if (hex.startsWith('0x-')) {
    isNegative = true
    hex = hex.slice(1)
  }

  return `${isNegative ? '-' : ''}0x${hex.slice(2).padStart(64 - (isNegative ? 1 : 0), '0')}`.toLowerCase()
}

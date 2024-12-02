import {type BigNumberish, num} from 'starknet'

export const STARKNET_HEX_STRING_ZERO = toStarknetHexString(0)

export function toStarknetHexString(address: BigNumberish) {
  return `0x${num.toHex(address).slice(2).padStart(64, '0')}`.toLowerCase()
}

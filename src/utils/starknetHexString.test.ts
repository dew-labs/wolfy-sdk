import {describe, expect, it} from 'vitest'

import {STARKNET_HEX_STRING_ZERO, toStarknetHexString} from './starknetHexString'

describe('starknetHexString', () => {
  describe('sTARKNET_HEX_STRING_ZERO', () => {
    it('should be a valid zero hex string', () => {
      expect.assertions(1)

      const zeros = '0'.repeat(64)

      expect(STARKNET_HEX_STRING_ZERO).toBe(`0x${zeros}`)
    })
  })

  describe(toStarknetHexString, () => {
    it('should convert zero to hex string', () => {
      expect.assertions(1)

      expect(toStarknetHexString(0)).toBe(STARKNET_HEX_STRING_ZERO)
    })

    it('should convert positive number to hex string', () => {
      expect.assertions(1)

      const zeros = '0'.repeat(62)

      expect(toStarknetHexString(123)).toBe(`0x${zeros}7b`)
    })

    it('should convert negative number to hex string', () => {
      expect.assertions(1)

      const zeros = '0'.repeat(61)

      expect(toStarknetHexString(-123)).toBe(`-0x${zeros}7b`)
    })

    it('should convert hex string to padded hex string', () => {
      expect.assertions(1)

      const zeros = '0'.repeat(62)

      expect(toStarknetHexString('0x7B')).toBe(`0x${zeros}7b`)
    })

    it('should convert large number to hex string', () => {
      expect.assertions(1)

      const largeNum = '0x1234567890abcdef'
      const zeros = '0'.repeat(48)

      expect(toStarknetHexString(largeNum)).toBe(`0x${zeros}1234567890abcdef`)
    })

    it('should handle BigInt input', () => {
      expect.assertions(1)

      const bigIntValue = BigInt('0x1234567890abcdef')
      const zeros = '0'.repeat(48)

      expect(toStarknetHexString(bigIntValue)).toBe(`0x${zeros}1234567890abcdef`)
    })

    it('should always return lowercase hex string', () => {
      expect.assertions(1)

      const zeros = '0'.repeat(58)

      expect(toStarknetHexString('0xABCDEF')).toBe(`0x${zeros}abcdef`)
    })

    it('should handle invalid hex strings', () => {
      expect.assertions(2)

      expect(() => toStarknetHexString('invalid')).toThrow(`Cannot convert invalid to a BigInt`)
      expect(() => toStarknetHexString('0xinvalid')).toThrow(`Cannot convert 0xinvalid to a BigInt`)
    })

    it('should handle non-string/number/bigint inputs', () => {
      expect.assertions(1)

      expect(() => toStarknetHexString({} as unknown as string)).toThrow(
        'Cannot convert [object Object] to a BigInt',
      )
    })
  })
})

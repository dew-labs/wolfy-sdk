import type {Uint256, Uint512} from 'starknet'
import {CairoUint256, CairoUint512} from 'starknet'
import {describe, expect, it} from 'vitest'

import {cairoIntToBigInt} from './cairoInt'

describe('cairoInt', () => {
  describe('cairoIntToBigInt', () => {
    it('should handle undefined and null', () => {
      expect.assertions(2)

      expect(cairoIntToBigInt(undefined)).toBe(0n)
      expect(cairoIntToBigInt(null)).toBe(0n)
    })

    it('should handle primitive number types', () => {
      expect.assertions(3)

      expect(cairoIntToBigInt(123)).toBe(123n)
      expect(cairoIntToBigInt(-123)).toBe(-123n)
      expect(cairoIntToBigInt(0)).toBe(0n)
    })

    it('should handle bigint', () => {
      expect.assertions(3)

      expect(cairoIntToBigInt(123n)).toBe(123n)
      expect(cairoIntToBigInt(-123n)).toBe(-123n)
      expect(cairoIntToBigInt(0n)).toBe(0n)
    })

    it('should handle hex strings', () => {
      expect.assertions(2)

      expect(cairoIntToBigInt('0x7b')).toBe(123n)
      expect(cairoIntToBigInt('0x0')).toBe(0n)
    })

    it('should handle Uint256', () => {
      expect.assertions(2)

      const uint256: Uint256 = {low: '0x7b', high: '0x0'}

      expect(cairoIntToBigInt(uint256)).toBe(123n)

      const maxUint256: Uint256 = {
        low: '0xffffffffffffffffffffffffffffffff',
        high: '0xffffffffffffffffffffffffffffffff',
      }
      const expectedMaxUint256 = new CairoUint256(maxUint256).toBigInt()

      expect(cairoIntToBigInt(maxUint256)).toBe(expectedMaxUint256)
    })

    it('should handle Uint512', () => {
      expect.assertions(2)

      const uint512: Uint512 = {
        limb0: '0x7b',
        limb1: '0x0',
        limb2: '0x0',
        limb3: '0x0',
      }

      expect(cairoIntToBigInt(uint512)).toBe(123n)

      const maxUint512: Uint512 = {
        limb0: '0xffffffffffffffffffffffffffffffff',
        limb1: '0xffffffffffffffffffffffffffffffff',
        limb2: '0xffffffffffffffffffffffffffffffff',
        limb3: '0xffffffffffffffffffffffffffffffff',
      }
      const expectedMaxUint512 = new CairoUint512(maxUint512).toBigInt()

      expect(cairoIntToBigInt(maxUint512)).toBe(expectedMaxUint512)
    })

    it('should handle SignedInteger', () => {
      expect.assertions(10)

      // Test with number magnitude
      expect(cairoIntToBigInt({mag: 123, sign: false})).toBe(123n)
      expect(cairoIntToBigInt({mag: 123, sign: true})).toBe(-123n)

      // Test with bigint magnitude
      expect(cairoIntToBigInt({mag: 123n, sign: false})).toBe(123n)
      expect(cairoIntToBigInt({mag: 123n, sign: true})).toBe(-123n)

      // Test with hex string magnitude
      expect(cairoIntToBigInt({mag: '0x7b', sign: false})).toBe(123n)
      expect(cairoIntToBigInt({mag: '0x7b', sign: true})).toBe(-123n)

      // Test with Uint256 magnitude
      const uint256: Uint256 = {low: '0x7b', high: '0x0'}

      expect(cairoIntToBigInt({mag: uint256, sign: false})).toBe(123n)
      expect(cairoIntToBigInt({mag: uint256, sign: true})).toBe(-123n)

      // Test with Uint512 magnitude
      const uint512: Uint512 = {
        limb0: '0x7b',
        limb1: '0x0',
        limb2: '0x0',
        limb3: '0x0',
      }

      expect(cairoIntToBigInt({mag: uint512, sign: false})).toBe(123n)
      expect(cairoIntToBigInt({mag: uint512, sign: true})).toBe(-123n)
    })

    it('should throw error for invalid input', () => {
      expect.assertions(2)

      expect(() => cairoIntToBigInt({invalid: 'object'} as never)).toThrow('Invalid cairoInt')
      expect(() => cairoIntToBigInt([1, 2, 3] as never)).toThrow('Invalid cairoInt')
    })
  })
})

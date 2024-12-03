import {CairoCustomEnum} from 'starknet'
import {describe, expect, it} from 'vitest'

import {parseCairoCustomEnum, toCairoCustomEnum} from './cairoCustomEnum'

describe('cairoCustomEnum', () => {
  enum TestEnum {
    First = 'First',
    Second = 'Second',
    Third = 'Third',
  }

  describe('parseCairoCustomEnum', () => {
    it('should parse CairoCustomEnum instance', () => {
      expect.assertions(1)

      const cairoEnum = new CairoCustomEnum({First: {}})
      const result = parseCairoCustomEnum(TestEnum, cairoEnum)

      expect(result).toBe(TestEnum.First)
    })

    it('should parse object with variant property', () => {
      expect.assertions(1)

      const value = {variant: {First: {}}}
      const result = parseCairoCustomEnum(TestEnum, value)

      expect(result).toBe(TestEnum.First)
    })

    it('should parse string value', () => {
      expect.assertions(1)

      const result = parseCairoCustomEnum(TestEnum, 'First')

      expect(result).toBe(TestEnum.First)
    })

    it('should throw error for invalid enum value', () => {
      expect.assertions(1)

      expect(() => parseCairoCustomEnum(TestEnum, 'Invalid')).toThrow('Invalid enum')
    })

    it('should throw error for null value', () => {
      expect.assertions(1)

      expect(() => parseCairoCustomEnum(TestEnum, null)).toThrow('Invalid enum')
    })

    it('should throw error for undefined value', () => {
      expect.assertions(1)

      expect(() => parseCairoCustomEnum(TestEnum, undefined)).toThrow('Invalid enum')
    })

    it('should handle empty variant object', () => {
      expect.assertions(1)

      const value = {variant: {}}

      expect(() => parseCairoCustomEnum(TestEnum, value)).toThrow('Invalid enum')
    })
  })

  describe('toCairoCustomEnum', () => {
    it('should create CairoCustomEnum instance', () => {
      expect.assertions(1)

      const result = toCairoCustomEnum(TestEnum.First)

      expect(result).toStrictEqual(new CairoCustomEnum({First: {}}))
    })

    it('should create different instances for different values', () => {
      expect.assertions(1)

      const first = toCairoCustomEnum(TestEnum.First)
      const second = toCairoCustomEnum(TestEnum.Second)

      expect(first).not.toStrictEqual(second)
    })
  })
})

import {ec, shortString} from 'starknet'
import {describe, expect, it} from 'vitest'

import {poseidonHash} from './poseidonHash'

describe('poseidonHash', () => {
  it('should hash a single boolean value', () => {
    expect.assertions(2)

    const trueHash = poseidonHash(true)
    const falseHash = poseidonHash(false)

    expect(trueHash).toBe(ec.starkCurve.poseidonHashMany([1n]))
    expect(falseHash).toBe(ec.starkCurve.poseidonHashMany([0n]))
  })

  it('should hash a single number value', () => {
    expect.assertions(1)

    const hash = poseidonHash(123)

    expect(hash).toBe(ec.starkCurve.poseidonHashMany([123n]))
  })

  it('should hash a single bigint value', () => {
    expect.assertions(1)

    const hash = poseidonHash(123n)

    expect(hash).toBe(ec.starkCurve.poseidonHashMany([123n]))
  })

  it('should hash a hex string', () => {
    expect.assertions(1)

    const hash = poseidonHash('0x7b') // hex for 123

    expect(hash).toBe(ec.starkCurve.poseidonHashMany([123n]))
  })

  it('should hash a regular string', () => {
    expect.assertions(1)

    const str = 'test'
    const encodedStr = BigInt(shortString.encodeShortString(str))
    const hash = poseidonHash(str)

    expect(hash).toBe(ec.starkCurve.poseidonHashMany([encodedStr]))
  })

  it('should hash an array of values', () => {
    expect.assertions(1)

    const values = [true, 123, '0x7b', 'test', 456n]
    const expectedValues = [
      1n, // true
      123n, // 123
      123n, // '0x7b'
      BigInt(shortString.encodeShortString('test')), // 'test'
      456n, // 456n
    ]
    const hash = poseidonHash(values)

    expect(hash).toBe(ec.starkCurve.poseidonHashMany(expectedValues))
  })

  it('should hash an empty array', () => {
    expect.assertions(1)

    const hash = poseidonHash([])

    expect(hash).toBe(ec.starkCurve.poseidonHashMany([]))
  })

  it('should hash array with single value', () => {
    expect.assertions(1)

    const hash = poseidonHash([123])

    expect(hash).toBe(ec.starkCurve.poseidonHashMany([123n]))
  })
})

import type {Uint256, Uint512} from 'starknet'
import {describe, expect, it} from 'vitest'

import {isRepresentZero} from './isRepresentZero'

describe('isRepresentZero', () => {
  it('should handle number type', () => {
    expect.assertions(3)

    expect(isRepresentZero(0)).toBe(true)
    expect(isRepresentZero(1)).toBe(false)
    expect(isRepresentZero(-1)).toBe(false)
  })

  it('should handle bigint type', () => {
    expect.assertions(3)

    expect(isRepresentZero(0n)).toBe(true)
    expect(isRepresentZero(1n)).toBe(false)
    expect(isRepresentZero(-1n)).toBe(false)
  })

  it('should handle hex string', () => {
    expect.assertions(4)

    expect(isRepresentZero('0x0')).toBe(true)
    expect(isRepresentZero('0x00')).toBe(true)
    expect(isRepresentZero('0x1')).toBe(false)
    expect(isRepresentZero('0x01')).toBe(false)
  })

  it('should handle Uint256', () => {
    expect.assertions(3)

    const zeroUint256: Uint256 = {low: '0x0', high: '0x0'}
    const lowUint256: Uint256 = {low: '0x1', high: '0x0'}
    const highUint256: Uint256 = {low: '0x0', high: '0x1'}

    expect(isRepresentZero(zeroUint256)).toBe(true)
    expect(isRepresentZero(lowUint256)).toBe(false)
    expect(isRepresentZero(highUint256)).toBe(false)
  })

  it('should handle Uint512', () => {
    expect.assertions(5)

    const zeroUint512: Uint512 = {
      limb0: '0x0',
      limb1: '0x0',
      limb2: '0x0',
      limb3: '0x0',
    }

    expect(isRepresentZero(zeroUint512)).toBe(true)

    const limb0Uint512: Uint512 = {
      limb0: '0x1',
      limb1: '0x0',
      limb2: '0x0',
      limb3: '0x0',
    }

    expect(isRepresentZero(limb0Uint512)).toBe(false)

    const limb1Uint512: Uint512 = {
      limb0: '0x0',
      limb1: '0x1',
      limb2: '0x0',
      limb3: '0x0',
    }

    expect(isRepresentZero(limb1Uint512)).toBe(false)

    const limb2Uint512: Uint512 = {
      limb0: '0x0',
      limb1: '0x0',
      limb2: '0x1',
      limb3: '0x0',
    }

    expect(isRepresentZero(limb2Uint512)).toBe(false)

    const limb3Uint512: Uint512 = {
      limb0: '0x0',
      limb1: '0x0',
      limb2: '0x0',
      limb3: '0x1',
    }

    expect(isRepresentZero(limb3Uint512)).toBe(false)
  })
})

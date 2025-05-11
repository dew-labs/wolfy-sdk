import type {U256} from 'node_modules/abi-wan-kanabi/dist/config'
import {describe, expect, expectTypeOf, it} from 'vitest'

import {getWolfyEventHash, type ParsedWolfyEvent, parseWolfyEvent, WolfyEvent} from './events'

describe('events types', () => {
  it('wolfyEvent enum types', () => {
    expect.assertions(3)

    expectTypeOf(WolfyEvent.ClaimableCollateralUpdated).toBeString()
    expectTypeOf(WolfyEvent.ClaimableFundingUpdated).toBeString()
    expectTypeOf(WolfyEvent.PositionImpactPoolAmountUpdated).toBeString()
  })

  it('getWolfyEventHash return type', () => {
    expect.assertions(3)

    expectTypeOf(getWolfyEventHash).parameter(0).toEqualTypeOf<WolfyEvent>()
    expectTypeOf(getWolfyEventHash).returns.toBeString()

    // Test with specific event
    expectTypeOf(getWolfyEventHash(WolfyEvent.ClaimableCollateralUpdated)).toBeString()
  })

  it('parseWolfyEvent with specific event', () => {
    expect.assertions(1)

    const result = parseWolfyEvent(WolfyEvent.DepositCreated, {
      keys: ['0x2'],
      data: ['0x3'],
    })

    expectTypeOf(result).toEqualTypeOf<
      ParsedWolfyEvent<typeof WolfyEvent.DepositCreated> | undefined
    >()
  })

  it('parsedWolfyEvent type', () => {
    expect.assertions(1)

    type TestEvent = ParsedWolfyEvent<typeof WolfyEvent.ClaimableCollateralUpdated>

    expectTypeOf<TestEvent>().toEqualTypeOf<{
      market: string
      token: string
      account: string
      time_key: number | bigint | U256
      delta: number | bigint | U256
      next_value: number | bigint | U256
      next_pool_value: number | bigint | U256
    }>()
  })
})

import type {U256} from 'node_modules/abi-wan-kanabi/dist/config'
import {describe, expectTypeOf, it} from 'vitest'

import {
  getWolfyEventHash,
  type ParsedWolfyEvent,
  type ParsedWolfyEvents,
  parseWolfyEvent,
  parseWolfyEvents,
  WolfyEvent,
} from './events'

describe('events types', () => {
  it('wolfyEvent enum types', () => {
    expectTypeOf(WolfyEvent.ClaimableCollateralUpdated).toBeString()
    expectTypeOf(WolfyEvent.ClaimableFundingUpdated).toBeString()
    expectTypeOf(WolfyEvent.PositionImpactPoolAmountUpdated).toBeString()
  })

  it('getWolfyEventHash return type', () => {
    expectTypeOf(getWolfyEventHash).parameter(0).toEqualTypeOf<WolfyEvent>()
    expectTypeOf(getWolfyEventHash).returns.toBeString()

    // Test with specific event
    expectTypeOf(getWolfyEventHash(WolfyEvent.ClaimableCollateralUpdated)).toBeString()
  })

  it('parseWolfyEvent with specific event', () => {
    const result = parseWolfyEvent(WolfyEvent.DepositCreated, {
      keys: ['0x2'],
      data: ['0x3'],
    })

    expectTypeOf(result).toEqualTypeOf<
      ParsedWolfyEvent<typeof WolfyEvent.DepositCreated> | undefined
    >()
  })

  it('parsedWolfyEvent type', () => {
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

  it('parseWolfyEvents with specific event', () => {
    const result = parseWolfyEvents([WolfyEvent.MarketCreated], [])

    expectTypeOf(result).toEqualTypeOf<ParsedWolfyEvents<typeof WolfyEvent.MarketCreated>>()
  })

  it('parseWolfyEvents with multiple events', () => {
    const result = parseWolfyEvents([WolfyEvent.MarketCreated, WolfyEvent.OrderCreated], [])

    expectTypeOf(result).toEqualTypeOf<
      ParsedWolfyEvents<typeof WolfyEvent.MarketCreated | typeof WolfyEvent.OrderCreated>
    >()
  })

  it('parseWolfyEvents with empty array', () => {
    const result = parseWolfyEvents([], [])

    expectTypeOf(result).toEqualTypeOf<ParsedWolfyEvents<never>>()
  })

  it('parseWolfyEvents with all possible event types', () => {
    const result = parseWolfyEvents(Object.values(WolfyEvent), [])

    expectTypeOf(result).toEqualTypeOf<ParsedWolfyEvents<WolfyEvent>>()
  })

  it('parseWolfyEvents with events parameter', () => {
    const result = parseWolfyEvents(
      [WolfyEvent.MarketCreated],
      [
        {
          fromAddress: '0x123',
          keys: ['0x456'],
          data: ['0x789'],
          blockHash: '0xabc',
          blockNumber: 123,
          transactionHash: '0xdef',
        },
      ],
    )

    expectTypeOf(result).toEqualTypeOf<ParsedWolfyEvents<typeof WolfyEvent.MarketCreated>>()
  })
})

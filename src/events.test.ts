import {describe, expect, it} from 'vitest'

import {parseWolfyEvent, parseWolfyEvents, WolfyEvent} from './events'
import {DecreasePositionSwapType, OrderType} from './order'
import {toCairoCustomEnum} from './utils/cairoCustomEnum'

/* eslint-disable camelcase -- not js */
const testEvents = [
  {
    data: [
      '0x746ca2519aaa863327f7d0147590c2e0f949fed3d61f2a160c356a7332cae26',
      '0x1977b93e0be3d378ebb29009d836bdd0c2ce976fc7d722dadee38cb92435ad2',
      '0x8ac7230489e80000',
      '0x0',
    ],
    from_address: '0x257f31f11fa095874ded95a8ad6c8dca9fb851557df83e7cd384bde65c4d1c4',
    keys: ['0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9'],
  },
  {
    data: [
      '0x746ca2519aaa863327f7d0147590c2e0f949fed3d61f2a160c356a7332cae26',
      '0x2dd55cffd779c241953963eb6df80edc8b952819ec386e8587a70fd9ea2e38',
      '0x5520f2f9610',
      '0x0',
    ],
    from_address: '0x161304979f98530f4c3d6659e0a43cad96ceb71531482c7aaba90e07f150315',
    keys: ['0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff'],
  },
  {
    data: [
      '0x746ca2519aaa863327f7d0147590c2e0f949fed3d61f2a160c356a7332cae26',
      '0x1977b93e0be3d378ebb29009d836bdd0c2ce976fc7d722dadee38cb92435ad2',
      '0x5520f2f9610',
      '0x0',
    ],
    from_address: '0x161304979f98530f4c3d6659e0a43cad96ceb71531482c7aaba90e07f150315',
    keys: ['0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9'],
  },
  {
    data: [
      '0x379e0192bb5c8cc2a32948a25954fbf1149cbd73060cbec73703f88f9736c5b',
      '0x379e0192bb5c8cc2a32948a25954fbf1149cbd73060cbec73703f88f9736c5b',
      '0x2',
      '0x0',
      '0x746ca2519aaa863327f7d0147590c2e0f949fed3d61f2a160c356a7332cae26',
      '0x746ca2519aaa863327f7d0147590c2e0f949fed3d61f2a160c356a7332cae26',
      '0x0',
      '0x746ca2519aaa863327f7d0147590c2e0f949fed3d61f2a160c356a7332cae26',
      '0x365f26421a9b1ca66cf84e778b10cd640fee23f63fda500048ba695a239f74a',
      '0x257f31f11fa095874ded95a8ad6c8dca9fb851557df83e7cd384bde65c4d1c4',
      '0x0',
      '0x2ce4531abe32db043c0b000000',
      '0x0',
      '0x8ac7230489e80000',
      '0x0',
      '0x0',
      '0x0',
      '0x29cf217ffc',
      '0x0',
      '0x5520f2f9610',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0x0',
      '0xba64b',
      '0x1',
      '0x0',
    ],
    from_address: '0x5720be1fffa5991829f27a81b22469559c71074edf277bf7c920b98df740e45',
    keys: ['0x3427759bfd3b941f14e687e129519da3c9b0046c5b9aaa290bb1dede63753b3'],
  },
  {
    data: [
      '0x4',
      '0x1',
      '0x1',
      '0x1',
      '0x1',
      '0x0',
      '0x1',
      '0x379e0192bb5c8cc2a32948a25954fbf1149cbd73060cbec73703f88f9736c5b',
    ],
    from_address: '0x746ca2519aaa863327f7d0147590c2e0f949fed3d61f2a160c356a7332cae26',
    keys: [
      '0x1dcde06aabdbca2f80aa51392b345d7549d7757aa855f7e37f5d335ac8243b1',
      '0x6297f8794c11c26443c4da9791036ee70a89ff2de39fcad382ea83556875352',
    ],
  },
  {
    data: [
      '0x746ca2519aaa863327f7d0147590c2e0f949fed3d61f2a160c356a7332cae26',
      '0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8',
      '0xfbe3812e15bed',
      '0x0',
    ],
    from_address: '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
    keys: ['0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9'],
  },
]

const orderCreatedEvent = {
  key: 1572273710371541726192962775807860327446918854813154711222471640062721485915n,
  order: {
    key: 1572273710371541726192962775807860327446918854813154711222471640062721485915n,
    order_type: toCairoCustomEnum(OrderType.MarketIncrease),
    decrease_position_swap_type: toCairoCustomEnum(DecreasePositionSwapType.NoSwap),
    account: 3291264387600441823805629793603830484860093933983366174783897025517575777830n,
    receiver: 3291264387600441823805629793603830484860093933983366174783897025517575777830n,
    callback_contract: 0n,
    ui_fee_receiver: 3291264387600441823805629793603830484860093933983366174783897025517575777830n,
    market: 1537063021448119905046925820578720721929696133888079609458248225096004663114n,
    initial_collateral_token:
      1060019353816037012981630500880027224029108241407922490504249925829652697540n,
    swap_path: {snapshot: []},
    size_delta_usd: 3556702200000000000000000000000n,
    initial_collateral_delta_amount: 10000000000000000000n,
    trigger_price: 0n,
    acceptable_price: 179568738300n,
    execution_fee: 5850000234000n,
    callback_gas_limit: 0n,
    min_output_amount: 0n,
    updated_at_block: 763467n,
    is_long: true,
    is_frozen: false,
  },
}

/* eslint-enable camelcase */

describe(parseWolfyEvent, () => {
  it('parse order created event', () => {
    expect.assertions(1)

    const event = parseWolfyEvent(WolfyEvent.OrderCreated, testEvents[3])

    expect(event).toEqual(orderCreatedEvent)
  })

  it('parse order created event in a list of events', () => {
    expect.assertions(1)

    const event = parseWolfyEvent(WolfyEvent.OrderCreated, testEvents)

    expect(event).toEqual(orderCreatedEvent)
  })
})

describe(parseWolfyEvents, () => {
  it('parse multiple events', () => {
    expect.assertions(1)

    const events = parseWolfyEvents([WolfyEvent.OrderCreated], testEvents)

    expect(events).toEqual({
      orderCreated: orderCreatedEvent,
    })
  })
})

import type {Uint256} from 'starknet'
import {describe, expect, expectTypeOf, it} from 'vitest'

import {ReaderABI} from './abis'
import {StarknetChainId} from './chains'
import {WolfyContract} from './contracts'
import {createWolfyMulticallRequest, wolfyMulticall} from './multicall'
import type {DecreasePositionSwapType, OrderType} from './order'
import type {CairoCustomEnumReplicate} from './utils/cairoCustomEnum'

describe('multicall types', () => {
  it('createWolfyMulticallRequest types', () => {
    expect.assertions(1)

    const request = createWolfyMulticallRequest(
      StarknetChainId.SN_KATANA,
      WolfyContract.Reader,
      ReaderABI,
      'get_market_info',
      [
        {contract_address: '0x0'},
        {
          /* eslint-disable camelcase -- contract convention */
          index_token_price: {min: 0, max: 0},
          long_token_price: {min: 0, max: 0},
          short_token_price: {min: 0, max: 0},
          /* eslint-enable camelcase */
        },
        '0x0',
      ],
    )

    expectTypeOf(request).toMatchTypeOf<{
      contractAddress: string
      entrypoint: string
      calldata: unknown[]
    }>()
  })

  it('wolfyMulticall return types', async () => {
    expect.assertions(1)

    const calls = [
      createWolfyMulticallRequest(
        StarknetChainId.SN_KATANA,
        WolfyContract.Reader,
        ReaderABI,
        'get_market_info',
        [
          {contract_address: '0x0'},
          {
            /* eslint-disable camelcase -- contract convention */
            index_token_price: {min: 0, max: 0},
            long_token_price: {min: 0, max: 0},
            short_token_price: {min: 0, max: 0},
            /* eslint-enable camelcase */
          },
          '0x0',
        ],
      ),
      createWolfyMulticallRequest(
        StarknetChainId.SN_KATANA,
        WolfyContract.Reader,
        ReaderABI,
        'get_adl_state',
        [
          {contract_address: '0x0'},
          '0x0',
          false,
          {
            /* eslint-disable camelcase -- contract convention */
            index_token_price: {min: 0, max: 0},
            long_token_price: {min: 0, max: 0},
            short_token_price: {min: 0, max: 0},
            /* eslint-enable camelcase */
          },
        ],
      ),
      createWolfyMulticallRequest(
        StarknetChainId.SN_KATANA,
        WolfyContract.Reader,
        ReaderABI,
        'get_account_orders',
        [
          {
            contract_address: '',
          },
          '',
          0,
          100,
        ],
      ),
    ] as const

    const [result1, result2, result3] = await wolfyMulticall(StarknetChainId.SN_KATANA, calls)

    // Test get_market_info result type
    expectTypeOf(result1).toMatchTypeOf<{
      market: {
        market_token: string
        index_token: string
        long_token: string
        short_token: string
      }
      borrowing_factor_per_second_for_longs: number | bigint | Uint256
      borrowing_factor_per_second_for_shorts: number | bigint | Uint256
      base_funding: {
        funding_fee_amount_per_size: {
          long: {
            long_token: number | bigint | Uint256
            short_token: number | bigint | Uint256
          }
          short: {
            long_token: number | bigint | Uint256
            short_token: number | bigint | Uint256
          }
        }
        claimable_funding_amount_per_size: {
          long: {
            long_token: number | bigint | Uint256
            short_token: number | bigint | Uint256
          }
          short: {
            long_token: number | bigint | Uint256
            short_token: number | bigint | Uint256
          }
        }
      }
      next_funding: {
        longs_pay_shorts: boolean
        funding_factor_per_second: number | bigint | Uint256
        funding_fee_amount_per_size_delta: {
          long: {
            long_token: number | bigint | Uint256
            short_token: number | bigint | Uint256
          }
          short: {
            long_token: number | bigint | Uint256
            short_token: number | bigint | Uint256
          }
        }
        claimable_funding_amount_per_size_delta: {
          long: {
            long_token: number | bigint | Uint256
            short_token: number | bigint | Uint256
          }
          short: {
            long_token: number | bigint | Uint256
            short_token: number | bigint | Uint256
          }
        }
      }
      virtual_inventory: {
        virtual_pool_amount_for_long_token: number | bigint | Uint256
        virtual_pool_amount_for_short_token: number | bigint | Uint256
        virtual_inventory_for_positions: {
          mag: number | bigint | Uint256
          sign: boolean
        }
      }
      is_disabled: boolean
    }>()

    // Test get_adl_state result type
    expectTypeOf(result2).toMatchTypeOf<{
      0: number | bigint
      1: boolean
      2: {
        mag: number | bigint | Uint256
        sign: boolean
      }
      3: number | bigint | Uint256
    }>()

    // Test get_account_orders result type
    expectTypeOf(result3).toMatchTypeOf<
      {
        key: string | number | bigint
        order_type: CairoCustomEnumReplicate<OrderType>
        decrease_position_swap_type: CairoCustomEnumReplicate<DecreasePositionSwapType>
        account: string
        receiver: string
        callback_contract: string
        ui_fee_receiver: string
        market: string
        initial_collateral_token: string
        swap_path: {
          snapshot: string[]
        }
        size_delta_usd: number | bigint | Uint256
        initial_collateral_delta_amount: number | bigint | Uint256
        trigger_price: number | bigint | Uint256
        acceptable_price: number | bigint | Uint256
        execution_fee: number | bigint | Uint256
        callback_gas_limit: number | bigint | Uint256
        min_output_amount: number | bigint | Uint256
        updated_at_block: number | bigint
        is_long: boolean
        is_frozen: boolean
      }[]
    >()
  })
})

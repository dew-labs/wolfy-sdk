import type {Abi} from 'abi-wan-kanabi'
import type {TypedContractV2} from 'starknet'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {createCall} from './createCall'

describe(createCall, () => {
  // Mock contract and ABI
  const mockAbi = [
    {
      type: 'function',
      name: 'transfer',
      inputs: [
        {name: 'recipient', type: 'core::starknet::contract_address::ContractAddress'},
        {name: 'amount', type: 'core::integer::u32'},
      ],
      outputs: [{type: 'felt'}],
      // eslint-disable-next-line camelcase -- contract convention
      state_mutability: 'external',
    },
  ] as const satisfies Abi

  const mockContract = {
    populate: vi.fn().mockImplementation((method: string, args: unknown[]) => ({
      contractAddress: '0x123',
      entrypoint: method,
      calldata: args,
    })),
    abi: mockAbi,
    address: '0x123',
    providerOrAccount: {},
    functions: {},
    calldata: [],
    structs: {},
    events: {},
    enums: {},
  } as unknown as TypedContractV2<typeof mockAbi>

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create a call with multiple arguments', () => {
    expect.assertions(2)

    const args = ['0x456', 1000] as [string, number]
    const result = createCall(mockContract, 'transfer', args)

    expect(mockContract.populate).toHaveBeenCalledWith('transfer', args)
    expect(result).toStrictEqual({
      contractAddress: '0x123',
      entrypoint: 'transfer',
      calldata: args,
    })
  })

  it('should create a call with single argument', () => {
    expect.assertions(2)

    const args = ['0x456', 0] as [string, number]
    const result = createCall(mockContract, 'transfer', args)

    expect(mockContract.populate).toHaveBeenCalledWith('transfer', args)
    expect(result).toStrictEqual({
      contractAddress: '0x123',
      entrypoint: 'transfer',
      calldata: args,
    })
  })

  it('should create a call without arguments', () => {
    expect.assertions(2)

    const args = ['0', 0] as [string, number]
    const result = createCall(mockContract, 'transfer', args)

    expect(mockContract.populate).toHaveBeenCalledWith('transfer', args)
    expect(result).toStrictEqual({
      contractAddress: '0x123',
      entrypoint: 'transfer',
      calldata: args,
    })
  })

  it('should handle empty array arguments', () => {
    expect.assertions(2)

    const args = ['0', 0] as [string, number]
    const result = createCall(mockContract, 'transfer', args)

    expect(mockContract.populate).toHaveBeenCalledWith('transfer', args)
    expect(result).toStrictEqual({
      contractAddress: '0x123',
      entrypoint: 'transfer',
      calldata: args,
    })
  })
})

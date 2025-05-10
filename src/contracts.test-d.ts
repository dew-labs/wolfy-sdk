import {
  AccountInterface,
  Contract,
  type GetTransactionReceiptResponse,
  type TypedContractV2,
} from 'starknet'
import {describe, expect, expectTypeOf, it} from 'vitest'

import {MulticallABI} from './abis'
import {StarknetChainId} from './chains'
import {
  createTokenContract,
  createWolfyContract,
  executeAndWait,
  getWolfyContractAddress,
  isWolfyContract,
  registerWolfyContractAddress,
  WolfyContract,
  type WolfyContractAbi,
} from './contracts'

describe('wolfy Contracts Types', () => {
  it('isWolfyContract type guard', () => {
    expect.assertions(1)

    const contractName = 'Multicall' as string
    if (isWolfyContract(contractName)) {
      expectTypeOf(contractName).toEqualTypeOf<WolfyContract>()
    }
  })

  it('registerWolfyContractAddress types', () => {
    expect.assertions(4)

    expectTypeOf(registerWolfyContractAddress).parameter(0).toEqualTypeOf<StarknetChainId>()
    expectTypeOf(registerWolfyContractAddress).parameter(1).toEqualTypeOf<WolfyContract>()
    expectTypeOf(registerWolfyContractAddress).parameter(2).toEqualTypeOf<string>()
    expectTypeOf(registerWolfyContractAddress).returns.toBeVoid()
  })

  it('getWolfyContractAddress types', () => {
    expect.assertions(3)

    expectTypeOf(getWolfyContractAddress).parameter(0).toEqualTypeOf<StarknetChainId>()
    expectTypeOf(getWolfyContractAddress).parameter(1).toEqualTypeOf<WolfyContract>()
    expectTypeOf(getWolfyContractAddress).returns.toEqualTypeOf<string>()
  })

  it('createWolfyContract types', () => {
    expect.assertions(3)

    expectTypeOf(createWolfyContract<WolfyContract.DataStore>)
      .parameter(0)
      .toEqualTypeOf<StarknetChainId>()

    expectTypeOf(createWolfyContract<WolfyContract.DataStore>)
      .parameter(1)
      .toEqualTypeOf<WolfyContract.DataStore>()
    expectTypeOf(createWolfyContract<WolfyContract.DataStore>).returns.toEqualTypeOf<
      TypedContractV2<WolfyContractAbi<WolfyContract.DataStore>>
    >()

    // Test that the ABI parameter is correctly typed based on the contract name
    const contract = createWolfyContract(
      StarknetChainId.SN_MAIN,
      WolfyContract.Multicall,
      MulticallABI,
    )

    expectTypeOf(contract).toExtend<Contract>()

    // Test optional account parameter
    const mockAccount = {} as AccountInterface
    const contractWithAccount = createWolfyContract(
      StarknetChainId.SN_MAIN,
      WolfyContract.Multicall,
      MulticallABI,
      mockAccount,
    )

    expectTypeOf(contractWithAccount).toExtend<
      TypedContractV2<WolfyContractAbi<WolfyContract.Multicall>>
    >()
  })

  it('createTokenContract types', () => {
    expect.assertions(4)

    expectTypeOf(createTokenContract).parameter(0).toEqualTypeOf<StarknetChainId>()
    expectTypeOf(createTokenContract).parameter(1).toEqualTypeOf<string>()
    expectTypeOf(createTokenContract).parameter(2).toEqualTypeOf<AccountInterface | undefined>()
    expectTypeOf(createTokenContract).returns.toExtend<Contract>()
  })

  it('executeAndWait types', () => {
    expect.assertions(4)

    expectTypeOf(executeAndWait).parameter(0).toEqualTypeOf<AccountInterface>()

    expectTypeOf(executeAndWait)
      .parameter(1)
      .toEqualTypeOf<Parameters<AccountInterface['execute']>[0]>()

    expectTypeOf(executeAndWait).returns.toEqualTypeOf<Promise<GetTransactionReceiptResponse>>()
  })

  it('wolfyContractAbi type mapping', () => {
    expect.assertions(1)

    type MulticallAbiType = WolfyContractAbi<WolfyContract.Multicall>

    expectTypeOf<MulticallAbiType>().toEqualTypeOf(MulticallABI)
  })
})

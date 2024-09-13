import {type Account, shortString} from 'starknet'

import {RoleStoreABI} from './abis'
import {StarknetChainId} from './chains'
import {createSatoruContract, SatoruContract} from './contracts'

export enum SatoruRole {
  ROLE_ADMIN = 'ADMIN',

  TIMELOCK_ADMIN = 'TIMELOCK_ADMIN',

  TIMELOCK_MULTISIG = 'TIMELOCK_MULTISIG',

  CONFIG_KEEPER = 'CONFIG_KEEPER',

  CONTROLLER = 'CONTROLLER',

  ROUTER_PLUGIN = 'ROUTER_PLUGIN',

  MARKET_KEEPER = 'MARKET_KEEPER',

  FEE_KEEPER = 'FEE_KEEPER',

  ORDER_KEEPER = 'ORDER_KEEPER',

  FROZEN_ORDER_KEEPER = 'FROZEN_ORDER_KEEPER',

  LIQUIDATION_KEEPER = 'LIQUIDATION_KEEPER',

  ADL_KEEPER = 'ADL_KEEPER',
}

export async function hasRole(chainId: StarknetChainId, address: string, role: SatoruRole) {
  const roleStoreContract = createSatoruContract(chainId, SatoruContract.RoleStore, RoleStoreABI)
  return await roleStoreContract.has_role(address, shortString.encodeShortString(role))
}

export async function grantRole(
  chainId: StarknetChainId,
  roleAdmin: Account,
  address: string,
  role: SatoruRole | SatoruRole[],
  entityName?: string,
) {
  const roles = Array.isArray(role) ? role : [role]

  const alreadyHasRoles = await Promise.all(
    roles.map(async role => await hasRole(chainId, address, role)),
  )
  const alreadyHasRole = alreadyHasRoles.every(result => result)

  if (alreadyHasRole) {
    console.debug(`Role ${roles.join(', ')} already granted to ${entityName ?? address}`)
    return
  }

  const isAdmin = await hasRole(chainId, roleAdmin.address, SatoruRole.ROLE_ADMIN)
  if (!isAdmin) {
    throw new Error('Only admin can grant roles')
  }

  const roleStoreContract = createSatoruContract(chainId, SatoruContract.RoleStore, RoleStoreABI)

  // Note: write this way work too, but some how result have the unknown type
  // roleStoreContract.connect(roleAdmin)
  // const result = await roleStoreContract.grant_role(address, shortString.encodeShortString(role))

  const calls = roles.map(role =>
    roleStoreContract.populate('grant_role', [address, shortString.encodeShortString(role)]),
  )
  const result = await roleAdmin.execute(calls)
  const receipt = await roleAdmin.waitForTransaction(result.transaction_hash)

  if (receipt.isSuccess()) {
    console.debug(`Role ${roles.join(', ')} granted to ${entityName ?? address}`)
    return
  }

  throw new Error(`Failed to grant role ${roles.join(', ')} to ${entityName ?? address}`)
}

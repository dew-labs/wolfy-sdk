import {type Hashable, poseidonHash} from './utils'

// export const MAX_POOL_AMOUNT_FOR_DEPOSIT_KEY = poseidonHash("MAX_POOL_AMOUNT_FOR_DEPOSIT");
// export const FUNDING_INCREASE_FACTOR_PER_SECOND = poseidonHash("FUNDING_INCREASE_FACTOR_PER_SECOND");
// export const FUNDING_DECREASE_FACTOR_PER_SECOND = poseidonHash("FUNDING_DECREASE_FACTOR_PER_SECOND");
// export const MIN_FUNDING_FACTOR_PER_SECOND = poseidonHash("MIN_FUNDING_FACTOR_PER_SECOND");
// export const MAX_FUNDING_FACTOR_PER_SECOND = poseidonHash("MAX_FUNDING_FACTOR_PER_SECOND");
// export const THRESHOLD_FOR_STABLE_FUNDING = poseidonHash("THRESHOLD_FOR_STABLE_FUNDING");
// export const THRESHOLD_FOR_DECREASE_FUNDING = poseidonHash("THRESHOLD_FOR_DECREASE_FUNDING");

// export const MIN_POSITION_IMPACT_POOL_AMOUNT_KEY = poseidonHash("MIN_POSITION_IMPACT_POOL_AMOUNT");
// export const POSITION_IMPACT_POOL_DISTRIBUTION_RATE_KEY = poseidonHash(
//     "POSITION_IMPACT_POOL_DISTRIBUTION_RATE"
// );
// export const SWAP_IMPACT_POOL_AMOUNT_KEY = poseidonHash("SWAP_IMPACT_POOL_AMOUNT");
// export const ESTIMATED_GAS_FEE_BASE_AMOUNT = poseidonHash("ESTIMATED_GAS_FEE_BASE_AMOUNT");
// export const ESTIMATED_GAS_FEE_MULTIPLIER_FACTOR = poseidonHash("ESTIMATED_GAS_FEE_MULTIPLIER_FACTOR");
// export const POOL_AMOUNT_ADJUSTMENT_KEY = poseidonHash("POOL_AMOUNT_ADJUSTMENT");

// export const PRICE_FEED = poseidonHash("PRICE_FEED");
// export const PRICE_FEED_MULTIPLIER = poseidonHash("PRICE_FEED_MULTIPLIER");
// export const PRICE_FEED_HEARTBEAT_DURATION = poseidonHash("PRICE_FEED_HEARTBEAT_DURATION");

// export const MIN_ORACLE_SIGNERS = poseidonHash("MIN_ORACLE_SIGNERS");
// export const FEE_TOKEN = poseidonHash("FEE_TOKEN");

// export const MAX_ORACLE_PRICE_AGE = poseidonHash("MAX_ORACLE_PRICE_AGE");

// export function fundingIncreaseFactorPerSecondKey(market: Hashable) {
//     return poseidonHash([FUNDING_INCREASE_FACTOR_PER_SECOND, market]);
// }

// export function fundingDecreaseFactorPerSecondKey(market: Hashable) {
//     return poseidonHash([FUNDING_DECREASE_FACTOR_PER_SECOND, market]);
// }

// export function minFundingFactorPerSecondKey(market: Hashable) {
//     return poseidonHash([MIN_FUNDING_FACTOR_PER_SECOND, market]);
// }

// export function maxFundingFactorPerSecondKey(market: Hashable) {
//     return poseidonHash([MAX_FUNDING_FACTOR_PER_SECOND, market]);
// }

// export function thresholdForStableFundingKey(market: Hashable) {
//     return poseidonHash([THRESHOLD_FOR_STABLE_FUNDING, market]);
// }

// export function thresholdForDecreaseFundingKey(market: Hashable) {
//     return poseidonHash([THRESHOLD_FOR_DECREASE_FUNDING, market]);
// }

// export function minPositionImpactPoolAmountKey(market: Hashable) {
//     return poseidonHash([MIN_POSITION_IMPACT_POOL_AMOUNT_KEY, market]);
// }

// export function positionImpactPoolDistributionRateKey(market: Hashable) {
//     return poseidonHash([POSITION_IMPACT_POOL_DISTRIBUTION_RATE_KEY, market]);
// }

// export function poolAmountAdjustmentKey(market: Hashable, token: Hashable) {
//     return poseidonHash([POOL_AMOUNT_ADJUSTMENT_KEY, market, token]);
// }

// export function maxPoolAmountForDepositKey(market: Hashable, token: Hashable) {
//     return poseidonHash([MAX_POOL_AMOUNT_FOR_DEPOSIT_KEY, market, token]);
// }

// export function priceFeedKey(token: Hashable) {
//     return poseidonHash([PRICE_FEED, token]);
// }

// export function priceFeedMultiplierKey(token: Hashable) {
//     return poseidonHash([PRICE_FEED_MULTIPLIER, token]);
// }

// export function priceFeedHeartbeatDurationKey(token: Hashable) {
//     return poseidonHash([PRICE_FEED_HEARTBEAT_DURATION, token]);
// }

// export function getPositionKey(
//     account: Hashable,
//     market: Hashable,
//     collateral_token: Hashable,
//     is_long: boolean
// ) {
//     return poseidonHash([account, market, collateral_token, is_long]);
// }

export const REQUEST_EXPIRATION_BLOCK_AGE = poseidonHash('REQ_EXPIR_BLOCK_AGE')
export const MAX_ORAC_REF_PRICE_DEV_FACTOR = poseidonHash('MAX_ORAC_REF_PRICE_DEV_FACTOR')
export const STABLE_PRICE = poseidonHash('STABLE_PRICE')
export const POSITION_IMPACT_FACTOR_KEY = poseidonHash('POSITION_IMPACT_FACTOR')
export const MAX_POSITION_IMPACT_FACTOR_KEY = poseidonHash('MAX_POS_IMPACT_FACTOR')
export const POSITION_IMPACT_EXPONENT_FACTOR_KEY = poseidonHash('POS_IMPACT_EXP_FACTOR')
export const POSITION_FEE_FACTOR_KEY = poseidonHash('POSITION_FEE_FACTOR')
export const SWAP_IMPACT_FACTOR_KEY = poseidonHash('SWAP_IMPACT_FACTOR')
export const SWAP_IMPACT_EXPONENT_FACTOR_KEY = poseidonHash('SWAP_IMPACT_EXP_FACTOR')
export const SWAP_FEE_FACTOR_KEY = poseidonHash('SWAP_FEE_FACTOR')
export const BORROWING_FEE_RECEIVER_FACTOR = poseidonHash('BORROWING_FEE_RECEIVER_FACTOR')
export const SWAP_FEE_RECEIVER_FACTOR = poseidonHash('SWAP_FEE_RECEIVER_FACTOR')
export const POSITION_FEE_RECEIVER_FACTOR = poseidonHash('POSITION_FEE_RECEIVER_FACTOR')
export const OPEN_INTEREST_KEY = poseidonHash('OPEN_INTEREST')
export const OPEN_INTEREST_IN_TOKENS_KEY = poseidonHash('OPEN_INTEREST_IN_TOKENS')
export const POOL_AMOUNT_KEY = poseidonHash('POOL_AMOUNT')
export const MAX_POOL_AMOUNT_KEY = poseidonHash('MAX_POOL_AMOUNT')
export const RESERVE_FACTOR_KEY = poseidonHash('RESERVE_FACTOR')
export const OPEN_INTEREST_RESERVE_FACTOR_KEY = poseidonHash('OI_RESERVE_FACTOR')
export const MAX_OPEN_INTEREST_KEY = poseidonHash('MAX_OPEN_INTEREST')
export const NONCE_KEY = poseidonHash('NONCE')
export const BORROWING_FACTOR_KEY = poseidonHash('BORROWING_FACTOR')
export const BORROWING_EXPONENT_FACTOR_KEY = poseidonHash('BORROWING_EXPONENT_FACTOR')
export const CUMULATIVE_BORROWING_FACTOR_KEY = poseidonHash('CUMULATIVE_BORROWING_FACTOR')
export const TOTAL_BORROWING_KEY = poseidonHash('TOTAL_BORROWING')
export const FUNDING_FACTOR_KEY = poseidonHash('FUNDING_FACTOR')
export const STABLE_FUNDING_FACTOR_KEY = poseidonHash('STABLE_FUNDING_FACTOR')
export const FUNDING_EXPONENT_FACTOR_KEY = poseidonHash('FUNDING_EXPONENT_FACTOR')
export const MAX_PNL_FACTOR_KEY = poseidonHash('MAX_PNL_FACTOR')
export const MAX_PNL_FACTOR_FOR_WITHDRAWALS_KEY = poseidonHash('MAX_PNL_FACT_FOR_WITHDRAWALS')
export const MAX_PNL_FACTOR_FOR_DEPOSITS_KEY = poseidonHash('MAX_PNL_FACTOR_FOR_DEPOSITS')
export const MAX_PNL_FACTOR_FOR_TRADERS_KEY = poseidonHash('MAX_PNL_FACT_FOR_TRADERS')
export const MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS_KEY = poseidonHash(
  'MAX_POS_IMP_FACT_FOR_LIQ',
)
export const POSITION_IMPACT_POOL_AMOUNT_KEY = poseidonHash('POS_IMPACT_POOL_AMT')
export const SWAP_IMPACT_POOL_AMOUNT_KEY = poseidonHash('SWAP_IMPACT_POOL_AMT')
export const MIN_COLLATERAL_USD_KEY = poseidonHash('MIN_COLLATERAL_USD')
export const MIN_COLLATERAL_FACTOR_KEY = poseidonHash('MIN_COLLATERAL_FACTOR')
export const MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER_KEY = poseidonHash(
  'MIN_COLL_FACT_FOR_OI_MULT',
)
export const MIN_POSITION_SIZE_USD_KEY = poseidonHash('MIN_POSITION_SIZE_USD')
export const DEPOSIT_GAS_LIMIT_KEY = poseidonHash('DEPOSIT_GAS_LIMIT')
export const WITHDRAWAL_GAS_LIMIT_KEY = poseidonHash('WITHDRAW_GAS_LIMIT')
export const INCREASE_ORDER_GAS_LIMIT_KEY = poseidonHash('INCR_ORD_GAS_LIMIT')
export const DECREASE_ORDER_GAS_LIMIT_KEY = poseidonHash('DECR_ORD_GAS_LIMIT')
export const SWAP_ORDER_GAS_LIMIT_KEY = poseidonHash('SWAP_ORD_GAS_LIMIT')
export const SINGLE_SWAP_GAS_LIMIT_KEY = poseidonHash('SINGLE_SWAP_GAS_LIMIT')
export const TOKEN_TRANSFER_GAS_LIMIT_KEY = poseidonHash('TOKEN_TRANS_GAS_LIMIT')
export const NATIVE_TOKEN_TRANSFER_GAS_LIMIT_KEY = poseidonHash('NATIVE_TKN_TRANS_GL')
export const MARKET_LIST_KEY = poseidonHash('MARKET_LIST')
export const POSITION_LIST_KEY = poseidonHash('POSITION_LIST')
export const ACCOUNT_POSITION_LIST_KEY = poseidonHash('ACCOUNT_POSITION_LIST')
export const ORDER_LIST_KEY = poseidonHash('ORDER_LIST')
export const ACCOUNT_ORDER_LIST_KEY = poseidonHash('ACCOUNT_ORDER_LIST')
export const CLAIMABLE_FUNDING_AMOUNT = poseidonHash('CLAIMABLE_FUNDING_AMOUNT')
export const VIRTUAL_TOKEN_ID_KEY = poseidonHash('VIRTUAL_TOKEN_ID')
export const VIRTUAL_MARKET_ID_KEY = poseidonHash('VIRTUAL_MARKET_ID')
export const VIRTUAL_INVENTORY_FOR_POSITIONS_KEY = poseidonHash('VIRT_INV_FOR_POSITIONS')
export const VIRTUAL_INVENTORY_FOR_SWAPS_KEY = poseidonHash('VIRT_INV_FOR_SWAPS')
export const AFFILIATE_REWARD_KEY = poseidonHash('AFFILIATE_REWARD')
export const IS_MARKET_DISABLED_KEY = poseidonHash('IS_MARKET_DISABLED')
export const UI_FEE_FACTOR = poseidonHash('UI_FEE_FACTOR')
export const MAX_PNL_FACTOR_FOR_ADL = poseidonHash('MAX_PNL_FACTOR_FOR_ADL')
export const MIN_PNL_FACTOR_AFTER_ADL = poseidonHash('MIN_PNL_FACTOR_AFTER_ADL')

export function minPnlFactorAfterAdl(market: Hashable, isLong: boolean) {
  return poseidonHash([MIN_PNL_FACTOR_AFTER_ADL, market, isLong])
}
// -----------------------------------------------------------------------------

export function positionImpactFactorKey(market: Hashable, isPositive: boolean) {
  return poseidonHash([POSITION_IMPACT_FACTOR_KEY, market, isPositive])
}

export function positionImpactExponentFactorKey(market: Hashable) {
  return poseidonHash([POSITION_IMPACT_EXPONENT_FACTOR_KEY, market])
}

export function maxPositionImpactFactorKey(market: Hashable, isPositive: boolean) {
  return poseidonHash([MAX_POSITION_IMPACT_FACTOR_KEY, market, isPositive])
}

export function positionFeeFactorKey(market: Hashable, forPositiveImpact: boolean) {
  return poseidonHash([POSITION_FEE_FACTOR_KEY, market, forPositiveImpact])
}

export function swapImpactFactorKey(market: Hashable, isPositive: boolean) {
  return poseidonHash([SWAP_IMPACT_FACTOR_KEY, market, isPositive])
}

export function swapImpactExponentFactorKey(market: Hashable) {
  return poseidonHash([SWAP_IMPACT_EXPONENT_FACTOR_KEY, market])
}

export function swapFeeFactorKey(market: Hashable, forPositiveImpact: boolean) {
  return poseidonHash([SWAP_FEE_FACTOR_KEY, market, forPositiveImpact])
}

export function openInterestKey(market: Hashable, collateralToken: Hashable, isLong: boolean) {
  return poseidonHash([OPEN_INTEREST_KEY, market, collateralToken, isLong])
}

export function openInterestInTokensKey(
  market: Hashable,
  collateralToken: Hashable,
  isLong: boolean,
) {
  return poseidonHash([OPEN_INTEREST_IN_TOKENS_KEY, market, collateralToken, isLong])
}

export function poolAmountKey(market: Hashable, token: Hashable) {
  return poseidonHash([POOL_AMOUNT_KEY, market, token])
}

export function reserveFactorKey(market: Hashable, isLong: boolean) {
  return poseidonHash([RESERVE_FACTOR_KEY, market, isLong])
}

export function openInterestReserveFactorKey(market: Hashable, isLong: boolean) {
  return poseidonHash([OPEN_INTEREST_RESERVE_FACTOR_KEY, market, isLong])
}

export function maxOpenInterestKey(market: Hashable, isLong: boolean) {
  return poseidonHash([MAX_OPEN_INTEREST_KEY, market, isLong])
}

export function borrowingFactorKey(market: Hashable, isLong: boolean) {
  return poseidonHash([BORROWING_FACTOR_KEY, market, isLong])
}

export function borrowingExponentFactorKey(market: Hashable, isLong: boolean) {
  return poseidonHash([BORROWING_EXPONENT_FACTOR_KEY, market, isLong])
}

export function cumulativeBorrowingFactorKey(market: Hashable, isLong: boolean) {
  return poseidonHash([CUMULATIVE_BORROWING_FACTOR_KEY, market, isLong])
}

export function totalBorrowingKey(market: Hashable, isLong: boolean) {
  return poseidonHash([TOTAL_BORROWING_KEY, market, isLong])
}

export function fundingFactorKey(market: Hashable) {
  return poseidonHash([FUNDING_FACTOR_KEY, market])
}

export function stableFundingFactorKey(market: Hashable) {
  return poseidonHash([STABLE_FUNDING_FACTOR_KEY, market])
}

export function fundingExponentFactorKey(market: Hashable) {
  return poseidonHash([FUNDING_EXPONENT_FACTOR_KEY, market])
}

export function maxPnlFactorKey(pnlFactorType: Hashable, market: Hashable, isLong: boolean) {
  return poseidonHash([MAX_PNL_FACTOR_KEY, pnlFactorType, market, isLong])
}

export function positionImpactPoolAmountKey(market: Hashable) {
  return poseidonHash([POSITION_IMPACT_POOL_AMOUNT_KEY, market])
}

export function maxPositionImpactFactorForLiquidationsKey(market: Hashable) {
  return poseidonHash([MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS_KEY, market])
}

export function swapImpactPoolAmountKey(market: Hashable, token: Hashable) {
  return poseidonHash([SWAP_IMPACT_POOL_AMOUNT_KEY, market, token])
}

export function orderKey(dataStoreAddress: Hashable, nonce: bigint) {
  return poseidonHash([dataStoreAddress, nonce])
}

export function depositGasLimitKey(singleToken: boolean) {
  return poseidonHash([DEPOSIT_GAS_LIMIT_KEY, singleToken])
}

export function withdrawalGasLimitKey() {
  return poseidonHash([WITHDRAWAL_GAS_LIMIT_KEY])
}

export function accountOrderListKey(account: Hashable) {
  return poseidonHash([ACCOUNT_ORDER_LIST_KEY, account])
}

export function accountPositionListKey(account: Hashable) {
  return poseidonHash([ACCOUNT_POSITION_LIST_KEY, account])
}

export function minCollateralFactorKey(market: Hashable) {
  return poseidonHash([MIN_COLLATERAL_FACTOR_KEY, market])
}

export function minCollateralFactorForOpenInterest(market: Hashable, isLong: boolean) {
  return poseidonHash([MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER_KEY, market, isLong])
}

export function hashedPositionKey(
  account: Hashable,
  market: Hashable,
  collateralToken: Hashable,
  isLong: boolean,
) {
  return poseidonHash([account, market, collateralToken, isLong])
}

export function claimableFundingAmountKey(market: Hashable, token: Hashable, account: Hashable) {
  return poseidonHash([CLAIMABLE_FUNDING_AMOUNT, market, token, account])
}
export function virtualTokenIdKey(token: Hashable) {
  return poseidonHash([VIRTUAL_TOKEN_ID_KEY, token])
}

export function virtualMarketIdKey(market: Hashable) {
  return poseidonHash([VIRTUAL_MARKET_ID_KEY, market])
}

export function virtualInventoryForSwapsKey(virtualMarketId: Hashable, token: Hashable) {
  return poseidonHash([VIRTUAL_INVENTORY_FOR_SWAPS_KEY, virtualMarketId, token])
}

export function virtualInventoryForPositionsKey(virtualTokenId: Hashable) {
  return poseidonHash([VIRTUAL_INVENTORY_FOR_POSITIONS_KEY, virtualTokenId])
}

export function affiliateRewardKey(market: Hashable, token: Hashable, account: Hashable) {
  return poseidonHash([AFFILIATE_REWARD_KEY, market, token, account])
}

export function isMarketDisabledKey(market: Hashable) {
  return poseidonHash([IS_MARKET_DISABLED_KEY, market])
}

export function maxPoolAmountKey(market: Hashable, token: Hashable) {
  return poseidonHash([MAX_POOL_AMOUNT_KEY, market, token])
}

export function uiFeeFactorKey(address: Hashable) {
  return poseidonHash([UI_FEE_FACTOR, address])
}

export function stablePriceTokenKey(token: Hashable) {
  return poseidonHash([STABLE_PRICE, token])
}

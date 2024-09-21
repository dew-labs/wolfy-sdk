import {type Hashable, poseidonHash} from './utils'

export const FEE_TOKEN = poseidonHash('FEE_TOKEN')
export const NONCE = poseidonHash('NONCE')
export const FEE_RECEIVER = poseidonHash('FEE_RECEIVER')
export const HOLDING_ADDRESS = poseidonHash('HOLDING_ADDRESS')
export const MIN_HANDLE_EXECUTION_ERROR_GAS = poseidonHash('MIN_HANDLE_EXECUTION_ERROR_GAS')
export const MARKET_LIST = poseidonHash('MARKET_LIST')
export const DEPOSIT_LIST = poseidonHash('DEPOSIT_LIST')
export const ACCOUNT_DEPOSIT_LIST = poseidonHash('ACCOUNT_DEPOSIT_LIST')
export const WITHDRAWAL_LIST = poseidonHash('WITHDRAWAL_LIST')
export const ACCOUNT_WITHDRAWAL_LIST = poseidonHash('ACCOUNT_WITHDRAWAL_LIST')
export const POSITION_LIST = poseidonHash('POSITION_LIST')
export const ACCOUNT_POSITION_LIST = poseidonHash('ACCOUNT_POSITION_LIST')
export const ORDER_LIST = poseidonHash('ORDER_LIST')
export const ACCOUNT_ORDER_LIST = poseidonHash('ACCOUNT_ORDER_LIST')
export const CREATE_DEPOSIT_FEATURE_DISABLED = poseidonHash('CREATE_DEPOSIT_FEATURE_DISABLED')
export const CANCEL_DEPOSIT_FEATURE_DISABLED = poseidonHash('CANCEL_DEPOSIT_FEATURE_DISABLED')
export const EXECUTE_DEPOSIT_FEATURE_DISABLED = poseidonHash('EXEC_DEPOSIT_FEATURE_DISABLED')

export const CREATE_ORDER_FEATURE_DISABLED = poseidonHash('CREATE_ORDER_FEATURE_DISABLED')
export const EXECUTE_ORDER_FEATURE_DISABLED = poseidonHash('EXECUTE_ORDER_FEATURE_DISABLED')
export const EXECUTE_ADL_FEATURE_DISABLED = poseidonHash('EXECUTE_ADL_FEATURE_DISABLED')
export const UPDATE_ORDER_FEATURE_DISABLED = poseidonHash('UPDATE_ORDER_FEATURE_DISABLED')
export const CANCEL_ORDER_FEATURE_DISABLED = poseidonHash('CANCEL_ORDER_FEATURE_DISABLED')
export const CLAIMABLE_FEE_AMOUNT = poseidonHash('CLAIMABLE_FEE_AMOUNT')
export const CLAIMABLE_FUNDING_AMOUNT = poseidonHash('CLAIMABLE_FUNDING_AMOUNT')
export const CLAIMABLE_COLLATERAL_AMOUNT = poseidonHash('CLAIMABLE_COLLATERAL_AMT')
export const CLAIMABLE_COLLATERAL_FACTOR = poseidonHash('CLAIMABLE_COLL_FACTOR')
export const CLAIMABLE_COLLATERAL_TIME_DIVISOR = poseidonHash('CLAIMABLE_COLL_TIME_DIV')
export const CLAIMABLE_UI_FEE_AMOUNT = poseidonHash('CLAIMABLE_UI_FEE_AMOUNT')
export const AFFILIATE_REWARD = poseidonHash('AFFILIATE_REWARD')
export const UI_FEE_FACTOR = poseidonHash('UI_FEE_FACTOR')
export const MAX_UI_FEE_FACTOR = poseidonHash('MAX_UI_FEE_FACTOR')
export const IS_MARKET_DISABLED = poseidonHash('IS_MARKET_DISABLED')
export const MAX_SWAP_PATH_LENGTH = poseidonHash('MAX_SWAP_PATH_LENGTH')
export const MIN_ORACLE_BLOCK_CONFIRMATIONS = poseidonHash('MIN_ORACLE_BLOCK_CONFIRMATIONS')
export const MAX_ORACLE_PRICE_AGE = poseidonHash('MAX_ORACLE_PRICE_AGE')
export const MAX_ORACLE_REF_PRICE_DEVIATION_FACTOR = poseidonHash('MAX_ORAC_REF_PRICE_DEV_FACTOR')
export const MIN_ORACLE_SIGNERS = poseidonHash('MIN_ORACLE_SIGNERS')

export const MIN_COLLATERAL_FACTOR = poseidonHash('MIN_COLLATERAL_FACTOR')
export const MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER = poseidonHash(
  'MIN_COLL_FACT_FOR_OI_MULT',
)
export const MIN_COLLATERAL_USD = poseidonHash('MIN_COLLATERAL_USD')
export const MIN_POSITION_SIZE_USD = poseidonHash('MIN_POSITION_SIZE_USD')
export const SWAP_FEE_RECEIVER_FACTOR = poseidonHash('SWAP_FEE_RECEIVER_FACTOR')
export const TOKEN_TRANSFER_GAS_LIMIT = poseidonHash('TOKEN_TRANS_GAS_LIMIT')
export const NATIVE_TOKEN_TRANSFER_GAS_LIMIT = poseidonHash('NATIVE_TKN_TRANS_GL')
export const MAX_CALLBACK_GAS_LIMIT = poseidonHash('MAX_CALLBACK_GAS_LIMIT')
export const REQUEST_EXPIRATION_BLOCK_AGE = poseidonHash('REQ_EXPIR_BLOCK_AGE')
export const PRICE_FEED = poseidonHash('PRICE_FEED')
export const PRICE_FEED_MULTIPLIER = poseidonHash('PRICE_FEED_MULTIPLIER')
export const PRICE_FEED_HEARTBEAT_DURATION = poseidonHash('PRICE_FEED_HB_DURATION')
// Not implemented in satoru contract, but implemented in gmx
// export const REALTIME_FEED_ID = poseidonHash("REALTIME_FEED_ID");
// export const REALTIME_FEED_MULTIPLIER = poseidonHash("REALTIME_FEED_MULTIPLIER");
export const STABLE_PRICE = poseidonHash('STABLE_PRICE')
export const ORACLE_TYPE = poseidonHash('ORACLE_TYPE')
export const OPEN_INTEREST = poseidonHash('OPEN_INTEREST')
export const OPEN_INTEREST_IN_TOKENS = poseidonHash('OPEN_INTEREST_IN_TOKENS')
export const COLLATERAL_SUM = poseidonHash('COLLATERAL_SUM')
export const POOL_AMOUNT = poseidonHash('POOL_AMOUNT')
export const MAX_POOL_AMOUNT = poseidonHash('MAX_POOL_AMOUNT')
export const MAX_OPEN_INTEREST = poseidonHash('MAX_OPEN_INTEREST')
export const POSITION_IMPACT_POOL_AMOUNT = poseidonHash('POS_IMPACT_POOL_AMT')
export const SWAP_IMPACT_POOL_AMOUNT = poseidonHash('SWAP_IMPACT_POOL_AMT')
export const POSITION_FEE_RECEIVER_FACTOR = poseidonHash('POSITION_FEE_RECEIVER_FACTOR')
export const BORROWING_FEE_RECEIVER_FACTOR = poseidonHash('BORROWING_FEE_RECEIVER_FACTOR')
export const SWAP_FEE_FACTOR = poseidonHash('SWAP_FEE_FACTOR')
export const SWAP_IMPACT_FACTOR = poseidonHash('SWAP_IMPACT_FACTOR')
export const SWAP_IMPACT_EXPONENT_FACTOR = poseidonHash('SWAP_IMPACT_EXP_FACTOR')
export const POSITION_IMPACT_FACTOR = poseidonHash('POSITION_IMPACT_FACTOR')
export const POSITION_IMPACT_EXPONENT_FACTOR = poseidonHash('POS_IMPACT_EXP_FACTOR')
export const MAX_POSITION_IMPACT_FACTOR = poseidonHash('MAX_POS_IMPACT_FACTOR')
export const MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS = poseidonHash('MAX_POS_IMP_FACT_FOR_LIQ')
export const POSITION_FEE_FACTOR = poseidonHash('POSITION_FEE_FACTOR')
export const RESERVE_FACTOR = poseidonHash('RESERVE_FACTOR')
export const OPEN_INTEREST_RESERVE_FACTOR = poseidonHash('OI_RESERVE_FACTOR')
export const MAX_PNL_FACTOR = poseidonHash('MAX_PNL_FACTOR')
export const MAX_PNL_FACTOR_FOR_TRADERS = poseidonHash('MAX_PNL_FACT_FOR_TRADERS')
export const MAX_PNL_FACTOR_FOR_ADL = poseidonHash('MAX_PNL_FACTOR_FOR_ADL')
export const MIN_PNL_FACTOR_AFTER_ADL = poseidonHash('MIN_PNL_FACTOR_AFTER_ADL')
export const MAX_PNL_FACTOR_FOR_DEPOSITS = poseidonHash('MAX_PNL_FACTOR_FOR_DEPOSITS')
export const MAX_PNL_FACTOR_FOR_WITHDRAWALS = poseidonHash('MAX_PNL_FACT_FOR_WITHDRAWALS')
export const LATEST_ADL_BLOCK = poseidonHash('LATEST_ADL_BLOCK')
export const IS_ADL_ENABLED = poseidonHash('IS_ADL_ENABLED')
export const FUNDING_FACTOR = poseidonHash('FUNDING_FACTOR')
export const FUNDING_EXPONENT_FACTOR = poseidonHash('FUNDING_EXPONENT_FACTOR')
export const FUNDING_FEE_AMOUNT_PER_SIZE = poseidonHash('FUNDING_FEE_AMT_PER_SIZE')
export const CLAIMABLE_FUNDING_AMOUNT_PER_SIZE = poseidonHash('CLAIMABLE_FUND_AMT_PER_SIZE')
export const FUNDING_UPDATED_AT = poseidonHash('FUNDING_UPDATED_AT')
export const BORROWING_FACTOR = poseidonHash('BORROWING_FACTOR')
export const BORROWING_EXPONENT_FACTOR = poseidonHash('BORROWING_EXPONENT_FACTOR')
export const SKIP_BORROWING_FEE_FOR_SMALLER_SIDE = poseidonHash('SKIP_BORROW_FEE_SMALLER_SIDE')
export const ESTIMATED_GAS_FEE_BASE_AMOUNT = poseidonHash('EST_GAS_FEE_BASE_AMT')
export const ESTIMATED_GAS_FEE_MULTIPLIER_FACTOR = poseidonHash('EST_GAS_FEE_MULT_FACT')
export const EXECUTION_GAS_FEE_BASE_AMOUNT = poseidonHash('EXEC_GAS_FEE_BASE_AMT')
export const EXECUTION_GAS_FEE_MULTIPLIER_FACTOR = poseidonHash('EXEC_GAS_FEE_MULT_FACT')
export const DEPOSIT_GAS_LIMIT = poseidonHash('DEPOSIT_GAS_LIMIT')
export const WITHDRAWAL_GAS_LIMIT = poseidonHash('WITHDRAW_GAS_LIMIT')
export const SINGLE_SWAP_GAS_LIMIT = poseidonHash('SINGLE_SWAP_GAS_LIMIT')
export const INCREASE_ORDER_GAS_LIMIT = poseidonHash('INCR_ORD_GAS_LIMIT')
export const DECREASE_ORDER_GAS_LIMIT = poseidonHash('DECR_ORD_GAS_LIMIT')
export const SWAP_ORDER_GAS_LIMIT = poseidonHash('SWAP_ORD_GAS_LIMIT')
export const CUMULATIVE_BORROWING_FACTOR = poseidonHash('CUMULATIVE_BORROWING_FACTOR')
export const CUMULATIVE_BORROWING_FACTOR_UPDATED_AT = poseidonHash('CUMUL_BORROW_FACT_UPDATED_AT')
export const VIRTUAL_TOKEN_ID = poseidonHash('VIRTUAL_TOKEN_ID')
export const VIRTUAL_MARKET_ID = poseidonHash('VIRTUAL_MARKET_ID')
export const VIRTUAL_INVENTORY_FOR_SWAPS = poseidonHash('VIRT_INV_FOR_SWAPS')
export const VIRTUAL_INVENTORY_FOR_POSITIONS = poseidonHash('VIRT_INV_FOR_POSITIONS')

// ---------------------------------------------------------------------------------------------------------------------

export function accountDepositListKey(account: Hashable) {
  return poseidonHash([ACCOUNT_DEPOSIT_LIST, account])
}

export function accountWithdrawalListKey(account: Hashable) {
  return poseidonHash([ACCOUNT_WITHDRAWAL_LIST, account])
}

export function accountPositionListKey(account: Hashable) {
  return poseidonHash([ACCOUNT_POSITION_LIST, account])
}

export function accountOrderListKey(account: Hashable) {
  return poseidonHash([ACCOUNT_ORDER_LIST, account])
}

export function isMarketDisabledKey(market: Hashable) {
  return poseidonHash([IS_MARKET_DISABLED, market])
}

export function createDepositFeatureDisabledKey(contract: Hashable) {
  return poseidonHash([CREATE_DEPOSIT_FEATURE_DISABLED, contract])
}

export function cancelDepositFeatureDisabledKey(contract: Hashable) {
  return poseidonHash([CANCEL_DEPOSIT_FEATURE_DISABLED, contract])
}

export function executeDepositFeatureDisabledKey(contract: Hashable) {
  return poseidonHash([EXECUTE_DEPOSIT_FEATURE_DISABLED, contract])
}

export function createOrderFeatureDisabledKey(contract: Hashable, orderType: Hashable) {
  return poseidonHash([CREATE_ORDER_FEATURE_DISABLED, contract, orderType])
}

export function executeOrderFeatureDisabledKey(contract: Hashable, orderType: Hashable) {
  return poseidonHash([EXECUTE_ORDER_FEATURE_DISABLED, contract, orderType])
}

export function executeAdlFeatureDisabledKey(contract: Hashable, orderType: Hashable) {
  return poseidonHash([EXECUTE_ADL_FEATURE_DISABLED, contract, orderType])
}

export function updateOrderFeatureDisabledKey(contract: Hashable, orderType: Hashable) {
  return poseidonHash([UPDATE_ORDER_FEATURE_DISABLED, contract, orderType])
}

export function cancelOrderFeatureDisabledKey(contract: Hashable, orderType: Hashable) {
  return poseidonHash([CANCEL_ORDER_FEATURE_DISABLED, contract, orderType])
}

export function claimableFeeAmountKey(market: Hashable, token: Hashable) {
  return poseidonHash([CLAIMABLE_FEE_AMOUNT, market, token])
}

export function claimableFundingAmountKey(market: Hashable, token: Hashable, account: Hashable) {
  return poseidonHash([CLAIMABLE_FUNDING_AMOUNT, market, token, account])
}

export function claimableCollateralAmountKey(
  market: Hashable,
  token: Hashable,
  timeKey: Hashable,
  account: Hashable,
) {
  return poseidonHash([CLAIMABLE_COLLATERAL_AMOUNT, market, token, timeKey, account])
}

export function claimableCollateralFactorKey(market: Hashable, token: Hashable, timeKey: Hashable) {
  return poseidonHash([CLAIMABLE_COLLATERAL_FACTOR, market, token, timeKey])
}

export function claimableUiFeeAmountKey(
  market: Hashable,
  token: Hashable,
  uiFeeReceiver: Hashable,
) {
  return poseidonHash([CLAIMABLE_UI_FEE_AMOUNT, market, token, uiFeeReceiver])
}

export function affiliateRewardKey(market: Hashable, token: Hashable, account: Hashable) {
  return poseidonHash([AFFILIATE_REWARD, market, token, account])
}

export function tokenTransferGasLimit(token: Hashable) {
  return poseidonHash([TOKEN_TRANSFER_GAS_LIMIT, token])
}

export function priceFeedKey(token: Hashable) {
  return poseidonHash([PRICE_FEED, token])
}

export function priceFeedMultiplierKey(token: Hashable) {
  return poseidonHash([PRICE_FEED_MULTIPLIER, token])
}

export function priceFeedHeartbeatDurationKey(token: Hashable) {
  return poseidonHash([PRICE_FEED_HEARTBEAT_DURATION, token])
}

// export function realtimeFeedIdKey(token: Hashable) {
//   return poseidonHash([REALTIME_FEED_ID, token]);
// }

// export function realtimeFeedMultiplierKey(token: Hashable) {
//   return poseidonHash([REALTIME_FEED_MULTIPLIER, token]);
// }

export function stablePriceKey(token: Hashable) {
  return poseidonHash([STABLE_PRICE, token])
}

export function oracleTypeKey(token: Hashable) {
  return poseidonHash([ORACLE_TYPE, token])
}

export function openInterestKey(market: Hashable, collateralToken: Hashable, isLong: boolean) {
  return poseidonHash([OPEN_INTEREST, market, collateralToken, isLong])
}

export function openInterestInTokensKey(
  market: Hashable,
  collateralToken: Hashable,
  isLong: boolean,
) {
  return poseidonHash([OPEN_INTEREST_IN_TOKENS, market, collateralToken, isLong])
}

export function minCollateralFactorKey(market: Hashable) {
  return poseidonHash([MIN_COLLATERAL_FACTOR, market])
}

export function minCollateralFactorForOpenInterestMultiplierKey(market: Hashable, isLong: boolean) {
  return poseidonHash([MIN_COLLATERAL_FACTOR_FOR_OPEN_INTEREST_MULTIPLIER, market, isLong])
}

export function reserveFactorKey(market: Hashable, isLong: boolean) {
  return poseidonHash([RESERVE_FACTOR, market, isLong])
}

export function openInterestReserveFactorKey(market: Hashable, isLong: boolean) {
  return poseidonHash([OPEN_INTEREST_RESERVE_FACTOR, market, isLong])
}

export function maxPnlFactorKey(pnlFactorType: Hashable, market: Hashable, isLong: boolean) {
  return poseidonHash([MAX_PNL_FACTOR, pnlFactorType, market, isLong])
}

export function minPnlFactorAfterAdlKey(market: Hashable, isLong: boolean) {
  return poseidonHash([MIN_PNL_FACTOR_AFTER_ADL, market, isLong])
}

export function collateralSumKey(market: Hashable, collateralToken: Hashable, isLong: boolean) {
  return poseidonHash([COLLATERAL_SUM, market, collateralToken, isLong])
}

export function poolAmountKey(market: Hashable, token: Hashable) {
  return poseidonHash([POOL_AMOUNT, market, token])
}

export function maxPoolAmountKey(market: Hashable, token: Hashable) {
  return poseidonHash([MAX_POOL_AMOUNT, market, token])
}

export function maxOpenInterestKey(market: Hashable, isLong: boolean) {
  return poseidonHash([MAX_OPEN_INTEREST, market, isLong])
}

export function positionImpactPoolAmountKey(market: Hashable) {
  return poseidonHash([POSITION_IMPACT_POOL_AMOUNT, market])
}

export function swapImpactPoolAmountKey(market: Hashable, token: Hashable) {
  return poseidonHash([SWAP_IMPACT_POOL_AMOUNT, market, token])
}

export function swapFeeFactorKey(market: Hashable, forPositiveImpact: boolean) {
  return poseidonHash([SWAP_FEE_FACTOR, market, forPositiveImpact])
}

export function swapImpactFactorKey(market: Hashable, isPositive: boolean) {
  return poseidonHash([SWAP_IMPACT_FACTOR, market, isPositive])
}

export function swapImpactExponentFactorKey(market: Hashable) {
  return poseidonHash([SWAP_IMPACT_EXPONENT_FACTOR, market])
}

export function positionImpactFactorKey(market: Hashable, isPositive: boolean) {
  return poseidonHash([POSITION_IMPACT_FACTOR, market, isPositive])
}

export function positionImpactExponentFactorKey(market: Hashable) {
  return poseidonHash([POSITION_IMPACT_EXPONENT_FACTOR, market])
}

export function maxPositionImpactFactorKey(market: Hashable, isPositive: boolean) {
  return poseidonHash([MAX_POSITION_IMPACT_FACTOR, market, isPositive])
}

export function maxPositionImpactFactorForLiquidationsKey(market: Hashable) {
  return poseidonHash([MAX_POSITION_IMPACT_FACTOR_FOR_LIQUIDATIONS, market])
}

export function positionFeeFactorKey(market: Hashable, forPositiveImpact: boolean) {
  return poseidonHash([POSITION_FEE_FACTOR, market, forPositiveImpact])
}

export function latestAdlBlockKey(market: Hashable, isLong: boolean) {
  return poseidonHash([LATEST_ADL_BLOCK, market, isLong])
}

export function isAdlEnabledKey(market: Hashable, isLong: boolean) {
  return poseidonHash([IS_ADL_ENABLED, market, isLong])
}

export function fundingFactorKey(market: Hashable) {
  return poseidonHash([FUNDING_FACTOR, market])
}

export function fundingExponentFactorKey(market: Hashable) {
  return poseidonHash([FUNDING_EXPONENT_FACTOR, market])
}

export function fundingFeeAmountPerSizeKey(
  market: Hashable,
  collateralToken: Hashable,
  isLong: boolean,
) {
  return poseidonHash([FUNDING_FEE_AMOUNT_PER_SIZE, market, collateralToken, isLong])
}

export function claimableFundingAmountPerSizeKey(
  market: Hashable,
  collateralToken: Hashable,
  isLong: boolean,
) {
  return poseidonHash([CLAIMABLE_FUNDING_AMOUNT_PER_SIZE, market, collateralToken, isLong])
}

export function fundingUpdatedAtKey(market: Hashable) {
  return poseidonHash([FUNDING_UPDATED_AT, market])
}

export function borrowingFactorKey(market: Hashable, isLong: boolean) {
  return poseidonHash([BORROWING_FACTOR, market, isLong])
}

export function borrowingExponentFactorKey(market: Hashable, isLong: boolean) {
  return poseidonHash([BORROWING_EXPONENT_FACTOR, market, isLong])
}

export function depositGasLimitKey(singleToken: boolean) {
  return poseidonHash([DEPOSIT_GAS_LIMIT, singleToken])
}

export function withdrawalGasLimitKey() {
  return poseidonHash([WITHDRAWAL_GAS_LIMIT])
}

export function singleSwapGasLimitKey() {
  return SINGLE_SWAP_GAS_LIMIT
}

export function increaseOrderGasLimitKey() {
  return INCREASE_ORDER_GAS_LIMIT
}

export function decreaseOrderGasLimitKey() {
  return DECREASE_ORDER_GAS_LIMIT
}

export function swapOrderGasLimitKey() {
  return SWAP_ORDER_GAS_LIMIT
}

export function cumulativeBorrowingFactorKey(market: Hashable, isLong: boolean) {
  return poseidonHash([CUMULATIVE_BORROWING_FACTOR, market, isLong])
}

export function cumulativeBorrowingFactorUpdatedAtKey(market: Hashable, isLong: boolean) {
  return poseidonHash([CUMULATIVE_BORROWING_FACTOR_UPDATED_AT, market, isLong])
}

export function virtualTokenIdKey(token: Hashable) {
  return poseidonHash([VIRTUAL_TOKEN_ID, token])
}

export function virtualMarketIdKey(market: Hashable) {
  return poseidonHash([VIRTUAL_MARKET_ID, market])
}

export function virtualInventoryForSwapsKey(virtualMarketId: Hashable, token: Hashable) {
  return poseidonHash([VIRTUAL_INVENTORY_FOR_SWAPS, virtualMarketId, token])
}

export function virtualInventoryForPositionsKey(virtualTokenId: Hashable) {
  return poseidonHash([VIRTUAL_INVENTORY_FOR_POSITIONS, virtualTokenId])
}

// ---------------------------------------------------------------------------------------------------------------------\

// Exclusive to satoru

export const TOTAL_BORROWING = poseidonHash('TOTAL_BORROWING')
export const STABLE_FUNDING_FACTOR = poseidonHash('STABLE_FUNDING_FACTOR')

export function totalBorrowingKey(market: Hashable, isLong: boolean) {
  return poseidonHash([TOTAL_BORROWING, market, isLong])
}

export function stableFundingFactorKey(market: Hashable) {
  return poseidonHash([STABLE_FUNDING_FACTOR, market])
}

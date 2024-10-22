import {parseCairoCustomEnum} from './utils'

export enum OrderType {
  // the order will be cancelled if the minOutputAmount cannot be fulfilled
  MarketSwap = 'MarketSwap',
  // @dev LimitSwap: swap token A to token B if the minOutputAmount can be fulfilled
  LimitSwap = 'LimitSwap',
  // @dev MarketIncrease: increase position at the current market price
  // the order will be cancelled if the position cannot be increased at the acceptablePrice
  MarketIncrease = 'MarketIncrease',
  // @dev LimitIncrease: increase position if the triggerPrice is reached and the acceptablePrice can be fulfilled
  LimitIncrease = 'LimitIncrease',
  // @dev MarketDecrease: decrease position at the curent market price
  // the order will be cancelled if the position cannot be decreased at the acceptablePrice
  MarketDecrease = 'MarketDecrease',
  // @dev LimitDecrease: decrease position if the triggerPrice is reached and the acceptablePrice can be fulfilled
  LimitDecrease = 'LimitDecrease',
  // @dev StopLossDecrease: decrease position if the triggerPrice is reached and the acceptablePrice can be fulfilled
  StopLossDecrease = 'StopLossDecrease',
  // @dev Liquidation: allows liquidation of positions if the criteria for liquidation are met
  Liquidation = 'Liquidation',
}

export enum DecreasePositionSwapType {
  NoSwap = 'NoSwap',
  SwapPnlTokenToCollateralToken = 'SwapPnlTokenToCollateralToken',
  SwapCollateralTokenToPnlToken = 'SwapCollateralTokenToPnlToken',
}

export function parseOrderType(orderType: unknown) {
  return parseCairoCustomEnum(OrderType, orderType)
}

export function parseDecreasePositionSwapType(decreasePositionSwapType: unknown) {
  return parseCairoCustomEnum(DecreasePositionSwapType, decreasePositionSwapType)
}

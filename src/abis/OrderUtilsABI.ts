const OrderUtilsABI=[{"type":"impl","name":"OrderUtilsImpl","interface_name":"freyr::order::order_utils::IOrderUtils"},{"type":"struct","name":"freyr::data::data_store::IDataStoreDispatcher","members":[{"name":"contract_address","type":"core::starknet::contract_address::ContractAddress"}]},{"type":"struct","name":"freyr::event::event_emitter::IEventEmitterDispatcher","members":[{"name":"contract_address","type":"core::starknet::contract_address::ContractAddress"}]},{"type":"struct","name":"freyr::order::order_vault::IOrderVaultDispatcher","members":[{"name":"contract_address","type":"core::starknet::contract_address::ContractAddress"}]},{"type":"struct","name":"freyr::mock::referral_storage::IReferralStorageDispatcher","members":[{"name":"contract_address","type":"core::starknet::contract_address::ContractAddress"}]},{"type":"struct","name":"core::array::Span::<core::starknet::contract_address::ContractAddress>","members":[{"name":"snapshot","type":"@core::array::Array::<core::starknet::contract_address::ContractAddress>"}]},{"type":"struct","name":"freyr::utils::span32::Span32::<core::starknet::contract_address::ContractAddress>","members":[{"name":"snapshot","type":"core::array::Span::<core::starknet::contract_address::ContractAddress>"}]},{"type":"struct","name":"core::integer::u256","members":[{"name":"low","type":"core::integer::u128"},{"name":"high","type":"core::integer::u128"}]},{"type":"enum","name":"freyr::order::order::OrderType","variants":[{"name":"MarketSwap","type":"()"},{"name":"LimitSwap","type":"()"},{"name":"MarketIncrease","type":"()"},{"name":"LimitIncrease","type":"()"},{"name":"MarketDecrease","type":"()"},{"name":"LimitDecrease","type":"()"},{"name":"StopLossDecrease","type":"()"},{"name":"Liquidation","type":"()"}]},{"type":"enum","name":"freyr::order::order::DecreasePositionSwapType","variants":[{"name":"NoSwap","type":"()"},{"name":"SwapPnlTokenToCollateralToken","type":"()"},{"name":"SwapCollateralTokenToPnlToken","type":"()"}]},{"type":"enum","name":"core::bool","variants":[{"name":"False","type":"()"},{"name":"True","type":"()"}]},{"type":"struct","name":"freyr::order::base_order_utils::CreateOrderParams","members":[{"name":"receiver","type":"core::starknet::contract_address::ContractAddress"},{"name":"callback_contract","type":"core::starknet::contract_address::ContractAddress"},{"name":"ui_fee_receiver","type":"core::starknet::contract_address::ContractAddress"},{"name":"market","type":"core::starknet::contract_address::ContractAddress"},{"name":"initial_collateral_token","type":"core::starknet::contract_address::ContractAddress"},{"name":"swap_path","type":"freyr::utils::span32::Span32::<core::starknet::contract_address::ContractAddress>"},{"name":"size_delta_usd","type":"core::integer::u256"},{"name":"initial_collateral_delta_amount","type":"core::integer::u256"},{"name":"trigger_price","type":"core::integer::u256"},{"name":"acceptable_price","type":"core::integer::u256"},{"name":"execution_fee","type":"core::integer::u256"},{"name":"callback_gas_limit","type":"core::integer::u256"},{"name":"min_output_amount","type":"core::integer::u256"},{"name":"order_type","type":"freyr::order::order::OrderType"},{"name":"decrease_position_swap_type","type":"freyr::order::order::DecreasePositionSwapType"},{"name":"is_long","type":"core::bool"},{"name":"referral_code","type":"core::felt252"}]},{"type":"struct","name":"freyr::oracle::oracle::IOracleDispatcher","members":[{"name":"contract_address","type":"core::starknet::contract_address::ContractAddress"}]},{"type":"struct","name":"freyr::swap::swap_handler::ISwapHandlerDispatcher","members":[{"name":"contract_address","type":"core::starknet::contract_address::ContractAddress"}]},{"type":"struct","name":"freyr::order::base_order_utils::ExecuteOrderParamsContracts","members":[{"name":"data_store","type":"freyr::data::data_store::IDataStoreDispatcher"},{"name":"event_emitter","type":"freyr::event::event_emitter::IEventEmitterDispatcher"},{"name":"order_vault","type":"freyr::order::order_vault::IOrderVaultDispatcher"},{"name":"oracle","type":"freyr::oracle::oracle::IOracleDispatcher"},{"name":"swap_handler","type":"freyr::swap::swap_handler::ISwapHandlerDispatcher"},{"name":"referral_storage","type":"freyr::mock::referral_storage::IReferralStorageDispatcher"}]},{"type":"struct","name":"freyr::order::order::Order","members":[{"name":"key","type":"core::felt252"},{"name":"order_type","type":"freyr::order::order::OrderType"},{"name":"decrease_position_swap_type","type":"freyr::order::order::DecreasePositionSwapType"},{"name":"account","type":"core::starknet::contract_address::ContractAddress"},{"name":"receiver","type":"core::starknet::contract_address::ContractAddress"},{"name":"callback_contract","type":"core::starknet::contract_address::ContractAddress"},{"name":"ui_fee_receiver","type":"core::starknet::contract_address::ContractAddress"},{"name":"market","type":"core::starknet::contract_address::ContractAddress"},{"name":"initial_collateral_token","type":"core::starknet::contract_address::ContractAddress"},{"name":"swap_path","type":"freyr::utils::span32::Span32::<core::starknet::contract_address::ContractAddress>"},{"name":"size_delta_usd","type":"core::integer::u256"},{"name":"initial_collateral_delta_amount","type":"core::integer::u256"},{"name":"trigger_price","type":"core::integer::u256"},{"name":"acceptable_price","type":"core::integer::u256"},{"name":"execution_fee","type":"core::integer::u256"},{"name":"callback_gas_limit","type":"core::integer::u256"},{"name":"min_output_amount","type":"core::integer::u256"},{"name":"updated_at_block","type":"core::integer::u64"},{"name":"is_long","type":"core::bool"},{"name":"is_frozen","type":"core::bool"}]},{"type":"struct","name":"freyr::market::market::Market","members":[{"name":"market_token","type":"core::starknet::contract_address::ContractAddress"},{"name":"index_token","type":"core::starknet::contract_address::ContractAddress"},{"name":"long_token","type":"core::starknet::contract_address::ContractAddress"},{"name":"short_token","type":"core::starknet::contract_address::ContractAddress"}]},{"type":"enum","name":"freyr::order::order::SecondaryOrderType","variants":[{"name":"None","type":"()"},{"name":"Adl","type":"()"}]},{"type":"struct","name":"freyr::order::base_order_utils::ExecuteOrderParams","members":[{"name":"contracts","type":"freyr::order::base_order_utils::ExecuteOrderParamsContracts"},{"name":"key","type":"core::felt252"},{"name":"order","type":"freyr::order::order::Order"},{"name":"swap_path_markets","type":"core::array::Array::<freyr::market::market::Market>"},{"name":"min_oracle_block_numbers","type":"core::array::Array::<core::integer::u64>"},{"name":"max_oracle_block_numbers","type":"core::array::Array::<core::integer::u64>"},{"name":"market","type":"freyr::market::market::Market"},{"name":"keeper","type":"core::starknet::contract_address::ContractAddress"},{"name":"starting_gas","type":"core::integer::u256"},{"name":"secondary_order_type","type":"freyr::order::order::SecondaryOrderType"}]},{"type":"interface","name":"freyr::order::order_utils::IOrderUtils","items":[{"type":"function","name":"create_order_utils","inputs":[{"name":"data_store","type":"freyr::data::data_store::IDataStoreDispatcher"},{"name":"event_emitter","type":"freyr::event::event_emitter::IEventEmitterDispatcher"},{"name":"order_vault","type":"freyr::order::order_vault::IOrderVaultDispatcher"},{"name":"referral_storage","type":"freyr::mock::referral_storage::IReferralStorageDispatcher"},{"name":"account","type":"core::starknet::contract_address::ContractAddress"},{"name":"params","type":"freyr::order::base_order_utils::CreateOrderParams"}],"outputs":[{"type":"core::felt252"}],"state_mutability":"external"},{"type":"function","name":"execute_order_utils","inputs":[{"name":"params","type":"freyr::order::base_order_utils::ExecuteOrderParams"}],"outputs":[],"state_mutability":"external"},{"type":"function","name":"process_order","inputs":[{"name":"params","type":"freyr::order::base_order_utils::ExecuteOrderParams"}],"outputs":[],"state_mutability":"external"},{"type":"function","name":"cancel_order","inputs":[{"name":"data_store","type":"freyr::data::data_store::IDataStoreDispatcher"},{"name":"event_emitter","type":"freyr::event::event_emitter::IEventEmitterDispatcher"},{"name":"order_vault","type":"freyr::order::order_vault::IOrderVaultDispatcher"},{"name":"key","type":"core::felt252"},{"name":"keeper","type":"core::starknet::contract_address::ContractAddress"},{"name":"starting_gas","type":"core::integer::u256"},{"name":"reason","type":"core::felt252"},{"name":"reason_bytes","type":"core::array::Array::<core::felt252>"}],"outputs":[],"state_mutability":"external"},{"type":"function","name":"freeze_order","inputs":[{"name":"data_store","type":"freyr::data::data_store::IDataStoreDispatcher"},{"name":"event_emitter","type":"freyr::event::event_emitter::IEventEmitterDispatcher"},{"name":"order_vault","type":"freyr::order::order_vault::IOrderVaultDispatcher"},{"name":"key","type":"core::felt252"},{"name":"keeper","type":"core::starknet::contract_address::ContractAddress"},{"name":"starting_gas","type":"core::integer::u256"},{"name":"reason","type":"core::felt252"},{"name":"reason_bytes","type":"core::array::Array::<core::felt252>"}],"outputs":[],"state_mutability":"external"}]},{"type":"constructor","name":"constructor","inputs":[{"name":"increase_order_class_hash","type":"core::starknet::class_hash::ClassHash"},{"name":"decrease_order_class_hash","type":"core::starknet::class_hash::ClassHash"},{"name":"swap_order_class_hash","type":"core::starknet::class_hash::ClassHash"}]},{"type":"event","name":"freyr::order::order_utils::OrderUtils::Event","kind":"enum","variants":[]}] as const;export default OrderUtilsABI
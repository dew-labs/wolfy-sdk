const FeeHandlerABI=[{"type":"impl","name":"FeeHandlerImpl","interface_name":"satoru::fee::fee_handler::IFeeHandler"},{"type":"interface","name":"satoru::fee::fee_handler::IFeeHandler","items":[{"type":"function","name":"initialize","inputs":[{"name":"data_store_address","type":"core::starknet::contract_address::ContractAddress"},{"name":"role_store_address","type":"core::starknet::contract_address::ContractAddress"},{"name":"event_emitter_address","type":"core::starknet::contract_address::ContractAddress"}],"outputs":[],"state_mutability":"external"},{"type":"function","name":"claim_fees","inputs":[{"name":"market","type":"core::array::Array::<core::starknet::contract_address::ContractAddress>"},{"name":"tokens","type":"core::array::Array::<core::starknet::contract_address::ContractAddress>"}],"outputs":[],"state_mutability":"external"}]},{"type":"constructor","name":"constructor","inputs":[{"name":"data_store_address","type":"core::starknet::contract_address::ContractAddress"},{"name":"role_store_address","type":"core::starknet::contract_address::ContractAddress"},{"name":"event_emitter_address","type":"core::starknet::contract_address::ContractAddress"}]},{"type":"event","name":"satoru::fee::fee_handler::FeeHandler::Event","kind":"enum","variants":[]}] as const;export default FeeHandlerABI
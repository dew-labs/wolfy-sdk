const MulticallABI = [
  {
    type: 'impl',
    name: 'MulticallImpl',
    interface_name: 'starknet_multicall::multicall::IMulticall',
  },
  {
    type: 'struct',
    name: 'core::array::Span::<core::felt252>',
    members: [{name: 'snapshot', type: '@core::array::Array::<core::felt252>'}],
  },
  {
    type: 'struct',
    name: 'core::starknet::account::Call',
    members: [
      {name: 'to', type: 'core::starknet::contract_address::ContractAddress'},
      {name: 'selector', type: 'core::felt252'},
      {name: 'calldata', type: 'core::array::Span::<core::felt252>'},
    ],
  },
  {
    type: 'interface',
    name: 'starknet_multicall::multicall::IMulticall',
    items: [
      {
        type: 'function',
        name: 'aggregate',
        inputs: [{name: 'calls', type: 'core::array::Array::<core::starknet::account::Call>'}],
        outputs: [
          {type: '(core::integer::u64, core::array::Array::<core::array::Span::<core::felt252>>)'},
        ],
        state_mutability: 'view',
      },
    ],
  },
  {
    type: 'event',
    name: 'starknet_multicall::multicall::Multicall::Event',
    kind: 'enum',
    variants: [],
  },
] as const
export default MulticallABI

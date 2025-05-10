# wolfy-sdk

SDK to interact with the Wolfy protocol.

## Usage

```sh
pnpm add wolfy-sdk
pnpm add -D abi-wan-kanabi@2.2.2 # Using abi-wan-kanabi@2.2.2 because of a bug in 2.2.3 result in incorrect types
pnpm add -D starknet@^7.2.0 starknet_multicall
```

## Development

```sh
pnpm link --global
```

```sh
pnpm link --global wolfy-sdk
```

## Publish

```sh
pnpm publish
pnpm dlx jsr publish
```

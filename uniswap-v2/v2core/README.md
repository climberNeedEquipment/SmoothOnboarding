# v2 core

## To start

```
npm install
yarn compile
```

## Usage

### Deploy Command

```
yarn hardhat run scripts/deploy.js --network n3
```

### Mint Command

It mints deployed tokens[ERC20Test] to the deployer address in the amount of tokenAmount(decimals are dealt automatically).

```
yarn hardhat mint:token --addr ${tokenAddr} --amount ${tokenAmount} --network n3
```

```
yarn hardhat mint:USDC --amount ${tokenAmount} --network n3
yarn hardhat mint:DAI --amount ${tokenAmount} --network n3
yarn hardhat mint:WETH --amount ${tokenAmount} --network n3
```

### Get pair address Command

It also initialize the pair address.

```
yarn hardhat getpair --addr1 ${tokenAddr1} --addr2 ${tokenAddr2} --network n3
```

### Get INIT_CODE_HASH of the factory Command

```
yarn hardhat getInitCodeHash --factoryaddr ${factoryAddr} --network n3
```

You should modify v2periphery/contracts/libraries/UniswapV2Library.sol function pairFor() hex init code hash when you deploy another router based on the factory.

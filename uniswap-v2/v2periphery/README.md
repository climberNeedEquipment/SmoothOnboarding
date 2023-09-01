# v2-periphery

## To start

```
npm install
yarn compile
```

## Usage

### Deploy Command

It deploys router contract and approve several tokens to router.

```
yarn hardhat run scripts/deploy.js --network n3
```

### Add Liquidity Command

It adds the liquidity to UniswapV2 factory pool.

```
yarn hardhat addliquidity --routeraddr ${routerAddr} --token1 ${token1Addr} --amount1 ${token1Amount} --token2 ${token2Addr} --amount2 ${token2Amount} --network n3
```

- `npm install`
- 배포는 scripts/deploy.js 참고(periphery 컨트랙트 배포 전에 core 컨트랙트 배포 필요)
- RouterV2 컨트랙트 배포 시 배포했던 Factory 컨트랙트의 INIT_CODE_PAIR_HASH를 UniswapV2Library 파일의 pairFor 함수 내에서 사용(Hash 교체)
- .env 파일 생성해서 Mumbai RPC Url, PRIVATE KEY 채워넣기
- RouterV2.addLiquidity로 유동성 공급
- RouterV2.swapExactTokensForTokens로 token to token 스왑

## Usage

You can interacts with UniswapV2 forked DEX liquidity using the router contracts.

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

```
yarn hardhat getpair --addr1 ${tokenAddr1} --addr2 ${tokenAddr2} --network n3
```

### Get INIT_CODE_HASH of the factory Command

```
yarn hardhat getInitCodeHash --factoryaddr ${factoryAddr} --network n3
```

You should modify v2periphery/contracts/libraries/UniswapV2Library.sol function pairFor() hex init code hash when you deploy another router based on the factory.

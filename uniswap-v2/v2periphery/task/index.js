const IUniswapV2RouterPair = require('../build/IUniswapV2Router02.json')
const IERC20 = require('../build/IERC20.json')
const ethers = require('ethers')
const IUniswapV2Pair = require('../build/IUniswapV2Pair.json')
const FactoryContract = require('../../v2core/build/TestUniswapV2Factory.json')

const overrides = {
  gasLimit: 999999,
  maxPriorityFeePerGas: ethers.BigNumber.from(40000000000),
  maxFeePerGas: ethers.BigNumber.from(40000000000),
}

task('balance').setAction(async (taskArgs, hre) => {
  const address = '0xca823aB0f93Bb83431d5E83619A93f78C539f3EA'
  const balance = await hre.ethers.provider.getBalance(address)
  const balanceInEth = ethers.utils.formatEther(balance)
  console.log(balanceInEth)
})

task('addliquidity')
  .addParam('routeraddr')
  .addParam('token1')
  .addParam('amount1')
  .addParam('token2')
  .addParam('amount2')
  .setAction(async ({ token1, amount1, token2, amount2 }, hre) => {
    const [deployer, ...others] = await hre.ethers.getSigners()

    const Token1 = await hre.ethers.getContractAt(IERC20.abi, token1, deployer)
    const Token2 = await hre.ethers.getContractAt(IERC20.abi, token2, deployer)

    const routerAddress = routeraddr
    const router = await hre.ethers.getContractAt(IUniswapV2RouterPair.abi, routerAddress, deployer)

    const token1Allowance = await Token1.allowance(deployer.address, routerAddress)

    const amountBn1 = ethers.BigNumber.from(amount1).mul(ethers.BigNumber.from(10).pow(await Token1.decimals()))

    if (amountBn1.gt(token1Allowance)) {
      const tx1 = await Token1.approve(router.address, ethers.constants.MaxUint256)
      await tx1.wait()
      console.log('token1 approve done')
    }
    //token들 router에게 Approve
    const amountBn2 = ethers.BigNumber.from(amount2).mul(ethers.BigNumber.from(10).pow(await Token2.decimals()))

    const token2Allowance = await Token2.allowance(deployer.address, routerAddress)
    if (amountBn2.gt(token2Allowance)) {
      const tx2 = await Token2.approve(router.address, ethers.constants.MaxUint256)
      await tx2.wait()

      console.log('token2 approve done')
    }
    //router add liquidity
    const addtx = await router.addLiquidity(
      token1,
      token2,
      amountBn1,
      amountBn2,
      0,
      0,
      deployer.address,
      ethers.constants.MaxUint256,
      overrides
    )
    await addtx.wait()
    console.log('addLiquidity done')

    const factoryAddress = await router.factory()
    const factory = await hre.ethers.getContractAt(FactoryContract.abi, factoryAddress, deployer)
    const pairAddress = await factory.getPair(token1, token2)
    console.log('Pair address : ', pairAddress)
    const pair = await hre.ethers.getContractAt(IUniswapV2Pair.abi, pairAddress, deployer)
    const pairBalance = await pair.balanceOf(deployer.address)
    console.log('My pair balance : ', pairBalance)
  })

const hre = require('hardhat')
const IERC20 = require('../build/IERC20.json')
const IUniswapV2Pair = require('../build/IUniswapV2Pair.json')
const FactoryContract = require('../../v2core/build/TestUniswapV2Factory.json')
const ethers = hre.ethers

async function main() {
  const overrides = {
    gasLimit: 999999,
    maxPriorityFeePerGas: ethers.BigNumber.from(40000000000),
    maxFeePerGas: ethers.BigNumber.from(40000000000),
  }
  const factoryAddress = '0x1CB094da6F338bD5DbBbDd9d35A68E155d53A680'
  const daiAddress = '0xEfbA9791DfDf14844a3Cb2b31F28365F8123193a'
  const usdcAddress = '0x33dF7290ED46B714D45Fa21AF857799dA6eeb2b0'
  const pairAddress = '0xb66ABaDA3379409BcA2D0a858719Ba28f08c355B'
  const wethAddress = '0x3734D23F3E6725fdAc0673EfaCA4b95Fd1c9E932'

  const [deployer, ...others] = await ethers.getSigners()
  console.log('deployer address : ', deployer.address)

  const factory = await ethers.getContractAt(FactoryContract.abi, factoryAddress, deployer)
  console.log('PAIR INIT CODE:', await factory.INIT_CODE_PAIR_HASH())

  const DAI = await ethers.getContractAt(IERC20.abi, daiAddress, deployer)
  const USDC = await ethers.getContractAt(IERC20.abi, usdcAddress, deployer)
  const WETH = await ethers.getContractAt(IERC20.abi, wethAddress, deployer)

  const Router = await ethers.getContractFactory('UniswapV2Router02', deployer)
  // router2 Contract(factory address, WETH address are needed)
  const router = await Router.deploy(factoryAddress, WETH.address)
  console.log('Deploying Uniswap Router02 contract')
  await router.deployed()
  console.log(`Router deployed to : ${router.address}`)

  // Approve DAI, USDC to router
  const Daitx = await DAI.approve(router.address, ethers.constants.MaxUint256)
  await Daitx.wait()
  console.log('DAI Approve')
  const Usdctx = await USDC.approve(router.address, ethers.constants.MaxUint256)
  await Usdctx.wait()
  console.log('USDC Approve')

  const pair = await ethers.getContractAt(IUniswapV2Pair.abi, pairAddress, deployer)
  const pairapprovetx = await pair.approve(router.address, ethers.constants.MaxUint256)
  await pairapprovetx.wait()
  console.log('pair contract approve to Router2')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

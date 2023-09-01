const FactoryContract = require('../build/TestUniswapV2Factory.json')
const ERC20Contract = require('../build/ERC20Test.json')
const WETHContract = require('../build/WETH11.json')

const ZERO_ADDR = '0x0000000000000000000000000000000000000000'
const DAI_ADDR = '0xEfbA9791DfDf14844a3Cb2b31F28365F8123193a'
const USDC_ADDR = '0x33dF7290ED46B714D45Fa21AF857799dA6eeb2b0'
const WETH_ADDR = '0x3734D23F3E6725fdAc0673EfaCA4b95Fd1c9E932'

task('deploy:factory').setAction(async (taskArgs, hre) => {
  const [deployer, ...others] = await ethers.getSigners()
  const Factory = await ethers.getContractFactory('TestUniswapV2Factory')
  const factoryInstance = await Factory.deploy(deployer.address)

  console.log('Deploying Uniswap Factory contract')
  await factoryInstance.deployed()
  console.log(`Factory deployed to : ${factoryInstance.address}`)

  const tx1 = await factoryInstance.createPair(DAI_ADDR, USDC_ADDR)
  await tx1.wait()
  const pairAddress1 = await factoryInstance.getPair(DAI_ADDR, USDC_ADDR)
  console.log('Factory creates DAI-USDC pair : ', pairAddress1)
  const tx2 = await factoryInstance.createPair(DAI_ADDR, WETH_ADDR)
  await tx2.wait()
  const pairAddress2 = await factoryInstance.getPair(DAI_ADDR, WETH_ADDR)
  console.log('Factory creates DAI-WETH pair : ', pairAddress2)
  const tx3 = await factoryInstance.createPair(USDC_ADDR, WETH_ADDR)
  await tx3.wait()
  const pairAddress3 = await factoryInstance.getPair(USDC_ADDR, WETH_ADDR)
  console.log('Factory creates USDC-WETH pair : ', pairAddress3)
  console.log('PAIR INIT CODE:', await factoryInstance.INIT_CODE_PAIR_HASH())
})

task('balance').setAction(async (taskArgs, hre) => {
  const [deployer, ...others] = await hre.ethers.getSigners()
  const address = deployer.address
  const balance = await hre.ethers.provider.getBalance(address)
  const balanceInEth = ethers.utils.formatEther(balance)
  console.log(balanceInEth)
})

task('getpair')
  .addParam('addr1')
  .addParam('addr2')
  .setAction(async ({ addr1, addr2 }, hre) => {
    const [deployer, ...others] = await hre.ethers.getSigners()
    const factoryAddress = '0x383D35E81fb7eE06FEaa4deF44D63B8C257F6A54'
    let pairAddress
    const tokenA = addr1
    const tokenB = addr2
    console.log(`tokenA : ${addr1}| token B : ${addr2}`)
    const factory = await hre.ethers.getContractAt(FactoryContract.abi, factoryAddress, deployer)
    console.log('getpair start ')
    pairAddress = await factory.getPair(tokenA, tokenB)
    if (pairAddress === ZERO_ADDR) {
      const tx = await factory.createPair(tokenA, tokenB)
      await tx.wait()
      pairAddress = await factory.getPair(tokenA, tokenB)
      console.log('Factory creates pair : ', pairAddress)
    } else {
      console.log('Factory get pair : ', pairAddress)
    }
  })

task('getInitCodeHash')
  .addParam('factoryaddr')
  .setAction(async ({ factoryaddr }, hre) => {
    const [deployer, ...others] = await hre.ethers.getSigners()
    console.log(`factory : ${factoryaddr}`)
    const factory = await hre.ethers.getContractAt(FactoryContract.abi, factoryaddr, deployer)
    const initCodeHash = await factory.INIT_CODE_PAIR_HASH()
    console.log('Factory initCodeHash : ', initCodeHash)
  })

task('mint:token')
  .addParam('addr')
  .addParam('amount')
  .setAction(async ({ addr, amount }, hre) => {
    const [deployer, ...others] = await hre.ethers.getSigners()
    const ERC20 = await ethers.getContractAt(ERC20Contract.abi, addr, deployer)
    const tx = await ERC20.mint(deployer.address, ethers.BigNumber.from(amount).mul(10 ** (await ERC20.decimals())))
    await tx.wait()
    console.log('mint token : ', addr)
    console.log('to : ', deployer.address)
    console.log('amount : ', amount)
  })

task('mint:USDC')
  .addParam('amount')
  .setAction(async ({ amount }, hre) => {
    const [deployer, ...others] = await hre.ethers.getSigners()
    const ERC20 = await ethers.getContractAt(ERC20Contract.abi, USDC_ADDR, deployer)
    const tx = await ERC20.mint(deployer.address, ethers.BigNumber.from(amount).mul(10 ** 6))
    await tx.wait()
    console.log('mint token : ', USDC_ADDR)
    console.log('to : ', deployer.address)
    console.log('amount : ', amount)
  })

task('mint:DAI')
  .addParam('amount')
  .setAction(async ({ amount }, hre) => {
    const [deployer, ...others] = await hre.ethers.getSigners()
    const ERC20 = await ethers.getContractAt(ERC20Contract.abi, DAI_ADDR, deployer)
    const tx = await ERC20.mint(deployer.address, ethers.utils.parseEther(amount))
    await tx.wait()
    console.log('mint token : ', DAI_ADDR)
    console.log('to : ', deployer.address)
    console.log('amount : ', amount)
  })

task('mint:WETH')
  .addParam('amount')
  .setAction(async ({ amount }, hre) => {
    const [deployer, ...others] = await hre.ethers.getSigners()
    const WETH = await ethers.getContractAt(WETHContract.abi, WETH_ADDR, deployer)
    const tx = await WETH.deposit({ value: ethers.utils.parseEther(amount) })
    await tx.wait()
    console.log('mint token : ', WETH_ADDR)
    console.log('to : ', deployer.address)
    console.log('amount : ', amount)
  })

task('approve')
  .addParam('token')
  .addParam('spender')
  .setAction(async ({ token, spender }, hre) => {
    const [deployer, ...others] = await hre.ethers.getSigners()
    const ERC20 = await ethers.getContractAt(ERC20Contract.abi, token, deployer)
    const tx = await ERC20.approve('0x416DEb7401bCb5CE1da7B7654505B29925EF7f17', ethers.constants.MaxUint256)
    await tx.wait()
    console.log('token approve : ', token)
    console.log('amount : ', amount)
  })

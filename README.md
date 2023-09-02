# Defi playground

NEO testnet has just begun, anyone who wants to build in the testnet needs the basic tokens, DEXs and Lending protocols. As the DeFi protocols functions as the lego(money lego), it depends to many other protocols.

So our team made for DeFi onboarding in NEO Ecosystem.

Any tokens can be added to this git repository and anyone can use the token addresses and pools. (You can also mint the tokens!)

## Prerequisites

Before you begin, make sure you have the following:

- Node.js and npm installed on your machine.
- Git installed for version control.

## Setup

1. Clone this repository to your local machine:

   ```sh
   git clone https://github.com/climberNeedEquipment/SmoothOnboarding.git
   cd SmoothOnboarding
   ```

2. Install the required dependencies in each directory(v2core, v2periphery):
   `npm install`

3. Create a .env file in the project root and add your N3 testnet wallet's private key:
   `PRIVATE_KEY=your-private-key-goes-here`

## Usage

1. Compile the contracts:
   `npx hardhat compile`
2. Deploy the Uniswap V2 contracts to the N3 testnet:
   `npx hardhat run scripts/deploy.js --network n3`
3. Once the deployment is successful, you will receive contract addresses and other relevant information in the terminal.
4. You can now interact with the deployed Uniswap V2 contracts on the N3 testnet using their contract addresses.

## How it Works

The deployment script (scripts/deploy.js) performs the following steps:

Connects to the N3 testnet using the provided private key.
Deploys the necessary Uniswap V2 contracts, including the Factory and Router contracts.
Prints out the contract addresses and other relevant information for future reference.
You can customize the deployment script and contracts according to your requirements.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.

## TODO

- [ ] Automatically make json file for new DEX address additions
- [x] Token deploy, mint, and approve functions
- [x] Uniswap V2 integration (NEOSwap, ONESwap)
- [ ] Create2 deployment
- [x] Create3Factory deployment
- [ ] Permit2 deployment
- [ ] Uniswap V3 integration
- [ ] Balancer V2 integration

### Tips

- N3 testnet Faucet : https://n3t5wish.ngd.network

## v2 core

### Contract Addresses

NEOSwap

- Factory : 0x383D35E81fb7eE06FEaa4deF44D63B8C257F6A54
- USDC-DAI Pair : 0xdC82C14aE62f9a5978e0d95c299adA6b275db26b
- DAI-WETH pair : 0x746C40Ed64Ce46329499393D90CD24E44dEcC2Dd
- USDC-WETH pair : 0xAe524F4dE8285C623a092dfB880b8f8c4a8b7F93
- PAIR INIT CODE: 0xeb03790914a04d121b119bfef5702d9f7d4b9e1a0d7ac5648905fb77b28be159

ONESwap

- Factory : 0x1CB094da6F338bD5DbBbDd9d35A68E155d53A680
- USDC-DAI Pair : 0xb66ABaDA3379409BcA2D0a858719Ba28f08c355B
- DAI-WETH pair : 0x5A5633Ae7236c3B0e3A76B3D394592C6083b5Ba6
- USDC-WETH pair : 0xC3f8569308f25bfD55229Df28df82C3E9026ED9E
- PAIR INIT CODE: 0xeb03790914a04d121b119bfef5702d9f7d4b9e1a0d7ac5648905fb77b28be159

## v2 periphery

### Contract Addresses

NEOSwap

- Router : 0x416DEb7401bCb5CE1da7B7654505B29925EF7f17

ONESwap

- Router : 0x2DE04099DFe8e05862DA528525B20a7EaC69b05D

### Global Addresses

- DAI : 0xEfbA9791DfDf14844a3Cb2b31F28365F8123193a
- USDC : 0x33dF7290ED46B714D45Fa21AF857799dA6eeb2b0
- WETH(WGAS) : 0x3734D23F3E6725fdAc0673EfaCA4b95Fd1c9E932
- CREATE3Factory : 0x46dBCd60A046EbC547Ab7440e64a35230943283C

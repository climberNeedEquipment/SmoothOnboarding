# Deploying Uniswap V2 to N3 Testnet using Hardhat

This guide will walk you through the process of deploying Uniswap V2 to the N3 testnet, which is part of the NEO ecosystem. We will use the Hardhat framework for deployments. Uniswap V2 is a popular decentralized exchange protocol that allows users to swap ERC-20 tokens directly on the blockchain.

###

## Prerequisites

Before you begin, make sure you have the following:

- Node.js and npm installed on your machine.
- Git installed for version control.

## Setup

1. Clone this repository to your local machine:

   ```sh
   git clone https://github.com/your-username/uniswap-n3-deployment.git
   cd uniswap-n3-deployment
   ```

2. Install the required dependencies in each directory(v2core, v2periphery):
   `npm install`

3. Create a .env file in the project root and add your N3 testnet wallet's private key:
   `PRIVATE_KEY=your-private-key-goes-here`

## Usage

1. Compile the contracts:
   `npx hardhat compile`
2. Deploy the Uniswap V2 contracts to the N3 testnet:
   `npx hardhat run scripts/deploy.js --network testnet`
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

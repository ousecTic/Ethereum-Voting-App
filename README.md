# Ethereum Voting Application

This is a voting app using React.js, Ether.js, and hardhat!

## Setup

Install Dependencies in the top-level directory with `npm install`. 

Compile the contracts using `npx hardhat compile`. Path configuration can be found in the `hardhat.config.js` file. 

## Voting on a local Blockchain

Spin up a localhost blockchain with `npx hardhat node`. After that, run `npx hardhat run scripts/deploy.js --network localhost` to deploy the voting dapp on this local blockchain.This will create the smart contract address which you can add to the `delegateVotingAddress` variable located in `src/components/VotingTable.js`

![image](https://user-images.githubusercontent.com/36502535/132779594-d0053a9e-3899-4c5f-b0e1-dfe9e6a641be.png)


## Front-end

To run the front-end application run `npm start` from the top-level directory. 



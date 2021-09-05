// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  //   const Greeter = await hre.ethers.getContractFactory("Greeter");
  //   const greeter = await Greeter.deploy("Hello, Hardhat!");

  //   await greeter.deployed();

  //   console.log("Greeter deployed to:", greeter.address);
  // }

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  //voting delegate

  const DelegateVoting = await hre.ethers.getContractFactory("DelegateVoting");
  const delegateVoting = await DelegateVoting.deploy();

  await delegateVoting.deployed();
  await voting.deployed();

  console.log(delegateVoting.address);
  console.log(voting.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

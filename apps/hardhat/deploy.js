const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Tasks = await ethers.getContractFactory("Tasks");
  const tasks = await Tasks.deploy();
  console.log("Tasks contract deployed to:", tasks.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

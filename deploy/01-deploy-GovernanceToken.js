const { ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { log, deploy } = deployments;

  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  });
  const delegate = async (governanceTokenAddress, delegatedAccount) => {
    const governanceToken = await ethers.getContractAt(
      "GovernanceToken",
      governanceTokenAddress
    );
    const transactionResponse = await governanceToken.delegate(
      delegatedAccount
    );
    await transactionResponse.wait(1);
    console.log(
      `checkpoints:${await governanceToken.numCheckpoints(delegatedAccount)}`
    );
  };
  await delegate(governanceToken.address, deployer);

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    console.log("verifying...");
    await verify(governanceToken.address, []);
  }
};
module.exports.tags = ["all", "governanceToken"];

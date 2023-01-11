const { verify } = require("../utils/verify");
const { developmentChains, MIN_DELAY } = require("../helper-hardhat-config");
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { log, deploy } = deployments;
  const args = [MIN_DELAY, [], [], deployer];

  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: args,
    log: true,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    console.log("verifying...");
    await verify(timeLock.address, args);
  }
};

module.exports.tags = ["all", "timeLock"];

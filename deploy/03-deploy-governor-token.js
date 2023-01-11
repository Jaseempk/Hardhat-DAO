const { ethers } = require("hardhat");
const {
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM_PERCENT,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { log, deploy } = deployments;
  const governanceToken = await ethers.getContract("GovernanceToken");
  const timeLock = await ethers.getContract("TimeLock");

  const governorToken = await deploy("GovernorContract", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM_PERCENT,
    ],
    log: true,
    waitConfirmations: 1,
  });
};
module.exports.tags = ["all", "governorToken"];

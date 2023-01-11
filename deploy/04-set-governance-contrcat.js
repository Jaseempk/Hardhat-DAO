const { ethers } = require("hardhat");
const { ADDRESS_ZERO } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { log, deploy } = deployments;

  const timeLock = await ethers.getContract("TimeLock", deployer);
  const governorContract = await ethers.getContract(
    "GovernorContract",
    deployer
  );

  console.log("setting up roles...");
  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const timeLockAdmin = await timeLock.TIMELOCK_ADMIN_ROLE();

  console.log("switching roles...");

  const proposerTx = await timeLock.grantRole(
    proposerRole,
    governorContract.address
  );
  await proposerTx.wait(1);
  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
  await executorTx.wait(1);

  const revokeAdminTx = await timeLock.revokeRole(timeLockAdmin, deployer);
  await revokeAdminTx.wait(1);
};

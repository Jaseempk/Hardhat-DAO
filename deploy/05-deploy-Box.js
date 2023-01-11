const { network, ethers } = require("hardhat");
const { verify } = require("../utils/verify");
const { developmentChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { log, deploy } = deployments;

  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  });
  const timeLock = await ethers.getContract("TimeLock");
  const boxContract = await ethers.getContractAt("Box", box.address);
  const ownerTransferTx = await boxContract.transferOwnership(timeLock.address);
  await ownerTransferTx.wait(1);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    console.log("verifying...");
    await verify(box.address, []);
  }
};
module.exports.tags = ["all", "box"];

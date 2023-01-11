const { network } = require("hardhat");

const moveBlocks = async function (amount) {
  console.log("moving blocks...");
  for (let index = 0; index < amount; amount++) {
    await network.provider.request("evm_mine", []);
  }
};
module.exports = {moveBlocks};

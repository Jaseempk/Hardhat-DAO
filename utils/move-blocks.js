const { network } = require("hardhat");

const moveBlocks = async function (amount) {
  console.log("moving blocks...");
  for (let index = 0; index < amount; index++) {
    await network.provider.request({method:"evm_mine",params:[]});
  }
};
module.exports = {moveBlocks};

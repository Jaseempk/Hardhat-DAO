const { ethers } = require("hardhat");

const networkConfig = {
  default: {
    name: "hardhat",
  },
  5: {
    name: "goerli",
    vrfCoordinator: "0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d",
    subscriptionId: "7672",
    gasLane:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    callbackGasLimit: "2500000",
    interval: "30",
    mintFee: ethers.utils.parseUnits("0.01", "ether"),
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
  31337: {
    name: "localhost",
    subscriptionId: "588",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
    interval: "30",
    mintFee: ethers.utils.parseUnits("0.01", "ether"), // 0.01 ETH
    callbackGasLimit: "2500000", // 500,000 gas
  },
};

const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const MIN_DELAY = 3600;
const VOTING_DELAY = 1;
const VOTING_PERIOD = 5;
const QUORUM_PERCENT = 4;
const INITIAL_PRICE = "200000000000000000000";
const NEW_STORE_VALUE = 77;
const FUNC = "store";
const PROPOSAL_DESCRIPTION = "#Proposal:1-store 77 in the Box";
const proposalsFile = "proposals.json";

const developmentChains = ["hardhat", "localhost"];
module.exports = {
  networkConfig,
  developmentChains,
  MIN_DELAY,
  INITIAL_PRICE,
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM_PERCENT,
  ADDRESS_ZERO,
  FUNC,
  NEW_STORE_VALUE,
  PROPOSAL_DESCRIPTION,
  proposalsFile,
};

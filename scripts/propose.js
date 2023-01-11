const { ethers, network } = require("hardhat");
const {
  developmentChains,
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  proposalsFile,
  VOTING_DELAY,
} = require("../helper-hardhat-config");
const { moveBlocks } = require("../utils/move-blocks");
const fs = require("fs");

async function propose(args, functionToCall, proposalDescription) {
  const box = await ethers.getContract("Box");
  const governorContract = await ethers.getContract("GovernorContract");

  const encodedFunction = box.interface.encodeFunctionData(
    functionToCall,
    args
  );

  console.log(`proposing ${functionToCall} on ${box.address} with ${args}`);
  console.log(`proposalDescription:${proposalDescription}`);
  const proposeTx = await governorContract.propose(
    [box.address],
    [0],
    [encodedFunction],
    proposalDescription
  );
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1);
  }
  const proposeTxReceipt = await proposeTx.wait(1);
  const proposalId = await proposeTxReceipt.events[0].args.proposalId;
  const proposalState = await governorContract.state(proposalId);
  const proposalSnapShot = await governorContract.proposalSnapshot(proposalId);

  let proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
  proposals[network.config.chainId.toString()].push(proposalId.toString());
  fs.writeFileSync(proposalsFile, JSON.stringify(proposals));

  console.log(`current proposal snapshot is ${proposalSnapShot}`);
  console.log(`current proposal snap state is ${proposalState} `);
}
propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

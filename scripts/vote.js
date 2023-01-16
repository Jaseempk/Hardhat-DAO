const { ethers, network } = require("hardhat");
const fs=require("fs")
const{proposalsFile, developmentChains, VOTING_PERIOD}=require("../helper-hardhat-config")
const index=0

async function main(proposalIndex){
const proposals=JSON.parse(fs.readFileSync(proposalsFile,"utf8"))
const proposalId=proposals[network.config.chainId][proposalIndex]
const voteWay=1  //0:against,1:in favor,2:abstain
const reason="thats none of your business"
await vote(proposalId,voteWay,reason)
}

async function vote(proposalId,voteWay,reason){
    console.log("voting.....")
    const governorContract=await ethers.getContract("GovernorContract")
    const voteTx=await governorContract.castVoteWithReason(proposalId,voteWay,reason)
    await voteTx.wait(1)

    if(developmentChains.includes(network.name)){
        await moveBlocks(VOTING_PERIOD + 1)
    }

}
main(index)
.then(()=>{
    process.exit(0)
})
.catch((error)=>{
    console.log(error)
    process.exit(1)
})

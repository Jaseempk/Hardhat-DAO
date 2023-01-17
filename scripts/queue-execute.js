
const { ethers,network } = require("hardhat")
const{developmentChains,FUNC,NEW_STORE_VALUE,MIN_DELAY,PROPOSAL_DESCRIPTION}=require("../helper-hardhat-config")
const {moveTime}=require("../utils/move-time")
const {moveBlocks}=require("../utils/move-blocks")

async function queueAndExecute(){
    const governorContract=await ethers.getContract("GovernorContract")
    const box=await ethers.getContract("Box")
    const encodedData=box.interface.encodeFunctionData(FUNC,[NEW_STORE_VALUE])
    const descriptionHash= ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION))

    console.log("queueing....")

    const queueTx=await governorContract.queue([box.address],[0],[encodedData],descriptionHash)
    await queueTx.wait(1)
    console.log("queued....")

    if(developmentChains.includes(network.name)){
        await moveTime(MIN_DELAY + 1)
        await moveBlocks(1)
    }
    console.log("executing....")

    const executeTx=await governorContract.execute([box.address],[0],[encodedData],descriptionHash)
    await executeTx.wait(1)

    console.log("executed...")
    const newBoxValue=await box.retrieve()
    console.log(newBoxValue.toString())


}
queueAndExecute()
.then(()=>{process.exit(0)})
.catch((error)=>{
    console.log(error)
    process.exit(1)
})
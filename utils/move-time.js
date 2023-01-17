const { network } = require("hardhat")

const moveTime = async (amount) => {
    console.log("moving time...")
    await network.provider.request({ method: "evm_increaseTime", params: [amount] })
    console.log("time passed")
}
module.exports = {moveTime};
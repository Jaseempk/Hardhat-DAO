//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    /**
     * minDelay:minimum delay time given before execution
     * proposers:addresses that can bring up a proposal(all the addresses)
     * executors:addresses that can execute when a proposal is passed(all adddresses)
     */

    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}

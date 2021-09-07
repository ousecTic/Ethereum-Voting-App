// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract DelegateVoting {
    uint256 private joe_biden = 0;
    uint256 private donald_trump = 0;
    mapping(address => bool) members;

    event VoteCast(uint256, uint256);

    constructor() {
        console.log("Welcome to Delegate Voting");
    }

    function compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function castVote(string memory _delegate) external {
        require(members[msg.sender] != true, "You already voted");

        if (compareStrings(_delegate, "joe-biden")) {
            joe_biden++;
        } else {
            donald_trump++;
        }

        members[msg.sender] = true;

        emit VoteCast(joe_biden, donald_trump);
    }

    function showScore() public view returns (uint256, uint256) {
        return (joe_biden, donald_trump);
    }
}

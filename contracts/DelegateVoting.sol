// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract DelegateVoting {
    uint8 private joe_biden = 0;
    uint8 private donald_trump = 0;
    mapping(address => bool) members;

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

    function castVote(string memory _color) external {
        require(members[msg.sender] != true, "You already voted");

        if (compareStrings(_color, "joe-biden")) {
            joe_biden++;
        } else {
            donald_trump++;
        }

        members[msg.sender] = true;
    }

    function showScore() public view returns (uint8, uint8) {
        return (joe_biden, donald_trump);
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "hardhat/console.sol";

contract Voting {
    uint8 private Red = 0;
    uint8 private Blue = 0;
    mapping(address => bool) members;

    constructor() {
        console.log("Welcome to Blockchain Voting");
    }

    function compareStrings(string memory a, string memory b)
        public
        view
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function castVote(string memory _color) external {
        require(members[msg.sender] != true, "You already voted");

        if (compareStrings(_color, "red")) {
            Red++;
        } else {
            Blue++;
        }

        members[msg.sender] = true;
    }

    function showScore() public view returns (uint8, uint8) {
        return (Red, Blue);
    }
}

pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Election.sol";


contract TestElection
{
    Election election = Election(DeployedAddresses.Election());
    address expectedCandidate = address(this);

    ElectionStructs.Candidate candy;

    function beforeAll() public
    {
        address[] memory voters;
        candy = ElectionStructs.Candidate(address(this), "TST", "Descr..ion", 0, voters);
    }

    function testRegisterCandidate() public
    {
        bool result = election.register(candy.name, candy.description);

        Assert.equal(result, true, "Registration result should be true.");
    }

//    function testRegisterCandidateAgain() public
//    {
//        bool result = election.register(candy.name, candy.description);
//
//        Assert.equal(result, false, "Registration result again should be false.");
//    }

    function testCheckRegisteredCandidate() public
    {
        address[] memory candidatesList = election.getCandidates();
        Assert.equal(candidatesList.length, 1, "Candidates list should contain exactly 1 element.");
        Assert.equal(candidatesList[0], candy.id, "Candidates list should contain exactly 1 element.");
    }

    function testVote() public
    {
        (bool result, ) = election.vote(candy.id);

        Assert.equal(result, true, "Vote result should be true.");
    }


    function testVoteAgain() public
    {
        (bool result, ) = election.vote(candy.id);

        Assert.equal(result, false, "Vote result again should be false.");
    }

    function testCheckCandidateInfo() public
    {
        (string memory name, string memory description, uint256 votes) = election.getCandidateInfo(expectedCandidate);

        Assert.equal(name, candy.name, "Name should be equal");
        Assert.equal(description, candy.description, "Description should be equal");
        Assert.equal(votes, 1, "Votes should be equal");
    }
}
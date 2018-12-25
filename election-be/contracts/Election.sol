pragma solidity ^0.5.0;

library ElectionStructs
{
    struct OperationResult
    {
        bool result;
        string message;
    }

    struct Candidate {
        address id;
        string name;
        string description;
        uint256 votes;
        address[] voters;
    }
}

contract Election
{
    mapping (address => address) voters;
    mapping (address => ElectionStructs.Candidate) candidates;
    address[] public candidatesList;

    event CandidateRegistered (
        address indexed _id
    );

    event VoteGiven(
        address indexed _to,
        address indexed _by
    );

    function getCandidates() public view returns (address[] memory)
    {
        return candidatesList;
    }

    function getCandidateInfo(address id) public view returns (string memory, string memory, uint256)
    {
        ElectionStructs.Candidate memory candy = candidates[id];

        return (candy.name, candy.description, candy.votes);
    }

    function register(string memory name, string memory description) public returns (bool)
    {
        require(candidates[msg.sender].id != msg.sender, "You already registered.");

        bytes memory nameBytes = bytes(name);
        require(nameBytes.length > 0, "Name cannot be empty.");

        address[] memory tmpVoters;

        candidates[msg.sender] = ElectionStructs.Candidate(msg.sender, name, description, 0, tmpVoters);
        candidatesList.push(msg.sender);

        emit CandidateRegistered(msg.sender);

        return true;
    }

    function vote(address id) public returns (bool, string memory)
    {
        ElectionStructs.OperationResult memory result = ElectionStructs.OperationResult(false, "No data");

        if(candidates[id].id == id)
        {
            if(voters[msg.sender] != msg.sender)
            {
                candidates[id].votes += 1;
                voters[msg.sender] = msg.sender;

                result.result = true;
                result.message = "OK";

                emit VoteGiven(id, msg.sender);
            }
            else
            {
                result.message = "You already voted.";
            }
        }
        else
        {
            result.message = "Candidate not found.";
        }

        return (result.result, result.message);
    }
}
pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption
{
    Adoption adoption = Adoption(DeployedAddresses.Adoption());

    uint expectedId = 8;

    address expectedAdopter = address(this);

    function testUserCanAdoptPet() public
    {
        uint returnedId = adoption.adopt(expectedId);

        Assert.equal(returnedId, expectedId, "Adoption of the expected pet should match what is returned");
    }


    function testGetAdopterAddressByPetIdInArray() public
    {
        address[16] memory adopters = adoption.getAdopters();

        Assert.equal(adopters[expectedId], expectedAdopter, "Owner of the expected pet should be this contract.");
    }
}

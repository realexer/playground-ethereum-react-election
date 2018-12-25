import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

const election = {
    abi: [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidatesList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xdf2d5ec7"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_id","type":"address"}],"name":"CandidateRegistered","type":"event","signature":"0xa0ac4f59dabb0ddc4b8b883adda9e055e02c796b2cde2ed80fdb11a38f77e5c9"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_to","type":"address"},{"indexed":true,"name":"_by","type":"address"}],"name":"VoteGiven","type":"event","signature":"0x72c969a3287ea36868c4ccff5103a43b84c88936c5340ad55fee54091e9a579b"},{"constant":true,"inputs":[],"name":"getCandidates","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x06a49fce"},{"constant":true,"inputs":[{"name":"id","type":"address"}],"name":"getCandidateInfo","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x28bde1e1"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"description","type":"string"}],"name":"register","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x3ffbd47f"},{"constant":false,"inputs":[{"name":"id","type":"address"}],"name":"vote","outputs":[{"name":"","type":"bool"},{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x6dd7d8ea"}],
    address: "0xF2dcefAdD8163b14Dc805869aa51032B1fB0fefd",
};

web3.eth.defaultAccount = web3.currentProvider.selectedAddress;

const electionContract = new web3.eth.Contract(election.abi, election.address);

export {electionContract, web3};

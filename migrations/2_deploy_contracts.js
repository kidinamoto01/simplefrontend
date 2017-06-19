var myVote = artifacts.require("./MyVote.sol");

module.exports = function(deployer) {
    deployer.deploy(myVote);
};
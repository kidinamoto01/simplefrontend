/**
 * Created by suyu on 17/6/19.
 */
var vote = artifacts.require("./MyVote.sol");

contract("MyVote", function(accounts) {
    it('should be possible to get Initial sum', function() {
        var voteInstance;
        return vote.deployed().then(function(instance) {
            voteInstance = instance;
            return voteInstance.getSum.call();
        }).then(function(sum) {
            var tmpSum= sum;
            assert.equal(tmpSum,1, "Initial sum should be 1");
            //console.log(result);
        });
    });

    it('should be possible to get Initial Count', function() {
        var voteInstance;
        return vote.deployed().then(function(instance) {
            voteInstance = instance;
            return voteInstance.getCount.call();
        }).then(function(count) {
            var tmpCount= count;
            assert.equal(tmpCount,0, "Initial Count should be 0");
            //console.log(result);
        });
    });

    it('should be possible to give right to Vote', function() {
        var voteInstance;
        return vote.deployed().then(function(instance) {
            voteInstance = instance;
            return voteInstance.giveRightToVote(accounts[1], "Because I'm the owner", {from: accounts[0]});
        }).then(function(result) {
            //tmpCount= count;
            //assert.equal(tmpCount,0, "Initial Count should be 0");
            //console.log(result);
            return  voteInstance.getSum.call();
        }).then(function(sum) {
            var tmpSum= sum;
            assert.equal(tmpSum,2, "Initial sum should be 2");
            //console.log(result);
        });
    });

    it('should be possible to to Vote', function() {
        var voteInstance;
        return vote.deployed().then(function(instance) {
            voteInstance = instance;
            return voteInstance.giveRightToVote(accounts[1], "Because I'm the owner", {from: accounts[0]});
        }).then(function(result) {
            //tmpCount= count;
            //assert.equal(tmpCount,0, "Initial Count should be 0");
            //console.log(result);
            return  voteInstance.getSum.call();
        }).then(function(sum) {
            var tmpSum= sum;
            assert.equal(tmpSum,2, "Initial sum should be 2");
            //console.log(result);
        }).then(function() {
            voteInstance.vote( "Because I have the right to vote", {from: accounts[1]});
            return voteInstance.getCount.call();
        }).then(function(count) {
            var tmpCount= count;
            assert.equal(tmpCount,1, "Initial count should be 1");
        });
    });

    it('should be possible to prevent reVote', function() {
        var voteInstance;
        return vote.deployed().then(function(instance) {
            voteInstance = instance;
            return voteInstance.giveRightToVote(accounts[1], "Because I'm the owner", {from: accounts[0]});
        }).then(function(result) {
            //tmpCount= count;
            //assert.equal(tmpCount,0, "Initial Count should be 0");
            //console.log(result);
            return  voteInstance.getSum.call();
        }).then(function(sum) {
            var tmpSum= sum;
            assert.equal(tmpSum,2, "after giving right to vote, sum should be 2");

            voteInstance.vote( "Because I have the right to vote", {from: accounts[1]});

            return  voteInstance.getCount.call();
        }).then(function(count) {
            var tmpCount= count;
            assert.equal(tmpCount,1, " Count should be 1");
            voteInstance.vote( "Because I have the right to vote", {from: accounts[1]});
            return  voteInstance.getCount.call();
        }).then(function(count) {
            var tmpSum= count;
            assert.equal(tmpSum,1, "after re-vote, sum should be 1");
        });
    });

    it('should be possible to prevent give right to Votev twice', function() {
        var voteInstance;
        return vote.deployed().then(function(instance) {
            voteInstance = instance;
            return voteInstance.giveRightToVote(accounts[1], "Because I'm the owner", {from: accounts[0]});
        }).then(function() {
            //tmpCount= count;
            //assert.equal(tmpCount,0, "Initial Count should be 0");
            // console.log(result);
            return  voteInstance.getSum.call();
        }).then(function(sum) {
            var tmpSum= sum;
            assert.equal(tmpSum,2, "after giving right to vote, sum should be 2");
            //console.log(result);
        }).then(function() {

            return voteInstance.giveRightToVote(accounts[1], "give the right again", {from: accounts[0]});

        }).then(function(result) {
            //tmpCount= count;
            //assert.equal(tmpCount,0, "Initial Count should be 0");
            //console.log(result);
            return  voteInstance.getSum.call();
        }).then(function(sum) {
            var tmpSum= sum;
            assert.equal(tmpSum,2, "after giving right to vote, sum should be 2");
        });
    });


    it('should be possible to get the right result', function() {
        var voteInstance;
        return vote.deployed().then(function(instance) {
            voteInstance = instance;
            voteInstance.giveRightToVote(accounts[2], "Because I'm the owner", {from: accounts[0]});
            voteInstance.giveRightToVote(accounts[3], "Because I'm the owner", {from: accounts[0]});
            return voteInstance.giveRightToVote(accounts[1], "Because I'm the owner", {from: accounts[0]});
        }).then(function(result) {
            //tmpCount= count;
            //assert.equal(tmpCount,0, "Initial Count should be 0");
            //console.log(result);
            return  voteInstance.getSum.call();
        }).then(function(sum) {
            var tmpSum= sum;
            assert.equal(tmpSum,4, "after giving right to vote, sum should be 4");
            //console.log(result);
        }).then(function() {
            voteInstance.vote( "Because I have the right to vote", {from: accounts[1]});
            voteInstance.vote( "Because I have the right to vote", {from: accounts[2]});
            voteInstance.vote( "Because I have the right to vote", {from: accounts[3]});
            return  voteInstance.getCount.call();
        }).then(function(count) {
            var tmpSum= count;
            assert.equal(tmpSum,3, "after  vote, count should be 3");
            return voteInstance.isApproved.call();
        }).then(function(result) {
            assert.equal(result,true, "after  vote, the bill should be passed");

        });
    });


    // it('should be possible to get Initial sum', function() {
    //     var voteInstance;
    //     return vote.deployed().then(function(instance) {
    //         voteInstance = instance;
    //         return voteInstance.getSum.call();
    //     }).then(function(sum) {
    //         tmpSum= sum;
    //         assert.equal(tmpSum,1, "Initial sum should be 1");
    //         //console.log(result);
    //     });
    // });

});/**
 * Created by b on 17/6/19.
 */

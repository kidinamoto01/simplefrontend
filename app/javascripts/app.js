// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

import "bootstrap/dist/css/bootstrap.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import myVote_artifact from '../../build/contracts/MyVote.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MyVote = contract(myVote_artifact);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
    start: function() {
        var self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        MyVote.setProvider(web3.currentProvider);

        // Get the initial account balance so it can be displayed.
        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            accounts = accs;
            account = accounts[0];

            document.getElementById("addresses").innerHTML = accounts.join("<br />");

            App.basicInfoUpdate();
        });
    },

//更新Sum,Count值
    basicInfoUpdate: function() {
        MyVote.deployed().then(function(instance) {
            document.getElementById("contractAddress").innerHTML = instance.address;
            //document.getElementById("contractSum").innerHTML = instance.getSum();
            instance.getSum({from: accounts[0]}).then(function(val){
                document.getElementById("contractSum").innerHTML = val;
                instance.getCount.call().then(function(count){
                    document.getElementById("contractCount").innerHTML = count;
                })
            })
        })
    },

    // submitEtherToWallet: function() {
    //     MyWallet.deployed().then(function(instance) {
    //
    //         return instance.sendTransaction({from: account, to: instance.address, value: web3.toWei(5, "ether")});
    //
    //     }).then(function(result) {
    //         App.basicInfoUpdate();
    //     });
    // },
    //
    giveRightToVote: function() {
        var _to = document.getElementById("to").value;
        MyVote.deployed().then(function(instance) {
            console.log("output");
            return instance.giveRightToVote(_to,{from:accounts[0]});
        }).then(function(result) {
            console.log(result);
            App.basicInfoUpdate();
        }).catch(function(err) {
            console.error(err);
        });
    },
    getChairperson: function() {
        MyVote.deployed().then(function(instance) {
            console.log("output");
            return instance.getChairman.call();
        }).then(function(result) {
            document.getElementById("chair").innerHTML = result;
            console.log(result);
            App.basicInfoUpdate();
        }).catch(function(err) {
            console.error(err);
        });
    },
    voteOnDocument:function(){
        var _from = document.getElementById("from").value;
        MyVote.deployed().then(function(instance) {
            console.log("output");
            return instance.vote({from:_from});
        }).then(function(result) {
            console.log(result);
            App.basicInfoUpdate();
        }).catch(function(err) {
            console.error(err);
        });
    },
    getResult:function(){
        MyVote.deployed().then(function(instance) {
            console.log("output");
            return instance.isApproved.call();
        }).then(function(result) {
            console.log(result);
            document.getElementById("result").innerHTML = result;
            App.basicInfoUpdate();
        }).catch(function(err) {
            console.error(err);
        });
    }
    //
    // sendCoin: function() {
    //     var self = this;
    // }
};

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    App.start();
});
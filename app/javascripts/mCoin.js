var Web3 = require('web3');
var contract = require('truffle-contract');
var web3 = new Web3();

// Import our contract artifacts and turn them into usable abstractions.
var metacoin_artifacts = require('../../build/contracts/MetaCoin.json');

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
var accounts;
var account;
var initialised = false;
var init = new Promise(function(resolve, reject) {
  if(initialised) {
    resolve(true);
  }
  web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
  // Bootstrap the MetaCoin abstraction for Use.
  MetaCoin.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

  // Get the list of our accounts.
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      reject(err);
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      reject(err);
    }
    accounts = accs;
    initialised = true;
    resolve(true);
  });
});

exports.getAccounts = function() {
  return new Promise(function(resolve, reject) {
    init.then(function() {
      resolve(accounts);
    }).catch(function(err) {
      reject(err);
    });
  });
}


exports.getBalance = function(account) {
  return new Promise(function(resolve, reject) {
    var meta;
    init.then(function() {
      MetaCoin.deployed().then(function(instance) {
        meta = instance;
        return meta.getBalance.call(account, {from: account});
      }).then(function(value) {
        resolve(value);
      }).catch(function(e) {
        reject(e)
      });
    });
  });
}

exports.sendCoin = function(amount, sender, receiver) {
  return new Promise(function(resolve, reject) {
    var meta;
    init.then(function() {
      MetaCoin.deployed().then(function(instance) {
        meta = instance;
        return meta.sendCoin(receiver, amount, {from: sender});
      }).then(function(success) {
        if(success) {
          resolve();
        } else {
          reject(new Error('Failed to transfer: Insufficient funds'));
        }
      }).catch(function(e) {
        reject(e);
      });
    });
  });
}


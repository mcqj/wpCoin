var Web3 = require('web3');
var web3 = new(Web3);
var contract = require('truffle-contract');
var config = require('./config');
var account = config.account_two;

var metacoin_artifacts = require('./build/contracts/MetaCoin.json');


var MetaCoin = contract(metacoin_artifacts);

var meta;

// Bootstrap the MetaCoin abstraction for Use.
MetaCoin.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

MetaCoin.deployed().then(function(instance) {
  meta = instance;  
  return meta.getBalance.call(account, {from: account});
}).then(function(balance) {
  console.log(`Balance is ${balance.toNumber()}\n`);
}).catch(function(err) {
  // There was an error! Handle it.
  console.log(err);
});

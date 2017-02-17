var Web3 = require('web3');
var contract = require('truffle-contract');
var web3 = new Web3();
var mCoin = require('./app/javascripts/mCoin');

// Import our contract artifacts and turn them into usable abstractions.
var metacoin_artifacts = require('./build/contracts/MetaCoin.json');
// MetaCoin is our usable abstraction, which we'll use through the code below.
var MetaCoin = contract(metacoin_artifacts);

var accounts;

// Bootstrap the MetaCoin abstraction for Use.
MetaCoin.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

// Get the list of our accounts.
mCoin.getAccounts().then(result => {
  console.log('Accounts:');
  console.log(JSON.stringify(result, null, 2));
  accounts = result;
  return mCoin.getBalance(result[0]);
}).then(result => {
  console.log(`Balance is ${result}`);
  return mCoin.sendCoin(10, accounts[0], accounts[1]);
}).then(result => {
  console.log(`Transferred 10 Meta from ${accounts[0]} to ${accounts[1]}`);
  return mCoin.getBalance(accounts[0]);
}).then(result => {
  console.log(`Balance is ${result}`);
}).catch(err => {
  console.log("There was an error.", err);
});


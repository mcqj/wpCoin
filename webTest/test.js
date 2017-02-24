var expect = require('chai').expect;
var Web3 = require('web3');
var contract = require('truffle-contract');
var web3 = new Web3();
var mCoin = require('../app/javascripts/mCoin');
// Import contract artifacts
var metacoin_artifacts = require('../build/contracts/MetaCoin.json');

var MetaCoin = {};
var accounts = [];
var preBalance = 0;

before(function() {
  // MetaCoin is our usable abstraction, which we'll use through the code below.
  MetaCoin = contract(metacoin_artifacts);
  // Bootstrap the MetaCoin abstraction for Use.
  MetaCoin.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
  web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
  // Get the list of our accounts
  return mCoin.getAccounts().then(result => {
    accounts = result;
  });
});

it("should transfer 10 Meta", function() {
  return mCoin.getBalance(accounts[0]).then(result => {
    preBalance = result.toNumber();
    return mCoin.sendCoin(10, accounts[0], accounts[1]);
  }).then(result => {
  //  console.log(`Transferred 10 Meta from ${accounts[0]} to ${accounts[1]}`);
    return mCoin.getBalance(accounts[0]);
  }).then(result => {
    expect(result.toNumber()).to.equal(preBalance - 10);
  });
});

it("should not transfer more coins than available", function() {

  return mCoin.getBalance(accounts[0]).then(result => {
    preBalance = result.toNumber();
    return mCoin.sendCoin(preBalance + 10, accounts[0], accounts[1]);
  }).then(result => {
  //  console.log(`Transferred 10 Meta from ${accounts[0]} to ${accounts[1]}`);
    return mCoin.getBalance(accounts[0]);
  }).then(result => {
    expect(result.toNumber()).to.equal(preBalance);
  });
});

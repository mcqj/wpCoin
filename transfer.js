var Web3 = require('web3');
var web3 = new(Web3);
var contract = require('truffle-contract');
var config = require('./config');
var account_one = config.account_one;
var account_two = config.account_two;

var metacoin_artifacts = require('./build/contracts/MetaCoin.json');

var MetaCoin = contract(metacoin_artifacts);

var meta;

// Bootstrap the MetaCoin abstraction for Use.
MetaCoin.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

MetaCoin.deployed().then(function(instance) {
  meta = instance;  
  return meta.sendCoin(account_two, 10, {from: account_one});
}).then(function(result) {
  // result is an object with the following values:
  //
  // result.tx      => transaction hash, string
  // result.logs    => array of decoded events that were triggered within this transaction
  // result.receipt => transaction receipt object, which includes gas used

  // We can loop through result.logs to see if we triggered the Transfer event.
  for (var i = 0; i < result.logs.length; i++) {
    var log = result.logs[i];

    if (log.event == "Transfer") {
      // We found the event!
      console.log(`Transfer event log is \n${JSON.stringify(log, null, 2)}\n`);
      break;
    }
  }
}).catch(function(err) {
  // There was an error! Handle it.
  console.log(err);
});

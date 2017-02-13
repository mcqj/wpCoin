module.exports = function checkAllBalances(cb) {
  var totalBal = 0;
  var eth = web3.eth;
  for (var acctNum in eth.accounts) {
    var acct = eth.accounts[acctNum];
    var acctBal = web3.fromWei(eth.getBalance(acct), "ether");
    totalBal += parseFloat(acctBal);
    console.log("  eth.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
  }
  cb();
}

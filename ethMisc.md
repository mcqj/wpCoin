# Miscellaneous Usage Notes on Ethereum

## Tools
Some of the tools that are needed are:-
- geth is the Go ethereum client (there is also a c++ client option)
- testrpc is a client that runs a local copy of the Ethereum blockchain and is fast for development use
- solc is the solidity compiler, used to compile solidity contracts
- solcjs is the javascript solidity compiler
- there is also an online solidity compiler at https://ethereum.github.io/browser-solidity
- truffle is a framework that makes contract development a little easier -> it makes the bridge between contract definition and Javascript clients smoother. It also provides a test framework for both solidity tests and Javascript tests

## Installing the solc CLI on Mac
Use Homebrew and be aware that it takes a very long time (maybe half an hour). Be patient, it's probably not broken.
`brew tap ethereum/ethereum`
`brew install solidity`

## Using solc
For some unfathomable reason, solc won't compile a file (or string) containing new lines. So, you first need to strip the new lines. For example,
`tr -d '\n' <Greeter.sol | solc --bin -o ./bin`

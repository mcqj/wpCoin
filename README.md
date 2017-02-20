# truffle-react
Example React project with Truffle. Includes contracts, migrations, tests, user interface and webpack build pipeline.

## Usage
We prefer to install 'truffle' locally that globally and so we run it from an npm script e.g. `npm run truffle -- migrate`
This project was initially created with `npm run truffle -- init webpack` inside an empty directory.
To run JS scripts from truffle, e.g checkAllBalances.js: `npm run truffle -- exec checkAllBalances`

## TODO

- Update setState to an immutable style.
- Move mCoin tests into usit tests - currently tested with cli app 'test.js'

## Building and the frontend

1. First run `truffle compile`, then run `truffle migrate` to deploy the contracts onto your network of choice (default "development").
1. Then run `npm run dev` to build the app and serve it on http://localhost:8080

## Starting a client
An ethereum client needs to be running for the application to access. <em>testrpc</em> is a convenient ethereum newtork simulator that runs entirely locally. To start it, execute the following command:
```
> ./node_modules/ethereumjs-testrpc/bin/testrpc -u 0 -u 1
```
To access the actual Ethereum network, we prefer the <em>geth</em> client. To run the geth client on the test network, execute the supplied script:
```
> ./get-test.sh
```

## Possible upgrades

* Use the webpack hotloader to sense when contracts or javascript have been recompiled and rebuild the application. Contributions welcome!

## Common Errors

* **Error: Can't resolve '../build/contracts/MetaCoin.json'**

This means you haven't compiled or migrated your contracts yet. Run `truffle compile` and `truffle migrate` first.

Full error:

```
ERROR in ./app/main.js
Module not found: Error: Can't resolve '../build/contracts/MetaCoin.json' in '/Users/tim/Documents/workspace/Consensys/test3/app'
 @ ./app/main.js 11:16-59
```

---
sidebar: auto
---
# API Reference

## web3
The `web3` object provides all methods.

### Example

```js
var Web3 = require('web3-cmt')

// Create an instance of web3 using the HTTP provider.
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
```

#### Example using HTTP Basic Authentication
```js
var Web3 = require('web3')

// HttpProvider takes 4 arguments (host, timeout, user, password).
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545", 0, BasicAuthUsername, BasicAuthPassword))

// Or you can pass the credentials in the URL like this:
var web3 = new Web3(new Web3.providers.HttpProvider("http://[username]:[password]@localhost:8545"))
// Note: you need to URL encode the user name and/or password, if constains unsafe ASCII characters.
```

***

## web3.cmt
The `web3.cmt` contains the CyberMiles blockchain related methods. It's fully compatible with Ethereum's `web3.eth`.

```js
var cmt = web3.cmt;
```

***

## web3.cmt.stake
The `web3.cmt.stake` contains all staking related functions.

***

### web3.cmt.stake.declareCandidacy

```js
web3.cmt.stake.declareCandidacy(candidacyObject [, callback])
```

A potential validator declares its candidacy. 

#### Parameters

1. `Object` - The Candidacy object.
  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified.
  - `nonce`: `Number` -  (optional) The number of transactions made by the sender prior to this one.
  - `pubKey`: `String` - Validator node public key.
  - `maxAmount`: `String` - Max amount of CMTs to be staked.
  - `cut`: `String` - The percentage of block awards to be distributed back to the delegators.
  - `description`: `Object` - (optional) Description object as follows:
    - `website`: `String` - Web page link
    - `location`: `String` - Location(network and geo)
    - `details`: `String` - Other informations

2. `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](#using-callbacks) for details.

#### Returns

`Object` - Result object.
  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains code and error log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains code and error log if failed.

#### Example

```js
var payload = {
  from: "0xc4abd0339eb8d57087278718986382264244252f",
  pubKey: "051FUvSNJmVL4UiFL7ucBr3TnGqG6a5JgUIgKf4UOIA=",
  maxAmount: web3.toWei(1000, "cmt"),
  cut: "0.8"
}
web3.cmt.stake.declareCandidacy(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*    
    */
  }
})
```

***

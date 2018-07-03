# API Reference

[web3-cmt.js](https://github.com/CyberMiles/web3-cmt.js) is a javascript library for interacting with CyberMiles. Its API is derived from the Ethereum [Web3.js](https://github.com/ethereum/wiki/wiki/JavaScript-API), and extends with support for other modules like staking and governance.

## web3

The `web3` object provides all methods, it's fully compatible with Ethereum's [web3](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3).

### Example

```js
var Web3 = require("web3-cmt")

// Create an instance of web3 using the HTTP provider.
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
```

#### Example using HTTP Basic Authentication

```js
var Web3 = require("web3")

// HttpProvider takes 4 arguments (host, timeout, user, password).
var web3 = new Web3(
  new Web3.providers.HttpProvider(
    "http://localhost:8545",
    0,
    BasicAuthUsername,
    BasicAuthPassword
  )
)

// Or you can pass the credentials in the URL like this:
var web3 = new Web3(
  new Web3.providers.HttpProvider("http://[username]:[password]@localhost:8545")
)
// Note: you need to URL encode the user name and/or password, if constains unsafe ASCII characters.
```

---

## web3.cmt

The `web3.cmt` contains the CyberMiles blockchain related methods. Refer to Ethereum's [web3.eth](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3eth) for detailed information.

### Example

```js
// send a transfer transaction
web3.cmt.sendTransaction(
  {
    from: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe",
    to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
    value: web3.toWei(100, "cmt")
  },
  (err, res) => {
    // ...
  }
)

// get the balance of an address
var balance = web3.cmt.getBalance("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
```

---

## web3.cmt.syncing

```js
web3.cmt.syncing
// or async
web3.cmt.getSyncing(callback(error, result){ ... })
```

This property is read only and returns the sync object.

### Returns

- Object - A sync object as follows:

  - latest_block_hash: Number - The hash of the latest block.
  - latest_app_hash: Number - The hash of latest application state.
  - latest_block_height: Number - The latest block number.
  - latest_block_time: Number - The latest block time.
  - syncing: Boolean - Whether the node is syncing or not.

### Example

```js
var sync = web3.cmt.syncing
console.log(sync)
/*
{
  latest_block_hash: '3F84EF726F19DF528620DD745FC6C2251CAE2673',
  latest_app_hash: '64BA27DCACAB23EBF4CF7ACE3604285F66739226',
  latest_block_height: 635,
  latest_block_time: '2018-06-20T08:01:31.061402192Z',
  syncing: false
}
*/
```

---

## web3.cmt.stake.validator

The `web3.cmt.stake.validator` contains all validator related functions.

---

### declare

```js
web3.cmt.stake.validator.declare(validatorToDeclare [, callback])
```

Allows a potential validator declares its candidacy.

#### Parameters

- `validatorToDeclare`: `Object` - The validator object to declare.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified. It will be associated with this validator (for self-staking and in order to get paid).
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `pubKey`: `String` - Validator node public key.
  - `maxAmount`: `String` - Max amount of CMTs to be staked.
  - `compRate`: `String` - Validator compensation. That is the percentage of block awards to be distributed back to the validators.
  - `description`: `Object` - (optional) Description object as follows:

    - `website`: `String` - Web page link.
    - `location`: `String` - Location(network and geo).
    - `details`: `String` - Other informations.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed.

#### Example

```js
var payload = {
  from: "0xc4abd0339eb8d57087278718986382264244252f",
  pubKey: "051FUvSNJmVL4UiFL7ucBr3TnGqG6a5JgUIgKf4UOIA=",
  maxAmount: web3.toWei(1000, "cmt"),
  comp_rate: "0.2"
}
web3.cmt.stake.validator.declare(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: { fee: {} },
      hash: '1573F39376D8C10C6B890861CD25FD0BA917556F',
      height: 271
    }
    */
  } else {
    console.log(err)
    /*
    {
      check_tx: { code: 1, log: 'pubkey has been declared', fee: {} },
      deliver_tx: { fee: {} },
      hash: '032FC10F8B54EBE8028E0ADFD4BB57A9522553D2',
      height: 0
    }
    */
  }
})
```

---

### update

```js
web3.cmt.stake.validator.update(validatorToUpdate [, callback])
```

Allows a validator candidate to change its candidacy.

#### Parameters

- `validatorToUpdate`: `Object` - The validator object to update.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `maxAmount`: `String` - (optional) New max amount of CMTs to be staked.
  - `description`: `Object` - (optional) When updated, the verified status will set to false:
    - `website`: `String` - Web page link.
    - `location`: `String` - Location(network and geo).
    - `details`: `String` - Other informations.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed.

#### Example

```js
var payload = {
  from: "0xc4abd0339eb8d57087278718986382264244252f",
  maxAmount: web3.toWei(1000, "cmt"),
  description: {
    website: "http://www.blahblahblah.com/"
  }
}
web3.cmt.stake.validator.update(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: { fee: {} },
      hash: '1B11C4D5EA9664DB1DD3A9CDD86741D6C8E226E9',
      height: 297
    }
    */
  } else {
    console.log(err)
    /*
    {
      check_tx: { code: 1, log: 'cannot edit non-exsits candidacy', fee: {} },
      deliver_tx: { fee: {} },
      hash: '96E9FAF98075248D69DCC7D0A5697312733D159F',
      height: 0
    }
    */
  }
})
```

---

### withdraw

```js
web3.cmt.stake.validator.withdraw(validatorToWithdraw [, callback])
```

Allows a validator to withdraw.

#### Parameters

- `validatorToWithdraw`: `Object` - The validator object to withdraw.

  - `from`: `String` - The address for the validator. Uses the `web3.cmt.defaultAccount` property, if not specified.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed.

#### Example

```js
var payload = {
  from: "0xc4abd0339eb8d57087278718986382264244252f"
}
web3.cmt.stake.validator.withdraw(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: { fee: {} },
      hash: '4A723894821166EFC7DDD4FD92BE8D855B3FDBAC',
      height: 311
    }
    */
  } else {
    console.log(err)
    /*
    {
      check_tx: { code: 1, log: 'cannot withdraw non-exsits candidacy', fee: {} },
      deliver_tx: { fee: {} },
      hash: 'C7AAB80D2F6503CC2BB4CC5843A8361F0D182D6D',
      height: 0
    }
    */
  }
})
```

---

### verify

```js
web3.cmt.stake.validator.verify(validatorToVerify [, callback])
```

Allows the foundation to "verify" a validator's information.

#### Parameters

- `validatorToVerify`: `Object` - The validator object to verify.

  - `from`: `String` - A special address the foundation owns. Uses the `web3.cmt.defaultAccount` property, if not specified.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `candidateAddress`: `String` - The address of validator to verfify.
  - `verified`: `Boolean` - (optional) Verified true or false, default to false.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed.

#### Example

```js
var payload = {
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  candidateAddress: "0xc4abd0339eb8d57087278718986382264244252f",
  verified: true
}
web3.cmt.stake.validator.verify(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: { fee: {} },
      hash: 'EADC546C764AFF6C176B843321B5AB090FBEC0DA',
      height: 334
    }
    */
  } else {
    console.log(err)
    /*
    {
      check_tx: { code: 21, log: 'verification disallowed', fee: {} },
      deliver_tx: { fee: {} },
      hash: '9F5BA6915807CC1990E8329BA429CEBDE20827D8',
      height: 0
    }
    */
  }
})
```

---

### activate

```js
web3.cmt.stake.validator.activate(validatorToActivate [, callback])
```

Allows a "removed" validator to re-activate itself.

#### Parameters

- `validatorToActivate`: `Object` - The validator object to activate.

  - `from`: `String` - The address for the validator. Uses the `web3.cmt.defaultAccount` property, if not specified.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed.

#### Example

```js
var payload = {
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc"
}
web3.cmt.stake.validator.activate(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: { fee: {} },
      hash: 'FB70A78AD62A0E0B24194CA951725770B2EFBC0A',
      height: 393
    }
    */
  } else {
    console.log(err)
    /*
    {
      "check_tx": {
        "code": 1,
        "log": "already activated",
        "fee": {}
      },
      deliver_tx: { fee: {} },
      "hash": "FB70A78AD62A0E0B24194CA951725770B2EFBC0A",
      "height": 0
    }
    */
  }
})
```

---

### query

```js
web3.cmt.stake.validator.query(validatorAddress [, height] [, callback])
```

Query the current stake status of a specific validator.

#### Parameters

- `validatorAddress`: `String` - The validator address.
- `height`: `Number` - (optional) The block number. Default to 0, means current head of the blockchain.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Object` - The validator object.

#### Example

```js
var info = web3.cmt.stake.validator.query(
  "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc"
)
console.log(info)
/*
{ 
  height: 318,
  data: { 
    pub_key: {
      type: 'AC26791624DE60',
      value: 'BSQWyJ3030QILZS8gO+35XtbNYfoD29G/HJGKXLYV+A='
    },
    owner_address: '0x7eff122b94897ea5b0e2a9abf47b86337fafebdc',
    shares: '35579353405967526756590',
    voting_power: 35552,
    max_shares: '1000000000000000000',
    comp_rate: '0.5',
    created_at: '2018-05-22T09:09:03Z',
    updated_at: '2018-05-23T06:29:53Z',
    description: { website: '', location: '', details: '' },
    verified: 'N',
    active: 'Y'
  }
}
*/
```

---

### list

```js
web3.cmt.stake.validator.list([height] [, callback])
```

Returns a list of all current validators and validator candidates.

#### Parameters

- `height`: `Number` - (optional) The block number. Default to 0, means current head of the blockchain.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Array` - An array of all current validators and validator candidates. For details of validator object, see [web3.cmt.stake.queryValidator](#queryvalidator).

#### Example

```js
var info = web3.cmt.stake.validator.list()
console.log(info)
/*
{ 
  height: 318,
  data: [{ 
    pub_key: {
      type: 'AC26791624DE60',
      value: 'BSQWyJ3030QILZS8gO+35XtbNYfoD29G/HJGKXLYV+A='
    },
    owner_address: '0x7eff122b94897ea5b0e2a9abf47b86337fafebdc',
    shares: '35579353405967526756590',
    voting_power: 35552,
    max_shares: '1000000000000000000',
    comp_rate: '0.5',
    created_at: '2018-05-22T09:09:03Z',
    updated_at: '2018-05-23T06:29:53Z',
    description: { website: '', location: '', details: '' },
    verified: 'N',
    active: 'Y'
  }]
}
*/
```

---

## web3.cmt.stake.delegator

The `web3.cmt.stake.delegator` contains all delegator related functions.

---

### accept

```js
web3.cmt.stake.delegator.accept(delegateObject [, callback])
```

Used by a delegator to stake CMTs to a validator.

#### Parameters

- `delegateObject`: `Object` - The delegate object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `validatorAddress`: `String` - The address of validator to delegate.
  - `amount`: `String` - Amount of CMTs in Wei to delegate.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed.

#### Example

```js
var payload = {
  from: "0x38d7b32e7b5056b297baf1a1e950abbaa19ce949",
  validatorAddress: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  amount: web3.toWei(1000, "cmt")
}
web3.cmt.stake.delegator.accept(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: { fee: {} },
      hash: '8A40C44D31316BFB2D417A1985E03DA36145EF5A',
      height: 319
    }
    */
  } else {
    console.log(err)
    /*
    {
      check_tx: { code: 5, log: 'Validator does not exist for that address', fee: {} },
      deliver_tx: { fee: {} },
      hash: '9F5BA6915807CC1990E8329BA429CEBDE20827D8',
      height: 0
    }
    */
  }
})
```

---

### withdraw

```js
web3.cmt.stake.delegator.withdraw(withdrawObject [, callback])
```

Used by a delegator to unbind staked CMTs from a validator.

#### Parameters

- `withdrawObject`: `Object` - The withdraw object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `validatorAddress`: `String` - The address of validator to withdraw.
  - `amount`: `String` - Amount of CMTs in Wei to withdraw.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed.

#### Example

```js
var payload = {
  from: "0x38d7b32e7b5056b297baf1a1e950abbaa19ce949",
  validatorAddress: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  amount: web3.toWei(1000, "cmt")
}
web3.cmt.stake.delegator.withdraw(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: { fee: {} },
      hash: '31D3460EC5AF72DC4E86CB1A44885B32BBAC2E58',
      height: 931
    }
    */
  } else {
    console.log(err)
    /*
    {
      check_tx: { code: 5, log: 'Validator does not exist for that address', fee: {} },
      deliver_tx: { fee: {} },
      hash: '1D87DE23156C94516F0CA6BFDEC0E2FBE397B290',
      height: 0
    }
    */
  }
})
```

---

### query

```js
web3.cmt.stake.delegator.query(delegatorAddress [, height] [, callback])
```

Query the current stake status of a specific delegator.

#### Parameters

- `delegatorAddress`: `String` - The delegator address.
- `height`: `Number` - (optional) The block number. Default to 0, means current head of the blockchain.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Object` - The delegator object.

#### Example

```js
var info = web3.cmt.stake.delegator.query(
  "0x84f444c0405c762afa4ee3e8d8a5b3653ea52549"
)
console.log(info)
/*
{ 
  height: 318,
  data: [{
    "delegator_address": "0x84f444c0405c762afa4ee3e8d8a5b3653ea52549",
    "pub_key": {
        "type": "AC26791624DE60",
        "value": "BSQWyJ3030QILZS8gO+35XtbNYfoD29G/HJGKXLYV+A="
    },
    "delegate_amount": "7000000000000000000",
    "award_amount": "4560541633663463852",
    "withdraw_amount": "0",
    "slash_amount": "0",
    "created_at": "2018-05-22T10:05:57Z",
    "updated_at": "2018-05-23T07:59:50Z"
  }]
}
*/
```

---

## web3.cmt.governance

The `web3.cmt.governance` module allows validators to vote on changes to the system state.

---

### proposeRecoverFund

```js
web3.cmt.governance.proposeRecoverFund(recoverFundObject [, callback])
```

Propose a fund recovery proposal.

#### Parameters

- `recoverFundObject`: `Object` - The fund recovery proposal object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified. Must be a validator.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `transferFrom`: `String` - From account address.
  - `transferTo`: `String` - To account address.
  - `amount`: `String` - Amount of CMTs in Wei.
  - `reason`: `String` - (optional) Reason.
  - `expire`: `Number` - (optional) Expiration block height. Default to 7 days, measured in block height (`7 * 24 * 60 * 60 / 10`)

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed. If successful, the `ProposalID` will be set in the `data` property, for validators to vote later.

#### Example

```js
var payload = {
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  transferFrom: "0xc4abd0339eb8d57087278718986382264244252f",
  transferTo: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
  amount: web3.toWei(1000, "cmt")
}
web3.cmt.governance.proposeRecoverFund(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: {
        data: 'JTUx+ODH0/OSdgfC0Sn66qjn2tX8LfvbiwnArzNpIus=',
        gasUsed": '2000000',
        fee: {
            key: 'R2FzRmVl',
            value: "4000000000000000'
        }
      },
      hash: '95A004438F89E809657EB119ACBDB42A33725B39',
      height: 561
    }
    */
  } else {
    console.log(err)
    /*
    {
      check_tx: { code: 20, log: 'Insufficient balance', fee: {} },
      deliver_tx: { fee: {} },
      hash: '9D9287A0A5876C8C40A06483DA8885581C073064',
      height: 0
    }
    */
  }
})
```

---

### proposeChangeParam

```js
web3.cmt.governance.proposeChangeParam(changeParamObject [, callback])
```

Propose a system parameter change.

#### Parameters

- `changeParamObject`: `Object` - The system parameter change proposal object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified. Must be a validator.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `name`: `String` - The name of the parameter.
  - `value`: `String` - New value of the parameter.
  - `reason`: `String` - (optional) Reason.
  - `expire`: `Number` - (optional) Expiration block height. Default to 7 days, measured in block height (`7 * 24 * 60 * 60 / 10`)

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed. If successful, the `ProposalID` will be set in the `data` property, for validators to vote later.

#### Example

```js
var payload = {
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  name: "gas_price",
  value: "3000000000"
}
web3.cmt.governance.proposeChangeParam(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: {
        data: 'JTUx+ODH0/OSdgfC0Sn66qjn2tX8LfvbiwnArzNpIus=',
        gasUsed": '2000000',
        fee: {
            key: 'R2FzRmVl',
            value: "4000000000000000'
        }
      },
      hash: '95A004438F89E809657EB119ACBDB42A33725B39',
      height: 561
    }
    */
  } else {
    console.log(err)
    /*
    {
      check_tx: { code: 20, log: 'Insufficient balance', fee: {} },
      deliver_tx: { fee: {} },
      hash: '9D9287A0A5876C8C40A06483DA8885581C073064',
      height: 0
    }
    */
  }
})
```

---

### vote

```js
web3.cmt.governance.vote(voteObject [, callback])
```

Propose a fund recovery proposal.

#### Parameters

- `voteObject`: `Object` - The vote object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified. Must be a validator.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `proposalId`: `String` - The Proposal ID to vote.
  - `answer`: `String` - Y or N.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed. If successful, the `ProposalID` will be set in the `data` property, for validators to vote later.

#### Example

```js
var payload = {
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  proposalId: "JTUx+ODH0/OSdgfC0Sn66qjn2tX8LfvbiwnArzNpIus=",
  answer: "Y"
}
web3.cmt.governance.vote(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: {
        data: 'JTUx+ODH0/OSdgfC0Sn66qjn2tX8LfvbiwnArzNpIus=',
        fee: {}
      },
      hash: '95A004438F89E809657EB119ACBDB42A33725B39',
      height: 561
    }
    */
  } else {
    console.log(err)
    /*
    {
      check_tx: { code: 20, log: 'Insufficient balance', fee: {} },
      deliver_tx: { fee: {} },
      hash: '9D9287A0A5876C8C40A06483DA8885581C073064',
      height: 0
    }
    */
  }
})
```

---

### queryProposals

```js
web3.cmt.governance.queryProposals([height] [, callback])
```

Returns a list of all proposals.

#### Parameters

- `height`: `Number` - (optional) The block number. Default to 0, means current head of the blockchain.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Array` - An array of all proposals.

#### Example

```js
var info = web3.cmt.governance.queryProposals()
console.log(info)
/*
{ 
  height: 538,
  data: [{
    "Id": "nxZjuPCLxfctbf7bxBMCfHUS8kKOyR62C2KrdwdGUYA=",
    "Proposer": "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
    "BlockHeight": 153,
    "From": "0x85cd5a4d95f391ade6c93d66a204e3cc0fb66d3e",
    "To": "0xe27513f639808a7e4dede3a44cf1330c26b24cd3",
    "Amount": "500000000000000000000",
    "Reason": "Governance test",
    "ExpireBlockHeight": 60633,
    "CreatedAt": "2018-05-22T09:35:32Z",
    "Result": "Approved",
    "ResultMsg": "",
    "ResultBlockHeight": 154,
    "ResultAt": "2018-05-22T09:35:43Z"
  }]
}
*/
```

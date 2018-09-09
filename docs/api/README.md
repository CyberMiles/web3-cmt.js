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

## web3.cmt.getCmtBlock

```js
web3.cmt.getCmtBlock(blockNumber [, callback])
```

Returns a block matching the block number.

#### Parameters

- `blockNumber`: `Number` - The block number.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

### Returns

- Object - The block object

### Example

```js
var block = web3.cmt.getCmtBlock(78)
console.log(block)
/*
{
  block: {
    data: {
      txs: ["+G0BhHc1lACDAV+QlFtioeBKJ5lir0kGiveMeoVqmrCyiTY1ya3F3qAAAIBKoGOOykLYMRqQhWdQYTpV2/RbrJTk/qKIrCTGpk/ynb8QoA94Eh4xyCJqISSKZ8o1p7sG9sSygewRAqL9vm23Vc+Y", "+KkChHc1lACDAV+QlLaynvkBIL7Fl5OeDtpripFk913rgLhEqQWcuwAAAAAAAAAAAAAAAFtioeBKJ5lir0kGiveMeoVqmrCyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2Ncmtxd6gAABKoN4cREt393BKAcfMd5dbZFkB7EBxDZxXvxyU2+PX1cF8oHmTcrOusclRLWM/J5A21Av12fhZ8mkRlbor1i2UthWv"]
    },
    evidence: {
      evidence: null
    },
    header: {
      app_hash: "238921D04565CCE1B2F80649CDB9D8AB7BDCB4A1",
      chain_id: "testnet",
      consensus_hash: "D6B74BB35BDFFD8392340F2A379173548AE188FE",
      data_hash: "D120672BFD507D2EE2BD93F7283B834C8E0087A4",
      evidence_hash: "",
      height: 78,
      last_block_id: {
        hash: "827171AE763A84C374E23F053AB3F33A1013CA64",
        parts: {...}
      },
      last_commit_hash: "902C280EC13022A9AE529D48B1758A88CD77C57A",
      last_results_hash: "",
      num_txs: 2,
      time: "2018-08-23T09:18:02.28584833Z",
      total_txs: 3,
      validators_hash: "7A5B285BB43C501B6A96C4885DF07C909AA55961"
    },
    last_commit: {
      block_id: {
        hash: "827171AE763A84C374E23F053AB3F33A1013CA64",
        parts: {...}
      },
      precommits: [{...}, {...}, {...}, {...}, {...}, {...}, {...}]
    }
  },
  block_meta: {
    block_id: {
      hash: "B9FBEF27950A1F2D769C30B2E589715B9CB11270",
      parts: {
        hash: "74865AE76C750B876D334091D67D7A1473EB87F2",
        total: 1
      }
    },
    header: {
      app_hash: "238921D04565CCE1B2F80649CDB9D8AB7BDCB4A1",
      chain_id: "testnet",
      consensus_hash: "D6B74BB35BDFFD8392340F2A379173548AE188FE",
      data_hash: "D120672BFD507D2EE2BD93F7283B834C8E0087A4",
      evidence_hash: "",
      height: 78,
      last_block_id: {
        hash: "827171AE763A84C374E23F053AB3F33A1013CA64",
        parts: {...}
      },
      last_commit_hash: "902C280EC13022A9AE529D48B1758A88CD77C57A",
      last_results_hash: "",
      num_txs: 2,
      time: "2018-08-23T09:18:02.28584833Z",
      total_txs: 3,
      validators_hash: "7A5B285BB43C501B6A96C4885DF07C909AA55961"
    }
  }
}
*/
```

---

## web3.cmt.getCmtTransaction

```js
web3.cmt.getCmtTransaction(transactionHash [, callback])
```

Returns a transaction matching the given transaction hash.

#### Parameters

- `transactionHash`: `Number` - The transaction hash.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

### Returns

- Object - The transaction object.

### Example

```js
// eth compatible transaction
var transaction = web3.cmt.getCmtTransaction(
  "A3C6073BE1BE0E52B1333F467CF2FD23E96028C5"
)
console.log(transaction)
/*
{
  blockNumber: 78,
  cmtHash: "A3C6073BE1BE0E52B1333F467CF2FD23E96028C5",
  cmtInput: null,
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  gas: 90000,
  gasPrice: 2000000000,
  hash: "0x15e40d808bb7dfe73477482a48818424ad8145dbf98f8c33d21265d7d853de58",
  input: "0x",
  nonce: 1,
  r: "0x638eca42d8311a90856750613a55dbf45bac94e4fea288ac24c6a64ff29dbf10",
  s: "0xf78121e31c8226a21248a67ca35a7bb06f6c4b281ec1102a2fdbe6db755cf98",
  to: "0x5b62a1e04a279962af49068af78c7a856a9ab0b2",
  transactionIndex: 0,
  txResult: {
    fee: {}
  },
  v: "0x4a",
  value: 1e+21
}
*/

// cmt transaction
var transaction = web3.cmt.getCmtTransaction(
  "E577068933111104EB5FA7927648A231FFFB96C6"
)
console.log(transaction)
/*
{
  blockNumber: 7086,
  cmtHash: "E577068933111104EB5FA7927648A231FFFB96C6",
  cmtInput: {
    data: {
      description: {
        email: "aaron@wespoke.com",
        location: "CN,ASIA",
        name: "Aaron",
        profile: "Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget malesuada. Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus.",
        website: "https://cube-api-test.cybermiles.io"
      },
      max_amount: ""
    },
    type: "stake/updateCandidacy"
  },
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  gas: 0,
  gasPrice: 0,
  hash: "0x8075e5d05723a928fdbbc9f080dba2dac482f747405ed544d844b2b3220a32a0",
  input: "0x7b2274797065223a227374616b652f75706461746543616e646964616379222c2264617461223a7b226d61785f616d6f756e74223a22222c226465736372697074696f6e223a7b226e616d65223a224161726f6e222c2277656273697465223a2268747470733a2f2f637562652d6170692d746573742e63796265726d696c65732e696f222c226c6f636174696f6e223a22434e2c41534941222c22656d61696c223a226161726f6e40776573706f6b652e636f6d222c2270726f66696c65223a22446f6e65632072757472756d20636f6e677565206c656f2065676574206d616c6573756164612e20446f6e65632072757472756d20636f6e677565206c656f2065676574206d616c6573756164612e204e756c6c612071756973206c6f72656d207574206c696265726f206d616c65737561646120666575676961742e20446f6e656320736f6c6c696369747564696e206d6f6c6573746965206d616c6573756164612e204c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e73656374657475722061646970697363696e6720656c69742e2050726f696e206567657420746f72746f722072697375732e227d7d7d",
  nonce: 51,
  r: "0x82be6e5a25e1d58ff3bdd7649be5295fce1852ef4404c8848ffda9e528d7fc68",
  s: "0x1746427b7fb25ebce685e47b87a47c680cd27c88c974d29ca3a612cd2a959bb7",
  to: null,
  transactionIndex: 0,
  txResult: {
    fee: {
      key: "R2FzRmVl",
      value: "2000000000000000"
    },
    gasUsed: "1000000"
  },
  v: "0x4a",
  value: 0
}
*/
```

---

## web3.cmt.getCmtTransactionFromBlock

```js
web3.cmt.getCmtTransactionFromBlock(blockNumber, indexNumber [, callback])
```

Returns a transaction based on a block hash or number and the transactions index position.

#### Parameters

- `blockNumber`: `Number` - The block number.
- `indexNumber`: `Number` - The transactions index position.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

### Returns

- Object - The transaction object.

### Example

```js
// eth compatible transaction
var transaction = web3.cmt.getCmtTransactionFromBlock(78, 0)
console.log(transaction)
/*
{
  blockNumber: 78,
  cmtHash: "A3C6073BE1BE0E52B1333F467CF2FD23E96028C5",
  cmtInput: null,
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  gas: 90000,
  gasPrice: 2000000000,
  hash: "0x15e40d808bb7dfe73477482a48818424ad8145dbf98f8c33d21265d7d853de58",
  input: "0x",
  nonce: 1,
  r: "0x638eca42d8311a90856750613a55dbf45bac94e4fea288ac24c6a64ff29dbf10",
  s: "0xf78121e31c8226a21248a67ca35a7bb06f6c4b281ec1102a2fdbe6db755cf98",
  to: "0x5b62a1e04a279962af49068af78c7a856a9ab0b2",
  transactionIndex: 0,
  txResult: {
    fee: {}
  },
  v: "0x4a",
  value: 1e+21
}
*/

// cmt transaction
var transaction = web3.cmt.getCmtTransactionFromBlock(7086, 0)
console.log(transaction)
/*
{
  blockNumber: 7086,
  cmtHash: "E577068933111104EB5FA7927648A231FFFB96C6",
  cmtInput: {
    data: {
      description: {
        email: "aaron@wespoke.com",
        location: "CN,ASIA",
        name: "Aaron",
        profile: "Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget malesuada. Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus.",
        website: "https://cube-api-test.cybermiles.io"
      },
      max_amount: ""
    },
    type: "stake/updateCandidacy"
  },
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  gas: 0,
  gasPrice: 0,
  hash: "0x8075e5d05723a928fdbbc9f080dba2dac482f747405ed544d844b2b3220a32a0",
  input: "0x7b2274797065223a227374616b652f75706461746543616e646964616379222c2264617461223a7b226d61785f616d6f756e74223a22222c226465736372697074696f6e223a7b226e616d65223a224161726f6e222c2277656273697465223a2268747470733a2f2f637562652d6170692d746573742e63796265726d696c65732e696f222c226c6f636174696f6e223a22434e2c41534941222c22656d61696c223a226161726f6e40776573706f6b652e636f6d222c2270726f66696c65223a22446f6e65632072757472756d20636f6e677565206c656f2065676574206d616c6573756164612e20446f6e65632072757472756d20636f6e677565206c656f2065676574206d616c6573756164612e204e756c6c612071756973206c6f72656d207574206c696265726f206d616c65737561646120666575676961742e20446f6e656320736f6c6c696369747564696e206d6f6c6573746965206d616c6573756164612e204c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e73656374657475722061646970697363696e6720656c69742e2050726f696e206567657420746f72746f722072697375732e227d7d7d",
  nonce: 51,
  r: "0x82be6e5a25e1d58ff3bdd7649be5295fce1852ef4404c8848ffda9e528d7fc68",
  s: "0x1746427b7fb25ebce685e47b87a47c680cd27c88c974d29ca3a612cd2a959bb7",
  to: null,
  transactionIndex: 0,
  txResult: {
    fee: {
      key: "R2FzRmVl",
      value: "2000000000000000"
    },
    gasUsed: "1000000"
  },
  v: "0x4a",
  value: 0
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
  compRate: "0.2"
}
web3.cmt.stake.validator.declare(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: {
        "gasUsed": "1000000",
        "fee": {
          "key": "R2FzRmVl",
          "value": "2000000000000000"
        }
      },
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
      deliver_tx: {
        "gasUsed": "1000000",
        "fee": {
          "key": "R2FzRmVl",
          "value": "2000000000000000"
        }
      },
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

### setCompRate

```js
web3.cmt.stake.validator.setCompRate(compRate [, callback])
```

Allows a validator to update the compensation rate for its delegators.

#### Parameters

- `compRate`: `Object` - The validator object to activate.

  - `from`: `String` - The address for the validator. Uses the `web3.cmt.defaultAccount` property, if not specified.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `delegatorAddress`: `String` - The adddress of delegator.
  - `compRate`: `String` - New compensation rate to set for the delegator. Compensation rate is the percentage of block awards to be distributed back to the validators.

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
  delegatorAddress: "0x38d7b32e7b5056b297baf1a1e950abbaa19ce949",
  compRate: "0.3"
}
web3.cmt.stake.validator.compRate(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: {
        "gasUsed": "1000000",
        "fee": {
          "key": "R2FzRmVl",
          "value": "2000000000000000"
        }
      },
      hash: 'C61BAEEEF637CB554157261DF27F7D1CFE50F251',
      height: 393
    }
    */
  } else {
    console.log(err)
    /*
    {
      "check_tx": {
        "code": 21,
        "log": "No corresponding delegation exists",
        "fee": {}
      },
      deliver_tx: { fee: {} },
      "hash": "DD7135A352FBE2173DCEB1AA1F73734D00095699",
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
- `height`: `Number` - (optional) The block number. Default to 0, means current head of the blockchain. NOT IMPLEMENTED YET.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Object` - The validator object.

#### Example

```js
var info = web3.cmt.stake.validator.query(
  "0x7eFf122b94897EA5b0E2A9abf47B86337FAfebdC"
)
console.log(JSON.stringify(info, null, 2))
/*
{ 
  "height": 38,
  "data": {
    "pub_key": {
      "type": "tendermint/PubKeyEd25519",
      "value": "DuoqmCIcqTzzeBLhz1qt+Q+eCAAHb6bmPng6D1k66Ys="
    },
    "owner_address": "0x7eFf122b94897EA5b0E2A9abf47B86337FAfebdC",
    "shares": "90194330251710238108877",
    "voting_power": 90194,
    "max_shares": "830667891977041679569910",
    "comp_rate": "0.2",
    "created_at": "2018-07-03T10:04:20Z",
    "updated_at": "2018-07-03T14:35:52Z",
    "description": {
      "name": "Aaron",
      "website": "https://cube-api-test.cybermiles.io",
      "location": "CN,ASIA",
      "email": "aaron@wespoke.com",
      "profile": "Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget malesuada. Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus."
    },
    "verified": "N",
    "active": "Y",
    "block_height": 1,
    "rank": 0,
    "state": "Validator"
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

- `height`: `Number` - (optional) The block number. Default to 0, means current head of the blockchain. NOT IMPLEMENTED YET.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Array` - An array of all current validators and validator candidates. For details of validator object, see [web3.cmt.stake.queryValidator](#queryvalidator).

#### Example

```js
var info = web3.cmt.stake.validator.list()
console.log(JSON.stringify(info, null, 2))
/*
{ 
  "height": 38,
  "data": [
    {
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "DuoqmCIcqTzzeBLhz1qt+Q+eCAAHb6bmPng6D1k66Ys="
      },
      "owner_address": "0x7eFf122b94897EA5b0E2A9abf47B86337FAfebdC",
      "shares": "89884499451603693478569",
      "voting_power": 89884,
      "max_shares": "830667891977041679569910",
      "comp_rate": "0.2",
      "created_at": "2018-07-03T10:04:20Z",
      "updated_at": "2018-07-03T14:35:52Z",
      "description": {
        "name": "Aaron",
        "website": "https://cube-api-test.cybermiles.io",
        "location": "CN,ASIA",
        "email": "aaron@wespoke.com",
        "profile": "Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget malesuada. Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus."
      },
      "verified": "N",
      "active": "Y",
      "block_height": 1,
      "rank": 0,
      "state": "Validator"
    }
  ]
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
  - `cubeBatch`: `String` - The batch number of the CMT cube. Use "01" for testing.
  - `sig`: `String` - `delegator_address|nonce` signed by the CMT cube. Check [this](#cube-signature) for how to generate a signature for testing.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed.

#### Example

```js
var delegator = "0x38d7b32e7b5056b297baf1a1e950abbaa19ce949"
var validator = "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc"
var payload = {
  from: delegator,
  validatorAddress: validator,
  amount: web3.toWei(1000, "cmt"),
  cubeBatch: "01",
  sig:
    "036b6dddefdb1d798a9847121dde8c38713721869a24c77abe2249534f6d98622727720994f663ee9cc446c6e246781caa3a88b7bff78a4ffc9de7c7eded00caef61c2ea36be6a0763ed2bf5af4cf38e38bd6b257857f314c4bbb902d83c8b4413ba2f880d24bf0d6874e392807dfbc2bd03910c58989bc69a9090eddefe8e55"
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

#### Cube signature

```js
var crypto = require("crypto")

// this private key is for testing only, use it together with cubeBatch "01"
var privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCiWpvDnwYFTqgSWPlA3VO8u+Yv9r8QGlRaYZFszUZEXUQxquGl
FexMSVyFeqYjIokfPOEHHx2voqWgi3FKKlp6dkxwApP3T22y7Epqvtr+EfNybRta
15snccZy47dY4UcmYxbGWFTaL66tz22pCAbjFrxY3IxaPPIjDX+FiXdJWwIDAQAB
AoGAOc63XYz20Nbz4yyI+36S/UWOLY/W8f3eARxycmIY3eizilfE5koLDBKm/ePw
2dvHJTdBDI8Yu9vWy3Y7DWRNOHJKdcc1gGCR36cJFc4/h02zdaK+CK4eAaZLXhdK
H8DljEx6QAeRtxVLZGeYa4actY+3GeujYvkQ5QwNprchTSECQQDO4VMmLB+iIT/N
jnADYOuWKe3iLBoTKHmVfAaTRMMeHATMkpgyVzTLO7jMYCWy7+S0DL4wDNUTQv+P
Nna/hrAxAkEAyObfMAgjnW6s+CGoN+yWtdBC0LvDXDrzaT3KqmHxK2iCg2kQ9R6P
0vCvGJytuPxmIVZn54+KpKfR6ok6RJSbSwJAF+CRxDobfI7x2juyWfF5v18fgZct
e0CUp9gkuiKZkoQRWbshrc263ioKbiw6rahacR13ZfxVK1/0NwdGNVzKQQJBAJpw
QGpgF2DSz8z/sp0rFsA1lOd5L7ka6Dui8MUB/a9s68exYQPNtqpls3SsHS/zd19x
WPa9dcsV51zwmQZXZvkCQQChnQLBs6BbH6O85ePXSSbe7RUvHua6EEkmCNkIw+vT
3Jqmk4ecxCzmEv3xbzrCdgOhfjxqjrsqLLK6BH+lJsWS
-----END RSA PRIVATE KEY-----`

var address = "0x38d7b32e7b5056b297baf1a1e950abbaa19ce949"
var nonce = 5
var message = address + "|" + nonce

var hash = crypto
  .createHash("sha256")
  .update(message)
  .digest("hex")
let signature = crypto.privateDecrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_NO_PADDING
  },
  new Buffer(hash, "hex")
)
var signature_hex = signature.toString("hex")
console.log(signature_hex)
// 036b6dddefdb1d798a9847121dde8c38713721869a24c77abe2249534f6d98622727720994f663ee9cc446c6e246781caa3a88b7bff78a4ffc9de7c7eded00caef61c2ea36be6a0763ed2bf5af4cf38e38bd6b257857f314c4bbb902d83c8b4413ba2f880d24bf0d6874e392807dfbc2bd03910c58989bc69a9090eddefe8e55
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
- `height`: `Number` - (optional) The block number. Default to 0, means current head of the blockchain. NOT IMPLEMENTED YET.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Object` - The delegator object.

#### Example

```js
var info = web3.cmt.stake.delegator.query(
  "0x3a436deae68b7d4c8ff9f1cb0498913a397472d7"
)
console.log(JSON.stringify(info, null, 2))
/*
{ 
  "height": 38,
  "data": [
    {
      "delegator_address": "0x3a436deae68b7d4c8ff9f1cb0498913a397472d7",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "r7fTVtIlliUUCfGEHuj4qnHcxB7dfRC1fFUDkSHYIAg="
      },
      "delegate_amount": "1000000000000000000000",
      "award_amount": "53858698031300841769",
      "withdraw_amount": "0",
      "slash_amount": "0",
      "created_at": "2018-07-03T10:24:31Z",
      "updated_at": "2018-07-03T14:46:06Z"
    }
  ]
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
  - `expireBlockHeight`: `Number` - (optional) Expiration block height.
  - `expireTimestamp`: `Number` - (optional) Timestamp when the proposal will expire.

  _Note: You can specify expiration block height **or** timestamp, but not both. If none is specified, a default of 7 days, as measured in block height(`7 * 24 * 60 * 60 / 10`), will be used._

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
  - `expireBlockHeight`: `Number` - (optional) Expiration block height.
  - `expireTimestamp`: `Number` - (optional) Timestamp when the proposal will expire.

  _Note: You can specify expiration block height **or** timestamp, but not both. If none is specified, a default of 7 days, as measured in block height(`7 * 24 * 60 * 60 / 10`), will be used._

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

### proposeDeployLibEni

```js
web3.cmt.governance.proposeDeployLibEni(deployLibEniObject [, callback])
```

Propose a new library for ENI.

#### Parameters

- `deployLibEniObject`: `Object` - The new ENI library proposal object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified. Must be a validator.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `name`: `String` - The name of the library.
  - `version`: `String` - Version of the library, data format: vX.Y.Z, where X, Y, and Z are non-negative integers.
  - `fileUrl`: `String` - JSON string of key/value pairs. Key is the name of the OS(so far, only ubuntu and centos are supported), value is the URL array to retrieve the library file.
  - `md5`: `String` - JSON string of key/value pairs. Key is the name of the OS(so far, only ubuntu and centos are supported), value is the MD5 of the library file.
  - `reason`: `String` - (optional) Reason.
  - `expireBlockHeight`: `Number` - (optional) Expiration block height.
  - `expireTimestamp`: `Number` - (optional) Timestamp when the proposal will expire.

  _Note: You can specify expiration block height **or** timestamp, but not both. If none is specified, a default of 7 days, as measured in block height(`7 * 24 * 60 * 60 / 10`), will be used._

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
  name: "reverse",
  version: "v1.0.0",
  fileUrl:
    '{"ubuntu": ["https://libeni.cybermiles.io/libs/reverse/eni_reverse_1.2.0_ubuntu16.04.so", "http://45.77.171.204/eni_reverse_ubuntu16.04.so"], \
      "centos": ["https://libeni.cybermiles.io/libs/reverse/eni_reverse_1.2.0_centos7.so", "http://45.77.171.204/eni_reverse_centos7.so"]}',
  md5:
    '{"ubuntu": "b440ff88be3fb2d47da4f5b34577d92477bb7f01b52d9d3a09557ea83c97a696211453ff75fb3446b1e99e1a520df2d6539b47bc5151f2689598ecbba23e906d", \
      "centos": "04ae4cd328bd550aae2c18f9fb2945ab849ec763a075f2d6e6010a676dba526082233722827d684a0de733c48b7faa2846094026657d42c3bf360a313c7b0851"}'
}
web3.cmt.governance.proposeDeployLibEni(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: {
        data: 'si5Q/kUx/MyP3u1WRhG3LncLlOPAuDGB3kC3RBPcu+s=',
        gasUsed": '2000000',
        fee: {
            key: 'R2FzRmVl',
            value: "4000000000000000'
        }
      },
      hash: '37C51D16BA062A69CD5921E45326E9ED47EF0D77',
      height: 102
    }
    */
  } else {
    console.log(err)
    /*
    {
      check_tx: { code: 20, log: 'Can not find fileurl for current os', fee: {} },
      deliver_tx: { fee: {} },
      hash: 'B02B62FFE66B4C04DF0E4161F934AF51C1312E31',
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

Vote on proposals of making changes to the system state. Here are some use cases:

- Vote to change system wide parameters such as the system inflation rate.
- Vote to accept new native libraries for ENI.
- Vote to recover funds for users.

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

### listProposals

```js
web3.cmt.governance.listProposals([callback])
```

Returns a list of all proposals.

#### Parameters

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Array` - An array of all proposals.

#### Example

```js
var info = web3.cmt.governance.listProposals()
console.log(JSON.stringify(info, null, 2))
/*
{ 
  "height": 58,
  "data": [
    {
      "Id": "/YRNInf2DpWJ6KBcS+Xqa+EUiBH3DMgeM2T57tsMd2E=",
      "Type": "transfer_fund",
      "Proposer": "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
      "BlockHeight": 15,
      "ExpireBlockHeight": 20,
      "CreatedAt": "2018-07-03T14:27:11Z",
      "Result": "Expired",
      "ResultMsg": "",
      "ResultBlockHeight": 20,
      "ResultAt": "2018-07-03T14:28:01Z",
      "Detail": {
        "amount": "16",
        "from": "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
        "reason": "",
        "to": "0xd5bb0351974eca5d116eff840a03a9b96d8ba9e7"
      }
    },
    {
      "Id": "DN6utTAmgX9Iy7naroaKgO2dEbIkwmwRPmmfk35cdEE=",
      "Type": "change_param",
      "Proposer": "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
      "BlockHeight": 16,
      "ExpireBlockHeight": 60496,
      "CreatedAt": "2018-07-03T14:27:21Z",
      "Result": "",
      "ResultMsg": "",
      "ResultBlockHeight": 0,
      "ResultAt": "",
      "Detail": {
        "name": "gas_price",
        "reason": "test",
        "value": "3000000000"
      }
    }
  ]
}
*/
```

---

### listParams

```js
web3.cmt.governance.getParams([height] [,callback])
```

Returns current settings of system parameters.

#### Parameters

- `height`: `Number` - (optional) The block number. Default to 0, means current head of the blockchain.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

#### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Array` - An array of all proposals.

#### Example

```js
var info = web3.cmt.governance.getParams()
console.log(JSON.stringify(info, null, 2))
/*
{
  "height": 174,
  "data": {
    "hold_account": "0xffffffffffffffffffffffffffffffffffffffff",
    "max_vals": 4,
    "self_staking_ratio": "0.1",
    "inflation_rate": 8,
    "stake_limit": "0.12",
    "unstake_wait_period": 60480,
    "proposal_expire_period": 60480,
    "declare_candidacy": 1000000,
    "update_candidacy": 1000000,
    "governance_proposal": 2000000,
    "gas_price": 2000000000
  }
}
*/
```

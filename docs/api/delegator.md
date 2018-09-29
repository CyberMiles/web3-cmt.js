# web3.cmt.stake.delegator

The `web3.cmt.stake.delegator` contains all delegator related functions.

---

## accept

```js
web3.cmt.stake.delegator.accept(delegateObject [, callback])
```

Used by a delegator to stake CMTs to a validator.

### Parameters

- `delegateObject`: `Object` - The delegate object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `validatorAddress`: `String` - The address of validator to delegate.
  - `amount`: `String` - Amount of CMTs in Wei to delegate.
  - `cubeBatch`: `String` - The batch number of the CMT cube. Use "01" for testing.
  - `sig`: `String` - `delegator_address|nonce` signed by the CMT cube. Check [this](#cube-signature) for how to generate a signature for testing.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed.

### Example

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

### Cube signature

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

## withdraw

```js
web3.cmt.stake.delegator.withdraw(withdrawObject [, callback])
```

Used by a delegator to unbind staked CMTs from a validator.

### Parameters

- `withdrawObject`: `Object` - The withdraw object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `validatorAddress`: `String` - The address of validator to withdraw.
  - `amount`: `String` - Amount of CMTs in Wei to withdraw.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed.

### Example

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

## query

```js
web3.cmt.stake.delegator.query(delegatorAddress [, height] [, callback])
```

Query the current stake status of a specific delegator.

### Parameters

- `delegatorAddress`: `String` - The delegator address.
- `height`: `Number` - (optional) The block number. Default to 0, means current head of the blockchain. NOT IMPLEMENTED YET.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Object` - The delegator object.

### Example

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
        "value": "Rbrzh5DAu53Q/IdP/IxxU9tVVni4kKnPJ1v1bL0TN0s="
      },
      "validator_address": "0x7eFf122b94897EA5b0E2A9abf47B86337FAfebdC",
      "delegate_amount": "1000000000000000000000000",
      "award_amount": "2591143760375906210530",
      "withdraw_amount": "0",
      "pending_withdraw_amount", "0",
      "slash_amount": "0",
      "comp_rate": "1/5",
      "voting_power": 7738,
      "created_at": "2018-09-25T08:39:03Z",
      "updated_at": "2018-09-25T10:42:07Z",
      "state": "Y",
      "block_height": 1,
      "average_staking_date": 0
    }
  ]
}
*/
```

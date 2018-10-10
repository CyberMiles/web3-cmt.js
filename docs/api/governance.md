# web3.cmt.governance

The `web3.cmt.governance` module allows validators to vote on changes to the system state.

---

## proposeRecoverFund

```js
web3.cmt.governance.proposeRecoverFund(recoverFundObject [, callback])
```

Propose a fund recovery proposal.

### Parameters

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

### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed. If successful, the `ProposalID` will be set in the `data` property, for validators to vote later.

### Example

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

## proposeChangeParam

```js
web3.cmt.governance.proposeChangeParam(changeParamObject [, callback])
```

Propose a system parameter change.

### Parameters

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

### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed. If successful, the `ProposalID` will be set in the `data` property, for validators to vote later.

### Example

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

## proposeDeployLibEni

```js
web3.cmt.governance.proposeDeployLibEni(deployLibEniObject [, callback])
```

Propose a new library for ENI.

### Parameters

- `deployLibEniObject`: `Object` - The new ENI library proposal object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified. Must be a validator.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `name`: `String` - The name of the library.
  - `version`: `String` - Version of the library, data format: vX.Y.Z, where X, Y, and Z are non-negative integers.
  - `fileUrl`: `String` - JSON string of key/value pairs. Key is the name of the OS(so far, only ubuntu and centos are supported), value is the URL array to retrieve the library file.
  - `md5`: `String` - JSON string of key/value pairs. Key is the name of the OS(so far, only ubuntu and centos are supported), value is the MD5 of the library file.
  - `reason`: `String` - (optional) Reason.
  - `deployBlockHeight`: `Number` - (optional) The block number where the new ENI library will deploy.
  - `deployTimestamp`: `Number` - (optional) Timestamp when the new ENI library will deploy.

  _Note: You can specify deploy block height **or** timestamp, but not both. If none is specified, a default of 7 days, as measured in block height(`7 * 24 * 60 * 60 / 10`), will be used._

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed. If successful, the `ProposalID` will be set in the `data` property, for validators to vote later.

### Example

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

## proposeRetireProgram

```js
web3.cmt.governance.proposeRetireProgram(retireProgramObject [, callback])
```

Propose to retire the program.

### Parameters

- `retireProgramObject`: `Object` - The program retire proposal object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified. Must be a validator.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `preservedValidators`: `String` - A comma seperated validator public key list. Valiators in this list will be preserved, other validators will be deactivated.
  - `reason`: `String` - (optional) Reason.
  - `retiredBlockHeight`: `Number` - (optional) The block number where the program will retire. If not specified, a default of 7 days, as measured in block height(`7 * 24 * 60 * 60 / 10`), will be used.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed. If successful, the `ProposalID` will be set in the `data` property, for validators to vote later.

### Example

```js
var payload = {
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  preservedValidators:
    "Esdo0ZN+nHduoi/kNqjdQSNFmNyv2M3Tie/eZeC25gM=,X6qJkoWxW8YkEHquJQM7mZcfpt5r+l8V6C8rbg8dEHQ=",
  reason: "system upgrade"
}
web3.cmt.governance.proposeRetireProgram(payload, (err, res) => {
  if (!err) {
    console.log(res)
    /*
    {
      check_tx: { fee: {} },
      deliver_tx: {
        data: "SoAy6sskKMSHRyx5o8oa5WQ2pzHelMm+USTedSO5qrU=",
        gasUsed: "2000000",
        fee: { key: "R2FzRmVl", value: "4000000000000000" }
      },
      hash: "66C1E4CF36C915C5A4B940ED746819F112BBDDFC",
      height: 33
    }
    */
  } else {
    console.log(err)
    /*
    {
      check_tx: {
        code: 20,
        log: "Found unresolved or approved retiring proposal",
        fee: {}
      },
      deliver_tx: { fee: {} },
      hash: "CB21F18B1BE7A97F69EA95100E2294D978C74497",
      height: 0
    }
    */
  }
})
```

---

## proposeUpgradeProgram

```js
web3.cmt.governance.proposeUpgradeProgram(upgradeProgramObject [, callback])
```

Propose to upgrade the program. NOT IMPLEMENTED YET.

### Parameters

- `upgradeProgramObject`: `Object` - The program upgrade proposal object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified. Must be a validator.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `name`: `String` - The name of the program.
  - `version`: `String` - Version of the program, data format: vX.Y.Z, where X, Y, and Z are non-negative integers.
  - `fileUrl`: `String` - JSON string of key/value pairs. Key is the name of the OS(so far, only ubuntu and centos are supported), value is the URL array to retrieve the program file.
  - `md5`: `String` - JSON string of key/value pairs. Key is the name of the OS(so far, only ubuntu and centos are supported), value is the MD5 of the file.
  - `reason`: `String` - (optional) Reason.
  - `upgradeBlockHeight`: `Number` - (optional) The block number where the new program will deploy. If not specified, a default of 7 days, as measured in block height(`7 * 24 * 60 * 60 / 10`), will be used.

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

### Returns

- `Object` - Result object.

  - `height`: `Number` - The block number where the transaction is in. =0 if failed.
  - `hash`: `String` - Hash of the transaction.
  - `check_tx`: `Object` - CheckTx result. Contains error code and log if failed.
  - `deliver_tx`: `Object` - DeliverTx result. Contains error code and log if failed. If successful, the `ProposalID` will be set in the `data` property, for validators to vote later.

### Example

```js
var payload = {
  from: "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc",
  name: "travis",
  version: "v1.0.0"
  ...
}
web3.cmt.governance.proposeUpgradeProgram(payload, (err, res) => {
  if (!err) {
    console.log(res)
  } else {
    console.log(err)
  }
})
```

---

## vote

```js
web3.cmt.governance.vote(voteObject [, callback])
```

Vote on proposals of making changes to the system state. Here are some use cases:

- Vote to change system wide parameters such as the system inflation rate.
- Vote to accept new native libraries for ENI.
- Vote to recover funds for users.

### Parameters

- `voteObject`: `Object` - The vote object.

  - `from`: `String` - The address for the sending account. Uses the `web3.cmt.defaultAccount` property, if not specified. Must be a validator.
  - `nonce`: `Number` - (optional) The number of transactions made by the sender prior to this one.
  - `proposalId`: `String` - The Proposal ID to vote.
  - `answer`: `String` - Y or N.

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
      deliver_tx: { fee: {} },
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

## listProposals

```js
web3.cmt.governance.listProposals([callback])
```

Returns a list of all proposals.

### Parameters

- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Array` - An array of all proposals.

### Example

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

## getParams

```js
web3.cmt.governance.getParams([height] [,callback])
```

Returns current settings of system parameters.

### Parameters

- `height`: `Number` - (optional) The block number. Default to 0, means current head of the blockchain.
- `callback`: `Function` - (optional) If you pass a callback the HTTP request is made asynchronous. See [this note](https://github.com/ethereum/wiki/wiki/JavaScript-API#using-callbacks) for details.

### Returns

- `Object` - Result object.

  - `height`: `Number` - Current block number or the block number if specified.
  - `data`: `Array` - An array of all proposals.

### Example

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

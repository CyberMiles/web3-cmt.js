var Eth = require("web3/lib/web3/methods/eth")
var Method = require("web3/lib/web3/method")
var Property = require("web3/lib/web3/property")
var utils = require("web3/lib/utils/utils")
var formatters = require("../formatters")
var Stake = require("./stake.js")
var Governance = require("./governance.js")

// inherit and extend Eth
var Cmt = function(web3) {
  // make override properties configurable
  var _defineProperty = Object.defineProperty
  Object.defineProperty = function(obj, prop, descriptor) {
    if (obj instanceof Cmt && props.indexOf(prop) > -1) {
      descriptor.configurable = true
    }
    return _defineProperty(obj, prop, descriptor)
  }
  // call Eth constructor
  Eth.call(this, web3)
  // restore the original defineProperty
  Object.defineProperty = _defineProperty

  var self = this
  methods().forEach(function(method) {
    method.attachToObject(self)
    method.setRequestManager(self._requestManager)
  })

  properties().forEach(function(p) {
    p.attachToObject(self)
    p.setRequestManager(self._requestManager)
  })

  // eth.isSyncing is not supported
  delete this.isSyncing

  this.stake = new Stake(this)
  this.governance = new Governance(this)
}

Cmt.prototype = Object.create(Eth.prototype)
Cmt.prototype.constructor = Cmt

var methods = function() {
  var sendRawTx = new Method({
    name: "sendRawTx",
    call: "cmt_sendRawTx",
    params: 1,
    inputFormatter: [null]
  })
  var sendTransaction = new Method({
    name: "sendTransaction",
    call: "eth_sendTransaction",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var sendTx = new Method({
    name: "sendTx",
    call: "eth_sendTx",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var sendRawTransaction = new Method({
    name: "sendRawTransaction",
    call: "eth_sendRawTransaction",
    params: 1,
    inputFormatter: [null]
  })
  var getTransactionCount = new Method({
    name: "getTransactionCount",
    call: "eth_getTransactionCount",
    params: 2,
    inputFormatter: [null, formatters.inputDefaultBlockNumberFormatter],
    outputFormatter: utils.toDecimal
  })

  var getCmtBlock = new Method({
    name: "getCmtBlock",
    call: "cmt_getBlockByNumber",
    params: 2,
    inputFormatter: [
      null,
      function(val) {
        return !!val
      }
    ],
    outputFormatter: formatters.outputBlockFormatter
  })
  var getCmtTransaction = new Method({
    name: "getCmtTransaction",
    call: "cmt_getTransactionByHash",
    params: 1,
    outputFormatter: formatters.outputTransactionFormatter
  })
  var getCmtTransactionFromBlock = new Method({
    name: "getCmtTransactionFromBlock",
    call: "cmt_getTransactionFromBlock",
    params: 2,
    outputFormatter: formatters.outputTransactionFormatter
  })
  var decodeRawTxs = new Method({
    name: "decodeRawTxs",
    call: "cmt_decodeRawTxs",
    params: 1
  })
  var getPendingTransactions = new Method({
    name: "getPendingTransactions",
    call: "cmt_getPendingTransactions",
    params: 1,
    inputFormatter: [
      function(val) {
        return val || 0
      }
    ],
    outputFormatter: formatters.outputTransactionsFormatter
  })

  return [
    sendRawTx,
    sendTransaction,
    sendTx,
    sendRawTransaction,
    getCmtBlock,
    getCmtTransaction,
    getCmtTransactionFromBlock,
    decodeRawTxs,
    getTransactionCount,
    getPendingTransactions
  ]
}

var properties = function() {
  return [
    new Property({
      name: "syncing",
      getter: "cmt_syncing"
    }),
    new Property({
      name: "pendingTransactionCount",
      getter: "cmt_pendingTransactionCount",
      outputFormatter: utils.toDecimal
    })
  ]
}

// make override properties configurable
var props = properties().map(function(p) {
  return p.name
})

module.exports = Cmt

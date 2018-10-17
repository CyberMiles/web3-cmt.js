var Eth = require("web3/lib/web3/methods/eth")
var Method = require("web3/lib/web3/method")
var Property = require("web3/lib/web3/property")
var utils = require("web3/lib/utils/utils")
var formatters = require("../formatters")
var Stake = require("./stake.js")
var Governance = require("./governance.js")

// inherit and extend Eth
var Cmt = function(web3) {
  Eth.call(this, web3)

  var self = this
  methods().forEach(function(method) {
    method.attachToObject(self)
    method.setRequestManager(self._requestManager)
  })

  properties().forEach(function(p) {
    p.attachToObject(self)
    p.setRequestManager(self._requestManager)
  })

  // isSyncing/getSyncing are not supported
  delete this.isSyncing
  delete this.getSyncing

  // restore the original defineProperty
  Object.defineProperty = _defineProperty

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

  var getCmtBlock = new Method({
    name: "getCmtBlock",
    call: "cmt_getBlockByNumber",
    params: 1
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

  return [
    sendRawTx,
    sendTransaction,
    sendTx,
    sendRawTransaction,
    getCmtBlock,
    getCmtTransaction,
    getCmtTransactionFromBlock,
    decodeRawTxs
  ]
}

var properties = function() {
  return [
    new Property({
      name: "syncing",
      getter: "cmt_syncing"
    })
  ]
}

// make override properties configurable
var _defineProperty = Object.defineProperty
var props = properties().map(function(p) {
  return p.name
})
Object.defineProperty = function(obj, prop, descriptor) {
  if (obj instanceof Cmt && props.indexOf(prop) > -1) {
    descriptor.configurable = true
  }
  return _defineProperty(obj, prop, descriptor)
}

module.exports = Cmt

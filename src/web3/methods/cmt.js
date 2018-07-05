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

  // isSyncing is not supported
  this.isSyncing = undefined

  // restore the original defineProperty
  Object.defineProperty = _defineProperty

  this.stake = new Stake(this)
  this.governance = new Governance(this)
}

Cmt.prototype = Object.create(Eth.prototype)
Cmt.prototype.constructor = Cmt

var methods = function() {
  var sendTx = new Method({
    name: "sendTx",
    call: "cmt_sendTx",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var sendRawTx = new Method({
    name: "sendRawTx",
    call: "cmt_sendRawTx",
    params: 1,
    inputFormatter: [null]
  })
  var sendTransaction = new Method({
    name: "sendTransaction",
    call: "cmt_sendTransaction",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var sendRawTransaction = new Method({
    name: "sendRawTransaction",
    call: "cmt_sendRawTransaction",
    params: 1,
    inputFormatter: [null]
  })

  var getBlock = new Method({
    name: "getBlock",
    call: "cmt_getBlockByNumber",
    params: 1
  })

  var getTransaction = new Method({
    name: "getTransaction",
    call: "cmt_getTransactionByHash",
    params: 1
  })

  var getTransactionFromBlock = new Method({
    name: "getTransactionFromBlock",
    call: "cmt_getTransactionFromBlock",
    params: 2
  })

  return [sendTx, sendRawTx, sendTransaction, sendRawTransaction]
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
  if (obj instanceof Cmt && props.includes(prop)) {
    descriptor.configurable = true
  }
  return _defineProperty(obj, prop, descriptor)
}

module.exports = Cmt

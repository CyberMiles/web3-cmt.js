var utils = require("web3/lib/utils/utils")
var Property = require("web3/lib/web3/property")
var Method = require("web3/lib/web3/method")
var formatters = require("../formatters")

var Stake = function(web3) {
  this._requestManager = web3._requestManager

  var self = this
  methods().forEach(function(method) {
    method.attachToObject(self)
    method.setRequestManager(self._requestManager)
  })

  properties().forEach(function(p) {
    p.attachToObject(self)
    p.setRequestManager(self._requestManager)
  })
}

var methods = function() {
  var declareCandidacy = new Method({
    name: "declareCandidacy",
    call: "cmt_declareCandidacy",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var withdrawCandidacy = new Method({
    name: "withdrawCandidacy",
    call: "cmt_withdrawCandidacy",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var editCandidacy = new Method({
    name: "editCandidacy",
    call: "cmt_editCandidacy",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var proposeSlot = new Method({
    name: "proposeSlot",
    call: "cmt_proposeSlot",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var acceptSlot = new Method({
    name: "acceptSlot",
    call: "cmt_acceptSlot",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var withdrawSlot = new Method({
    name: "withdrawSlot",
    call: "cmt_withdrawSlot",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var cancelSlot = new Method({
    name: "cancelSlot",
    call: "cmt_cancelSlot",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var queryValidators = new Method({
    name: "queryValidators",
    call: "cmt_queryValidators",
    params: 1,
    inputFormatter: [formatters.inputDefaultHeightFormatter]
  })
  var queryValidator = new Method({
    name: "queryValidator",
    call: "cmt_queryValidtor",
    params: 2,
    inputFormatter: [
      formatters.inputAddressFormatter,
      formatters.inputDefaultHeightFormatter
    ]
  })
  var querySlots = new Method({
    name: "querySlots",
    call: "cmt_querySlots",
    params: 1,
    inputFormatter: [formatters.inputDefaultHeightFormatter]
  })
  var querySlot = new Method({
    name: "querySlot",
    call: "cmt_querySlot",
    params: 2,
    inputFormatter: [null, formatters.inputDefaultHeightFormatter]
  })
  var queryDelegators = new Method({
    name: "queryDelegator",
    call: "cmt_queryDelegator",
    params: 2,
    inputFormatter: [
      formatters.inputAddressFormatter,
      formatters.inputDefaultHeightFormatter
    ]
  })
  return [
    declareCandidacy,
    withdrawCandidacy,
    editCandidacy,
    proposeSlot,
    acceptSlot,
    withdrawSlot,
    cancelSlot,
    queryValidators,
    queryValidator,
    querySlots,
    querySlot,
    queryDelegators
  ]
}

var properties = function() {
  return []
}

module.exports = Stake

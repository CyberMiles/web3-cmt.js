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
  var getSequence = new Method({
    name: "getSequence",
    call: "stake_getSequence",
    params: 1,
    outputFormatter: utils.toDecimal
  })
  var declareCandidacy = new Method({
    name: "declareCandidacy",
    call: "stake_declareCandidacy",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var withdrawCandidacy = new Method({
    name: "withdrawCandidacy",
    call: "stake_withdrawCandidacy",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var editCandidacy = new Method({
    name: "editCandidacy",
    call: "stake_editCandidacy",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var proposeSlot = new Method({
    name: "proposeSlot",
    call: "stake_proposeSlot",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var acceptSlot = new Method({
    name: "acceptSlot",
    call: "stake_acceptSlot",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var withdrawSlot = new Method({
    name: "withdrawSlot",
    call: "stake_withdrawSlot",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var cancelSlot = new Method({
    name: "cancelSlot",
    call: "stake_cancelSlot",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var queryValidators = new Method({
    name: "queryValidators",
    call: "stake_queryValidators",
    params: 1,
    inputFormatter: [formatters.inputDefaultHeightFormatter]
  })
  var queryValidator = new Method({
    name: "queryValidator",
    call: "stake_queryValidtor",
    params: 2,
    inputFormatter: [
      formatters.inputAddressFormatter,
      formatters.inputDefaultHeightFormatter
    ]
  })
  var querySlots = new Method({
    name: "querySlots",
    call: "stake_querySlots",
    params: 1,
    inputFormatter: [formatters.inputDefaultHeightFormatter]
  })
  var querySlot = new Method({
    name: "querySlot",
    call: "stake_querySlot",
    params: 2,
    inputFormatter: [null, formatters.inputDefaultHeightFormatter]
  })
  var queryDelegators = new Method({
    name: "queryDelegator",
    call: "stake_queryDelegator",
    params: 2,
    inputFormatter: [
      formatters.inputAddressFormatter,
      formatters.inputDefaultHeightFormatter
    ]
  })
  return [
    getSequence,
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

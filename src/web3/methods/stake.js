var utils = require("web3/lib/utils/utils")
var Property = require("web3/lib/web3/property")
var Method = require("web3/lib/web3/method")
var formatters = require("../formatters")

/**
 * @namespace web3.stake
 */

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
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var withdrawCandidacy = new Method({
    name: "withdrawCandidacy",
    call: "cmt_withdrawCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var updateCandidacy = new Method({
    name: "updateCandidacy",
    call: "cmt_updateCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var verifyCandidacy = new Method({
    name: "verifyCandidacy",
    call: "cmt_verifyCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var activateCandidacy = new Method({
    name: "activateCandidacy",
    call: "cmt_activateCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var delegate = new Method({
    name: "delegate",
    call: "cmt_delegate",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var withdraw = new Method({
    name: "withdraw",
    call: "cmt_withdraw",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var queryValidators = new Method({
    name: "queryValidators",
    call: "cmt_queryValidators",
    params: 1,
    inputFormatter: [formatters.inputDefaultHeightFormatter]
  })
  var queryValidator = new Method({
    name: "queryValidator",
    call: "cmt_queryValidator",
    params: 2,
    inputFormatter: [
      formatters.inputAddressFormatter,
      formatters.inputDefaultHeightFormatter
    ]
  })
  var queryDelegator = new Method({
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
    updateCandidacy,
    verifyCandidacy,
    activateCandidacy,
    delegate,
    withdraw,
    queryValidators,
    queryValidator,
    queryDelegator
  ]
}

var properties = function() {
  return []
}

module.exports = Stake

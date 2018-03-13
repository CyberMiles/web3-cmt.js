const utils = require("web3/lib/utils/utils")
const Property = require("web3/lib/web3/property")
const Method = require("web3/lib/web3/method")
const formatters = require("../formatters")

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
    call: "stake_declareCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var bind = new Method({
    name: "bind",
    call: "stake_delegate",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var unbind = new Method({
    name: "unbind",
    call: "stake_unbond",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var getCandidates = new Method({
    name: "getCandidates",
    call: "stake_queryCandidates",
    params: 1,
    inputFormatter: [formatters.inputDefaultHeightFormatter]
  })
  var getValidators = new Method({
    name: "getValidators",
    call: "stake_queryValidators",
    params: 1,
    inputFormatter: [null]
  })
  var getCandidate = new Method({
    name: "getCandidate",
    call: "stake_queryCandidate",
    params: 2,
    inputFormatter: [null, formatters.inputDefaultHeightFormatter]
  })
  var getDelegatorBind = new Method({
    name: "getDelegatorBind",
    call: "stake_queryDelegatorBond",
    params: 3,
    inputFormatter: [
      formatters.inputAddressFormatter,
      null,
      formatters.inputDefaultHeightFormatter
    ]
  })
  var getDelegatorCandidates = new Method({
    name: "getDelegatorCandidates",
    call: "stake_queryDelegatorCandidates",
    params: 2,
    inputFormatter: [
      formatters.inputAddressFormatter,
      formatters.inputDefaultHeightFormatter
    ]
  })
  return [
    declareCandidacy,
    bind,
    unbind,
    getCandidates,
    getValidators,
    getCandidate,
    getDelegatorBind,
    getDelegatorCandidates
  ]
}

var properties = function() {
  return []
}

module.exports = Stake

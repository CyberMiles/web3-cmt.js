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
    name: "declare",
    call: "stake_declareCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var withdrawCandidacy = new Method({
    name: "withdraw",
    call: "stake_withdrawCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var proposeSlot = new Method({
    name: "proposeSlot",
    call: "stake_proposeSlot",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var acceptSlot = new Method({
    name: "acceptSlot",
    call: "stake_acceptSlot",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var withdrawSlot = new Method({
    name: "withdrawSlot",
    call: "stake_withdrawSlot",
    params: 1,
    inputFormatter: [formatters.inputDefaultHeightFormatter]
  })
  var cancelSlot = new Method({
    name: "cancelSlot",
    call: "stake_cancelSlot",
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
    withdrawCandidacy,
    proposeSlot,
    acceptSlot,
    withdrawSlot,
    cancelSlot
  ]
}

var properties = function() {
  return []
}

module.exports = Stake

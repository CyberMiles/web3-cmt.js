var utils = require("web3/lib/utils/utils")
var Property = require("web3/lib/web3/property")
var Method = require("web3/lib/web3/method")
var formatters = require("../formatters")

var Validator = function(web3) {
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
  var declare = new Method({
    name: "declare",
    call: "cmt_declareCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var withdraw = new Method({
    name: "withdraw",
    call: "cmt_withdrawCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var update = new Method({
    name: "update",
    call: "cmt_updateCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var verify = new Method({
    name: "verify",
    call: "cmt_verifyCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var activate = new Method({
    name: "activate",
    call: "cmt_activateCandidacy",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var updateAccount = new Method({
    name: "updateAccount",
    call: "cmt_updateCandidacyAccount",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var acceptAccountUpdate = new Method({
    name: "acceptAccountUpdate",
    call: "cmt_acceptCandidacyAccountUpdate",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var setCompRate = new Method({
    name: "setCompRate",
    call: "cmt_setCompRate",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })

  var list = new Method({
    name: "list",
    call: "cmt_queryValidators",
    params: 1,
    inputFormatter: [formatters.inputDefaultHeightFormatter]
  })
  var query = new Method({
    name: "query",
    call: "cmt_queryValidator",
    params: 2,
    inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultHeightFormatter]
  })
  var queryAwardInfos = new Method({
    name: "queryAwardInfos",
    call: "cmt_queryAwardInfos",
    params: 1,
    inputFormatter: [formatters.inputDefaultHeightFormatter]
  })

  return [
    declare,
    withdraw,
    update,
    verify,
    activate,
    setCompRate,
    updateAccount,
    acceptAccountUpdate,
    list,
    query,
    queryAwardInfos
  ]
}

var properties = function() {
  return []
}

module.exports = Validator

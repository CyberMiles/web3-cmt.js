const utils = require("web3/lib/utils/utils")
const Property = require("web3/lib/web3/property")
const Method = require("web3/lib/web3/method")
const formatters = require("./formatters")

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
  var delegate = new Method({
    name: "delegate",
    call: "stake_delegate",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var unbond = new Method({
    name: "unbond",
    call: "stake_bond",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  return [declareCandidacy, delegate, unbond]
}

var properties = function() {
  return []
}

module.exports = Stake

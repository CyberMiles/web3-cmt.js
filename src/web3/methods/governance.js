var utils = require("web3/lib/utils/utils")
var Property = require("web3/lib/web3/property")
var Method = require("web3/lib/web3/method")
var formatters = require("../formatters")

/**
 * @namespace web3.governance
 */

var Governance = function(web3) {
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
  var proposeRecoverFund = new Method({
    name: "proposeRecoverFund",
    call: "cmt_proposeTransferFund",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var proposeChangeParam = new Method({
    name: "proposeChangeParam",
    call: "cmt_proposeChangeParam",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var proposeDeployLibEni = new Method({
    name: "proposeDeployLibEni",
    call: "cmt_proposeDeployLibEni",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var vote = new Method({
    name: "vote",
    call: "cmt_vote",
    params: 1,
    inputFormatter: [formatters.inputStakeTxFormatter]
  })
  var listProposals = new Method({
    name: "listProposals",
    call: "cmt_queryProposals",
    params: 0
  })
  var getParams = new Method({
    name: "getParams",
    call: "cmt_queryParams",
    params: 0
  })

  return [
    proposeRecoverFund,
    proposeChangeParam,
    proposeDeployLibEni,
    vote,
    listProposals,
    getParams
  ]
}

var properties = function() {
  return []
}

module.exports = Governance

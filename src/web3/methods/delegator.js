var utils = require("web3/lib/utils/utils")
var Property = require("web3/lib/web3/property")
var Method = require("web3/lib/web3/method")
var formatters = require("../formatters")

var Delegator = function(web3) {
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
  var accept = new Method({
    name: "accept",
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

  var query = new Method({
    name: "query",
    call: "cmt_queryDelegator",
    params: 2,
    inputFormatter: [
      formatters.inputAddressFormatter,
      formatters.inputDefaultHeightFormatter
    ]
  })
  return [accept, withdraw, query]
}

var properties = function() {
  return []
}

module.exports = Delegator

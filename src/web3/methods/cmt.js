var Eth = require("web3/lib/web3/methods/eth")
var Method = require("web3/lib/web3/method")
var utils = require("web3/lib/utils/utils")
var formatters = require("../formatters")

/**
 * @namespace cmt
 * @memberOf web3
 */

// inherit and extend Eth
var Cmt = function(web3) {
  Eth.call(this, web3)

  var self = this
  methods().forEach(function(method) {
    method.attachToObject(self)
    method.setRequestManager(self._requestManager)
  })
}

Cmt.prototype = Object.create(Eth.prototype)
Cmt.prototype.constructor = Cmt

var methods = function() {
  var getSequence = new Method({
    name: "getSequence",
    call: "cmt_getSequence",
    params: 1,
    outputFormatter: utils.toDecimal
  })

  var getBlock = new Method({
    name: "getBlock",
    call: "cmt_getBlock",
    params: 1
  })

  var getTransaction = new Method({
    name: "getTransaction",
    call: "cmt_getTransaction",
    params: 1
  })

  var getTransactionFromBlock = new Method({
    name: "getTransactionFromBlock",
    call: "cmt_getTransactionFromBlock",
    params: 2
  })

  return [getSequence]
}

module.exports = Cmt

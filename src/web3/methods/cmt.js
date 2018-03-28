const Eth = require("web3/lib/web3/methods/eth")
const Method = require("web3/lib/web3/method")
const formatters = require("../formatters")

// inherit and extend Eth
const Cmt = function(web3) {
  Eth.call(this, web3)

  this.testFunc = function() {
    console.log("run testFunc")
  }

  let self = this
  methods().forEach(function(method) {
    method.attachToObject(self)
    method.setRequestManager(self._requestManager)
  })
}

Cmt.prototype = Object.create(Eth.prototype)
Cmt.prototype.constructor = Cmt

let methods = function() {
  let getBlock = new Method({
    name: "getBlock",
    call: "cmt_getBlock",
    params: 1
  })

  let getTransaction = new Method({
    name: "getTransaction",
    call: "cmt_getTransaction",
    params: 1
  })

  let getTransactionFromBlock = new Method({
    name: "getTransactionFromBlock",
    call: "cmt_getTransactionFromBlock",
    params: 2
  })

  return [getBlock, getTransaction, getTransactionFromBlock]
}

module.exports = Cmt

const Eth = require("web3/lib/web3/methods/eth")

// inherit and extend Eth
const Cmt = function(web3) {
  Eth.call(this, web3)

  this.testFunc = function() {
    console.log("run testFunc")
  }
}

Cmt.prototype = Object.create(Eth.prototype)
Cmt.prototype.constructor = Cmt

module.exports = Cmt

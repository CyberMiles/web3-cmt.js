const Web3 = require("web3")
const version = require("./version.json")
const Cmt = require("./web3/methods/cmt.js")
const Stake = require("./web3/methods/stake.js")

const MyWeb3 = function(provider) {
  Web3.call(this, provider)

  this.cmt = new Cmt(this)
  this.cmt.version = version.version

  this.stake = new Stake(this)
  delete this.eth
}

MyWeb3.providers = Web3.providers

MyWeb3.prototype = Object.create(Web3.prototype)
MyWeb3.prototype.constructor = MyWeb3

module.exports = MyWeb3

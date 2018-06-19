var Web3 = require("web3")

var version = require("./version.json")
var Cmt = require("./methods/cmt.js")
var Net = require("./methods/net.js")
var HttpProvider = require("./httpprovider")
var utils = require("./utils")

var MyWeb3 = function(provider) {
  Web3.call(this, provider)

  this.cmt = new Cmt(this)
  this.cmt.version = version.version

  this.net = new Net(this)

  delete this.eth
}

MyWeb3.providers = Web3.providers
MyWeb3.providers.HttpProvider = HttpProvider

MyWeb3.prototype = Object.create(Web3.prototype)
MyWeb3.prototype.constructor = MyWeb3

MyWeb3.prototype.toWei = utils.toWei
MyWeb3.prototype.fromWei = utils.fromWei

module.exports = MyWeb3

var Net = require("web3/lib/web3/methods/net")
var Property = require("web3/lib/web3/property")
var utils = require("web3/lib/utils/utils")
var formatters = require("../formatters")

// inherit and extend Net
var MyNet = function(web3) {
  Net.call(this, web3)

  var self = this

  properties().forEach(function(p) {
    p.attachToObject(self)
    p.setRequestManager(web3._requestManager)
  })
}

MyNet.prototype = Object.create(Net.prototype)
MyNet.prototype.constructor = Net

var properties = function() {
  return [
    new Property({
      name: "id",
      getter: "net_version",
      outputFormatter: utils.toDecimal
    })
  ]
}

module.exports = MyNet

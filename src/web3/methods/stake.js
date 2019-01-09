var Validator = require("./validator.js")
var Delegator = require("./delegator.js")

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

  this.validator = new Validator(this)
  this.delegator = new Delegator(this)
}

var methods = function() {
  return []
}

var properties = function() {
  return []
}

module.exports = Stake

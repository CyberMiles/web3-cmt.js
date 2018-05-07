var utils = require("web3/lib/utils/utils")
var Property = require("web3/lib/web3/property")
var Method = require("web3/lib/web3/method")
var formatters = require("../formatters")

/**
 * @namespace web3.stake
 */

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

/**
 * @typedef {Object} CmtTxReturn
 * @memberof web3.stake
 * @property {Object} result The result object
 */

var methods = function() {
  /**
   * Allows a potential validator to declare its candidacy
   * @method
   * @memberof web3.stake
   * @instance
   * @param declareObject {Object} The declare candidacy object to send.
   * @param declareObject.from {String} The address for the sending account. Uses the web3.cmt.defaultAccount property, if not specified.
   * @param declareObject.pubKey {String} The validator node public key.
   * @return {web3.stake.CmtTxReturn} A return object
   * @example
   * var myAccount = "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc"
   * var pubKey = "3CD6F72704EC4ABEA701D17F3C44893937C3FEDCC934B9EF26B26D58F611D578"
   * var r = web3.stake.declareCandidacy({from: myAccount, pubKey: pubKey})
   * console.log(r)
   */
  var declareCandidacy = new Method({
    name: "declareCandidacy",
    call: "cmt_declareCandidacy",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var withdrawCandidacy = new Method({
    name: "withdrawCandidacy",
    call: "cmt_withdrawCandidacy",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var updateCandidacy = new Method({
    name: "updateCandidacy",
    call: "cmt_updateCandidacy",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var verifyCandidacy = new Method({
    name: "verifyCandidacy",
    call: "cmt_verifyCandidacy",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var delegate = new Method({
    name: "delegate",
    call: "cmt_delegate",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var withdraw = new Method({
    name: "withdraw",
    call: "cmt_withdraw",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var queryValidators = new Method({
    name: "queryValidators",
    call: "cmt_queryValidators",
    params: 1,
    inputFormatter: [formatters.inputDefaultHeightFormatter]
  })
  var queryValidator = new Method({
    name: "queryValidator",
    call: "cmt_queryValidator",
    params: 2,
    inputFormatter: [
      formatters.inputAddressFormatter,
      formatters.inputDefaultHeightFormatter
    ]
  })
  var queryDelegator = new Method({
    name: "queryDelegator",
    call: "cmt_queryDelegator",
    params: 2,
    inputFormatter: [
      formatters.inputAddressFormatter,
      formatters.inputDefaultHeightFormatter
    ]
  })
  return [
    declareCandidacy,
    withdrawCandidacy,
    updateCandidacy,
    verifyCandidacy,
    delegate,
    withdraw,
    queryValidators,
    queryValidator,
    queryDelegator
  ]
}

var properties = function() {
  return []
}

module.exports = Stake

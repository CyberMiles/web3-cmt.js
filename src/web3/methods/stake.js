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
  var editCandidacy = new Method({
    name: "editCandidacy",
    call: "cmt_editCandidacy",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var proposeSlot = new Method({
    name: "proposeSlot",
    call: "cmt_proposeSlot",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var acceptSlot = new Method({
    name: "acceptSlot",
    call: "cmt_acceptSlot",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var withdrawSlot = new Method({
    name: "withdrawSlot",
    call: "cmt_withdrawSlot",
    params: 1,
    inputFormatter: [formatters.inputTransactionFormatter]
  })
  var cancelSlot = new Method({
    name: "cancelSlot",
    call: "cmt_cancelSlot",
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
    call: "cmt_queryValidtor",
    params: 2,
    inputFormatter: [
      formatters.inputAddressFormatter,
      formatters.inputDefaultHeightFormatter
    ]
  })
  var querySlots = new Method({
    name: "querySlots",
    call: "cmt_querySlots",
    params: 1,
    inputFormatter: [formatters.inputDefaultHeightFormatter]
  })
  var querySlot = new Method({
    name: "querySlot",
    call: "cmt_querySlot",
    params: 2,
    inputFormatter: [null, formatters.inputDefaultHeightFormatter]
  })
  var queryDelegators = new Method({
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
    editCandidacy,
    proposeSlot,
    acceptSlot,
    withdrawSlot,
    cancelSlot,
    queryValidators,
    queryValidator,
    querySlots,
    querySlot,
    queryDelegators
  ]
}

var properties = function() {
  return []
}

module.exports = Stake

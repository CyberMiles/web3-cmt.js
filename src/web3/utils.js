var BigNumber = require("bignumber.js")
var utils = require("web3/lib/utils/utils")

/**
 * @namespace web3
 */

// override web3.fromWei/toWei, add cmt units
var unitMap = {
  noether: "0",
  wei: "1",
  kwei: "1000",
  Kwei: "1000",
  babbage: "1000",
  femtoether: "1000",
  mwei: "1000000",
  Mwei: "1000000",
  lovelace: "1000000",
  picoether: "1000000",
  gwei: "1000000000",
  Gwei: "1000000000",
  shannon: "1000000000",
  nanoether: "1000000000",
  nano: "1000000000",
  szabo: "1000000000000",
  microether: "1000000000000",
  micro: "1000000000000",
  finney: "1000000000000000",
  milliether: "1000000000000000",
  milli: "1000000000000000",
  ether: "1000000000000000000",
  kether: "1000000000000000000000",
  grand: "1000000000000000000000",
  mether: "1000000000000000000000000",
  gether: "1000000000000000000000000000",
  tether: "1000000000000000000000000000000",
  cmt: "1000000000000000000",
  kcmt: "1000000000000000000000",
  mcmt: "1000000000000000000000000",
  gcmt: "1000000000000000000000000000",
  tcmt: "1000000000000000000000000000000"
}

var getValueOfUnit = function(unit) {
  unit = unit ? unit.toLowerCase() : "cmt"
  var unitValue = unitMap[unit]
  if (unitValue === undefined) {
    throw new Error(
      "This unit doesn't exists, please use the one of the following units" +
        JSON.stringify(unitMap, null, 2)
    )
  }
  return new BigNumber(unitValue, 10)
}

/**
 * Converts a number of wei into ethereum or cmt units.
 *
 * Possible units besides common ethereum units are:
 * <ul>
 *  <li>cmt</li>
 *  <li>kcmt</li>
 *  <li>mcmt</li>
 *  <li>gcmt</li>
 *  <li>tcmt</li>
 * </ul>
 * @method
 * @memberof web3
 * @instance
 * @param {Number|String|BigNumber} number A number or BigNumber instance.
 * @param {String} unit One of the above units or common ethereum units.
 * @return {String|BigNumber} Either a number string, or a BigNumber instance, depending on the given number parameter.
 * @example
 * var value = web3.fromWei("21000000000000", "cmt")
 * console.log(value) // "0.000021"
 */
var fromWei = function(number, unit) {
  var returnValue = utils.toBigNumber(number).dividedBy(getValueOfUnit(unit))

  return utils.isBigNumber(number) ? returnValue : returnValue.toString(10)
}

/**
 * Converts an ethereum or cmt unit into wei.
 *
 * Possible units besides common ethereum units are:
 * <ul>
 *  <li>cmt</li>
 *  <li>kcmt</li>
 *  <li>mcmt</li>
 *  <li>gcmt</li>
 *  <li>tcmt</li>
 * </ul>
 * @method
 * @memberof web3
 * @instance
 * @param {Number|String|BigNumber} number A number or BigNumber instance.
 * @param {String} unit One of the above units or common ethereum units.
 * @return {String|BigNumber} Either a number string, or a BigNumber instance, depending on the given number parameter.
 * @example
 * var value = web3.toWei("1", "cmt")
 * console.log(value) // "1000000000000000000"
 */
var toWei = function(number, unit) {
  var returnValue = utils.toBigNumber(number).times(getValueOfUnit(unit))

  return utils.isBigNumber(number) ? returnValue : returnValue.toString(10)
}

module.exports = {
  fromWei: fromWei,
  toWei: toWei
}

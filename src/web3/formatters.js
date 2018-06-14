var formatters = require("web3/lib/web3/formatters")
var utils = require("web3/lib/utils/utils")
var config = require("web3/lib/utils/config")

inputDefaultHeightFormatter = function(height) {
  if (height === undefined) {
    return 0
  }
  return height
}

inputStakeTxFormatter = function(options) {
  options.from = options.from || config.defaultAccount
  options.from = formatters.inputAddressFormatter(options.from)

  if (options.to) {
    options.to = formatters.inputAddressFormatter(options.to)
  }

  // address format
  ;["validatorAddress", "candidateAddress", "transferFrom", "transferTo"]
    .filter(function(key) {
      return options[key] !== undefined
    })
    .forEach(function(key) {
      options[key] = formatters.inputAddressFormatter(options[key])
    })
  // amount format
  ;["amount", "maxAmount"]
    .filter(function(key) {
      return options[key] !== undefined
    })
    .forEach(function(key) {
      options[key] = utils.fromDecimal(options[key])
    })

  return options
}

formatters.inputDefaultHeightFormatter = inputDefaultHeightFormatter
formatters.inputStakeTxFormatter = inputStakeTxFormatter

module.exports = formatters

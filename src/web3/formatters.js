var formatters = require("web3/lib/web3/formatters")
var utils = require("web3/lib/utils/utils")

inputDefaultHeightFormatter = function(height) {
  if (height === undefined) {
    return 0
  }
  return height
}

formatters.inputDefaultHeightFormatter = inputDefaultHeightFormatter

module.exports = formatters

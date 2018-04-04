const formatters = require("web3/lib/web3/formatters")
const utils = require("web3/lib/utils/utils")

inputDefaultHeightFormatter = function(height) {
  if (height === undefined) {
    return 0
  }
  return height
}

module.exports = {
  formatters,
  inputDefaultHeightFormatter
}

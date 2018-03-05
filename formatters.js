const formatters = require("web3/lib/web3/formatters")
const utils = require("web3/lib/utils/utils")

inputDeclareCandidacyFormatter = function(options) {
  if (options.from) {
    options.from = formatters.inputAddressFormatter(options.from)
  }

  return options
}

module.exports = {
  formatters,
  inputDeclareCandidacyFormatter
}

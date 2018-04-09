var Web3 = require("./web3/web3")

// dont override global variable
if (typeof window !== "undefined" && typeof window.Web3 === "undefined") {
  window.Web3 = Web3
}

module.exports = Web3

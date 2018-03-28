const Web3 = require("../src/index")

if (process.argv.length < 3) {
  console.log("Please supply host")
  return
}

let web3 = new Web3(new Web3.providers.HttpProvider("http://" + process.argv[2]  + ":8545"))
web3.eth.defaultAccount = "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc"
passphrase = "1234"
web3.personal.unlockAccount(web3.eth.defaultAccount, passphrase, 50000)

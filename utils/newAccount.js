const Web3 = require("../src/index")

if (process.argv.length < 3) {
  console.log("Please supply host")
  return
}

let web3 = new Web3(new Web3.providers.HttpProvider("http://" + process.argv[2]  + ":8545"))
web3.eth.defaultAccount = "0x7eff122b94897ea5b0e2a9abf47b86337fafebdc"
passphrase = "1234"
web3.personal.unlockAccount(web3.eth.defaultAccount, passphrase)
web3.personal.newAccount(passphrase, () => {
  let acc = web3.eth.accounts[web3.eth.accounts.length - 1]
  transfer(acc, web3.toWei("10000", "ether"))
  web3.personal.unlockAccount(acc, passphrase, 50000)
  console.log("new account created: " + acc)
})


// send
function transfer(to, v) {
  let payload = {
    to: to,
    value: v
  }
  web3.cmt.sendTransaction(payload, (err, result) => {
    if (err) {
      console.log(err)
    }
  })
}

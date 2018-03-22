const expect = require("chai").expect
const { Settings, Wallet } = require("./constants")
require("./helper")

describe("Init Test", function() {
  it("Transfer 1000 eth to A, B, C, D from coinbase", function(done) {
    let coinbase = web3.eth.coinbase
    web3.personal.unlockAccount(coinbase, Settings.Coinbase.Password)

    for (i = 0; i < 4; ++i) {
      // send
      let payload = {
        from: coinbase,
        to: Wallet[i].Addr,
        value: web3.toWei(1000, "ether")
      }
      let hash = web3.eth.sendTransaction(payload)
      console.log(hash)
      expect(hash).to.not.empty
    }
    setTimeout(() => {
      // balance after
      for (i = 0; i < 4; ++i) {
        console.log("balance of", Wallet[i].Addr, "in gwei -->")
        console.log(
          web3.fromWei(web3.eth.getBalance(Wallet[i].Addr), "gwei").toNumber()
        )
      }
      done()
    }, Settings.BlockTicker)
  })
})

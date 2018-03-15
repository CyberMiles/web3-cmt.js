const expect = require("chai").expect
const Web3 = require("../src/index")
const { Settings, Wallet } = require("./constants")

let web3

const transfer = (f, t, v) => {
  // balance before
  let b10 = web3.eth.getBalance(f, "latest")
  let b11 = web3.eth.getBalance(t, "latest")
  // send
  let payload = {
    from: f,
    to: t,
    value: v
  }
  let hash = web3.cmt.sendTransaction(payload)
  expect(hash).to.not.empty
  // check balance after
  setTimeout(() => {
    let b20 = web3.eth.getBalance(f, "latest")
    let b21 = web3.eth.getBalance(t, "latest")

    expect(b10.toNumber() - b11.toNumber()).to.equal(v)
    expect(b21.toNumber() - b20.toNumber()).to.equal(v)
  }, Settings.BlockTicker)
}

describe("Transaction Test", function() {
  before(function() {
    web3 = new Web3(new Web3.providers.HttpProvider(Settings.Provider))
  })

  describe("Free CMT TX from A to B to C to D", function() {
    it("From A to B", function() {
      web3.personal.unlockAccount(Wallet[0].Addr, Wallet[0].Password)
      transfer(Wallet[0].Addr, Wallet[1].Addr, 1)
    })
    // it("From B to C", function() {
    //   web3.personal.unlockAccount(Wallet[1].Addr, Wallet[1].Password)
    //   transfer(Wallet[1].Addr, Wallet[2].Addr, 1)
    // })
    // it("From C to D", function() {
    //   web3.personal.unlockAccount(Wallet[2].Addr, Wallet[2].Password)
    //   transfer(Wallet[2].Addr, Wallet[3].Addr, 1)
    // })
  })
})

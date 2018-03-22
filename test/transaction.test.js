const expect = require("chai").expect
const { Settings, Wallet } = require("./constants")
require("./helper")

const transfer = (f, t, v, gasPrice) => {
  web3.personal.unlockAccount(f.Addr, f.Password)
  // send
  let payload = {
    from: f.Addr,
    to: t.Addr,
    value: web3.toWei(v, "gwei"),
    gasPrice: web3.toWei(gasPrice || 0, "gwei")
  }
  let hash = web3.eth.sendTransaction(payload)
  console.log("transfer hash: ", hash)
  // check hash
  expect(hash).to.not.empty
  return hash
}

const getBalance = () => {
  let balance = new Array(4)
  for (i = 0; i < 4; i++) {
    balance[i] = web3
      .fromWei(web3.eth.getBalance(Wallet[i].Addr, "latest"), "gwei")
      .toNumber()
  }
  console.log("balance in gwei: -->")
  console.log(balance)
  return balance
}

describe("Transaction Test", function() {
  let balance_old = new Array(4),
    balance_new = new Array(4)
  let value = 1, // gwei
    gasLimit = 21000,
    gasPrice = 2, // gwei
    gas = gasLimit * gasPrice

  beforeEach(function() {
    // balance before
    balance_old = getBalance()
  })

  describe("Free CMT TX from A to B to C to D, and then back", function() {
    it("From A to B to C to D", function(done) {
      transfer(Wallet[0], Wallet[1], value)
      transfer(Wallet[1], Wallet[2], value)
      transfer(Wallet[2], Wallet[3], value)

      setTimeout(() => {
        // balance after
        balance_new = getBalance()
        // check balance change
        expect(balance_new[0] - balance_old[0]).to.equal(-value)
        expect(balance_new[1] - balance_old[1]).to.equal(0)
        expect(balance_new[2] - balance_old[2]).to.equal(0)
        expect(balance_new[3] - balance_old[3]).to.equal(value)

        done()
      }, Settings.BlockTicker)
    })

    it("From D to C to B to A", function(done) {
      transfer(Wallet[3], Wallet[2], value)
      transfer(Wallet[2], Wallet[1], value)
      transfer(Wallet[1], Wallet[0], value)

      setTimeout(() => {
        // balance after
        balance_new = getBalance()
        // check balance change
        expect(balance_new[0] - balance_old[0]).to.equal(value)
        expect(balance_new[1] - balance_old[1]).to.equal(0)
        expect(balance_new[2] - balance_old[2]).to.equal(0)
        expect(balance_new[3] - balance_old[3]).to.equal(-value)

        done()
      }, Settings.BlockTicker)
    })
  })

  describe("Fee CMT TX from A to B to C to D, and then back", function() {
    it("From A to B to C to D", function(done) {
      transfer(Wallet[0], Wallet[1], value, gasPrice)
      transfer(Wallet[1], Wallet[2], value, gasPrice)
      transfer(Wallet[2], Wallet[3], value, gasPrice)

      setTimeout(() => {
        // balance after
        balance_new = getBalance()
        // check balance change
        expect(balance_new[0] - balance_old[0]).to.equal(-gas - value)
        expect(balance_new[1] - balance_old[1]).to.equal(-gas)
        expect(balance_new[2] - balance_old[2]).to.equal(-gas)
        expect(balance_new[3] - balance_old[3]).to.equal(value)

        done()
      }, Settings.BlockTicker)
    })

    it("From D to C to B to A", function(done) {
      transfer(Wallet[3], Wallet[2], value, gasPrice)
      transfer(Wallet[2], Wallet[1], value, gasPrice)
      transfer(Wallet[1], Wallet[0], value, gasPrice)

      setTimeout(() => {
        // balance after
        balance_new = getBalance()
        // check balance change
        expect(balance_new[0] - balance_old[0]).to.equal(value)
        expect(balance_new[1] - balance_old[1]).to.equal(-gas)
        expect(balance_new[2] - balance_old[2]).to.equal(-gas)
        expect(balance_new[3] - balance_old[3]).to.equal(-gas - value)

        done()
      }, Settings.BlockTicker)
    })
  })

  describe.skip("Send free CMT TX from A to B 3 times within 10s", function() {
    it("expect only the first one will succeed", function(done) {
      let times = 3
      for (i = 0; i < times; ++i) {
        transfer(Wallet[0], Wallet[1], value)
      }

      setTimeout(() => {
        // balance after
        balance_new = getBalance()
        // check balance change

        done()
      }, Settings.BlockTicker)
    })
  })

  describe("Send fee CMT TX from A to B 3 times within 10s", function() {
    it("expect all to succeed", function(done) {
      let times = 3
      for (i = 0; i < times; ++i) {
        transfer(Wallet[0], Wallet[1], value, gasPrice)
      }

      setTimeout(() => {
        // balance after
        balance_new = getBalance()
        // check balance change
        expect(balance_new[0] - balance_old[0]).to.equal(-(gas + value) * times)
        expect(balance_new[1] - balance_old[1]).to.equal(value * times)

        done()
      }, Settings.BlockTicker)
    })
  })
})

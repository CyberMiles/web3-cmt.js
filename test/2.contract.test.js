const expect = require("chai").expect
const { Settings } = require("./constants")
const Utils = require("./global_hooks")

describe("Contract Test", function() {
  let token_balance_old = new Array(4),
    token_balance_new = new Array(4)
  let tokens = 1,
    gasPrice = 5 // gwei

  beforeEach(function() {
    // balance before
    token_balance_old = Utils.getTokenBalance()
    // unlock accounts
    accounts.forEach(acc =>
      web3.personal.unlockAccount(acc, Settings.Passphrase)
    )
  })

  describe("Free ETH TX from A to B to C to D, and then back", function() {
    it("from A to B to C to D", function(done) {
      let arrHash = []
      for (i = 0; i < 3; ++i) {
        let hash = Utils.tokenTransfer(accounts[i], accounts[i + 1], tokens)
        arrHash.push(hash)
      }

      Utils.waitMultiple(arrHash, (err, res) => {
        expect(err).to.be.null
        expect(res.length).to.equal(3)
        expect(res).to.not.include(null)

        // balance after
        token_balance_new = Utils.getTokenBalance()

        // check token balance change
        expect(token_balance_new[0] - token_balance_old[0]).to.equal(-tokens)
        expect(token_balance_new[1] - token_balance_old[1]).to.equal(0)
        expect(token_balance_new[2] - token_balance_old[2]).to.equal(0)
        expect(token_balance_new[3] - token_balance_old[3]).to.equal(tokens)

        done()
      })
    })
    it("from D to C to B to A", function(done) {
      let arrHash = []
      for (i = 0; i < 3; ++i) {
        let hash = Utils.tokenTransfer(accounts[3 - i], accounts[2 - i], tokens)
        arrHash.push(hash)
      }

      Utils.waitMultiple(arrHash, (err, res) => {
        expect(err).to.be.null
        expect(res.length).to.equal(3)
        expect(res).to.not.include(null)

        // balance after
        token_balance_new = Utils.getTokenBalance()

        // check token balance change
        expect(token_balance_new[0] - token_balance_old[0]).to.equal(tokens)
        expect(token_balance_new[1] - token_balance_old[1]).to.equal(0)
        expect(token_balance_new[2] - token_balance_old[2]).to.equal(0)
        expect(token_balance_new[3] - token_balance_old[3]).to.equal(-tokens)

        done()
      })
    })
  })

  describe("Fee ETH TX from A to B to C to D, and then back", function() {
    it("from A to B to C to D", function(done) {
      let arrHash = []
      for (i = 0; i < 3; ++i) {
        let hash = Utils.tokenTransfer(
          accounts[i],
          accounts[i + 1],
          tokens,
          gasPrice
        )
        arrHash.push(hash)
      }

      Utils.waitMultiple(arrHash, (err, res) => {
        expect(err).to.be.null
        expect(res.length).to.equal(3)
        expect(res).to.not.include(null)

        // balance after
        token_balance_new = Utils.getTokenBalance()

        // check token balance change
        expect(token_balance_new[0] - token_balance_old[0]).to.equal(-tokens)
        expect(token_balance_new[1] - token_balance_old[1]).to.equal(0)
        expect(token_balance_new[2] - token_balance_old[2]).to.equal(0)
        expect(token_balance_new[3] - token_balance_old[3]).to.equal(tokens)

        done()
      })
    })
    it("from D to C to B to A", function(done) {
      let arrHash = []
      for (i = 0; i < 3; ++i) {
        let hash = Utils.tokenTransfer(
          accounts[3 - i],
          accounts[2 - i],
          tokens,
          gasPrice
        )
        arrHash.push(hash)
      }

      Utils.waitMultiple(arrHash, (err, res) => {
        expect(err).to.be.null
        expect(res.length).to.equal(3)
        expect(res).to.not.include(null)

        // balance after
        token_balance_new = Utils.getTokenBalance()

        // check token balance change
        expect(token_balance_new[0] - token_balance_old[0]).to.equal(tokens)
        expect(token_balance_new[1] - token_balance_old[1]).to.equal(0)
        expect(token_balance_new[2] - token_balance_old[2]).to.equal(0)
        expect(token_balance_new[3] - token_balance_old[3]).to.equal(-tokens)

        done()
      })
    })
  })

  describe("Send free ETH TX from A to B 3 times within 10s", function() {
    it("expect only the first one will succeed", function(done) {
      let arrHash = []
      for (i = 0; i < 3; ++i) {
        let hash = Utils.tokenTransfer(accounts[0], accounts[1], 0)
        arrHash.push(hash)
      }

      Utils.waitMultiple(arrHash, (err, res) => {
        expect(res.length).to.gt(1)
        expect(res[0]).to.not.be.null
        expect(res[0].blockNumber).to.be.gt(0)
        if (res.length === 2) {
          expect(!res[1] || res[1].blockNumber > res[0].blockNumber).to.be.true
        }
        if (res.length === 3) {
          expect(
            !res[2] ||
              (!res[1] && res[2].blockNumber > res[0].blockNumber) ||
              (res[1] && res[2].blockNumber > res[1].blockNumber)
          ).to.be.true
        }

        // balance after
        token_balance_new = Utils.getTokenBalance()

        done()
      })
    })
  })

  describe("Send fee ETH TX from A to B 3 times within 10s.", function() {
    it("expect all to succeed", function(done) {
      let arrHash = [],
        times = 3
      for (i = 0; i < times; ++i) {
        let hash = Utils.tokenTransfer(
          accounts[0],
          accounts[1],
          tokens,
          gasPrice
        )
        arrHash.push(hash)
      }

      Utils.waitMultiple(arrHash, (err, res) => {
        expect(err).to.be.null
        expect(res.length).to.equal(times)
        expect(res).to.not.include(null)

        // balance after
        token_balance_new = Utils.getTokenBalance()

        // check token balance change
        expect(
          token_balance_new[0].minus(token_balance_old[0]).toNumber()
        ).to.equal(-tokens * times)
        expect(
          token_balance_new[1].minus(token_balance_old[1]).toNumber()
        ).to.equal(tokens * times)

        done()
      })
    })
  })

  describe.skip("Destroy the contract", function() {})
})

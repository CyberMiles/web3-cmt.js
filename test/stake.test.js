const expect = require("chai").expect
const Web3 = require("../src/index")
const { Settings, Wallet, Validators } = require("./constants")

let web3

describe("Stake Test", function() {
  before(function() {
    web3 = new Web3(new Web3.providers.HttpProvider(Settings.Provider))
    web3.personal.unlockAccount(Wallet[0].Addr, Wallet[0].Password)
  })

  describe("Declare candidacy", function() {
    it.skip("for an existing initial validator account — fail", function() {
      let payload = {
        from: Wallet[0].Addr,
        bond: { denom: "cmt", amount: 5 },
        pubKey: Validators[0],
        description: {
          moniker: Wallet[0].Name
        }
      }
      let r = web3.stake.declareCandidacy(payload)
      expect(r)
        .to.have.property("height")
        .and.to.equal(0)
      expect(r)
        .to.have.property("check_tx")
        .to.have.property("log").and.to.not.empty
    })
  })
})

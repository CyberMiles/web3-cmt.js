const expect = require("chai").expect
const { Settings, Wallet } = require("./constants")
require("./helper")

describe("Contract Test", function() {
  it("Setup a CRC20 Smart contract called ETH", function() {})

  describe("Free ETH TX from A to B to C to D, and then back", function() {
    it("from A to B to C to D", function() {})
    it("from D to C to B to A", function() {})
  })

  it("Fee ETH TX from A to B to C to D, and then back", function() {
    it("from A to B to C to D", function() {})
    it("from D to C to B to A", function() {})
  })

  describe("Send free ETH TX from A to B 3 times within 10s", function() {
    it("expect only the first one will succeed", function() {})
  })

  it("Send fee ETH TX from A to B 3 times within 10s.", function() {})

  it("Destroy the contract", function() {})
})

const Web3 = require("../src/index")
const { Settings } = require("./constants")

before("web3 setup", function() {
  web3 = new Web3(new Web3.providers.HttpProvider(Settings.Providers.node1))
  if (!web3 || !web3.isConnected())
    throw new Error("cannot connect to server. ")
})

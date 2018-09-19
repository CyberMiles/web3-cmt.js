# web3

[web3-cmt.js](https://github.com/CyberMiles/web3-cmt.js) is a javascript library for interacting with CyberMiles. Its API is derived from the Ethereum [Web3.js](https://github.com/ethereum/wiki/wiki/JavaScript-API), and extends with support for other modules like staking and governance.

The `web3` object provides all methods, it's fully compatible with Ethereum's [web3](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3).

## Example

```js
var Web3 = require("web3-cmt")

// Create an instance of web3 using the HTTP provider.
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
```

### Example using HTTP Basic Authentication

```js
var Web3 = require("web3-cmt")

// HttpProvider takes 4 arguments (host, timeout, user, password).
var web3 = new Web3(
  new Web3.providers.HttpProvider(
    "http://localhost:8545",
    0,
    BasicAuthUsername,
    BasicAuthPassword
  )
)

// Or you can pass the credentials in the URL like this:
var web3 = new Web3(
  new Web3.providers.HttpProvider("http://[username]:[password]@localhost:8545")
)
// Note: you need to URL encode the user name and/or password, if constains unsafe ASCII characters.
```

var XHR2 = require("xhr2")
var HttpProvider = require("web3/lib/web3/httpprovider")
var url = require("url")

// extend HttpProvider to support HTTP Basic Authentication
var MyHttpProvider = function(host, timeout, user, password, headers) {
  HttpProvider.call(this, host, timeout)

  // get auth info from url
  var myUrl = url.parse(host)
  this.auth = myUrl.auth

  if (!this.auth) {
    this.user = user
    this.password = password
  }

  if (headers) this.headers = headers
}

MyHttpProvider.prototype = Object.create(HttpProvider.prototype)
MyHttpProvider.prototype.constructor = MyHttpProvider

MyHttpProvider.prototype.prepareRequest = function(async) {
  var request

  if (async) {
    request = new XHR2()
    request.timeout = this.timeout
  } else {
    request = new XMLHttpRequest()
  }

  request.open("POST", this.host, async)
  if (this.auth) {
    var auth = "Basic " + new Buffer(this.auth).toString("base64")
    request.setRequestHeader("Authorization", auth)
  } else if (this.user && this.password) {
    var auth =
      "Basic " + new Buffer(this.user + ":" + this.password).toString("base64")
    request.setRequestHeader("Authorization", auth)
  }
  request.setRequestHeader("Content-Type", "application/json")
  if (this.headers) {
    this.headers.forEach(function(header) {
      request.setRequestHeader(header.name, header.value)
    })
  }
  return request
}

module.exports = MyHttpProvider

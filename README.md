# CyberMiles Javascript API

[![Build Status](https://travis-ci.org/CyberMiles/web3-cmt.js.svg?branch=dev)](https://travis-ci.org/CyberMiles/web3-cmt.js)

## Requirement

- node `^8.0.0`
- yarn `^1.0.0` or npm `^5.0.0`

## Installation

```bash
# get latest version of web3-cmt.js
git clone https://github.com/CyberMiles/web3-cmt.js /path_to/web3-cmt.js
cd /path_to/web3-cmt.js
git checkout master
yarn install    # (or `npm install`)

# prepare for web3-cmt package linking
yarn link       # (or `npm link`)

# goes to directory of your project
cd /path_to/your_project

# link to local version of web3-cmt package(or `npm link "web3-cmt"`)
yarn link "web3-cmt"
```

Note: You need to run a local [Travis node](https://github.com/CyberMiles/travis/tree/develop/README.md) before using it.

[Documentation](https://cybermiles.github.io/web3-cmt.js/)

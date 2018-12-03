'use strict'

const fs = require('fs')
const os = require('os')
const constants = require('./constants')

function reset () {
  fs.writeFileSync(constants.EVENT_LOG_PATH, '')
}

function append (event) {
  fs.appendFileSync(constants.EVENT_LOG_PATH, JSON.stringify(event) + os.EOL)
}

module.exports = {
  reset,
  append
}

'use strict'

const colors = require('colors')
const account = require('./account')

module.exports = function () {
  console.log('Accounts')
  console.log('------------------')

  account.get().forEach((acc) => {
    console.log('%s %s', colors.bold(acc.id), colors.grey(`/ ${acc.balance}`))
  })
}

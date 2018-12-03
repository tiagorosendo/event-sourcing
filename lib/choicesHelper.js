'use strict'

const account = require('./account')

exports.accounts = () => account.get().map((account) => ({
  value: account.id,
  name: `${account.id} | Balance (${account.balance})`
}))

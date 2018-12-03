'use strict'

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const AccountEvent = require('./accountEventWriter')
const constants = require('./constants')

const adapter = new FileSync('db.json')
const db = low(adapter)
const ACCOUNT_DB = 'accounts'

const collection = db.defaults({
  accounts: []
}).get(ACCOUNT_DB)

const getAll = () => collection.value()
const findById = (id) => collection.find({ id })
const getAccountById = (id) => findById(id).value()
const removeAccount = (account) => collection.remove(account).write()
const updateAccount = (account) => findById(account.id).assign(account).write()
const insertAccount = (account) => collection.push(account).write()

function open (accountId, openingBalance, eventType = constants.EVENTS.open) {
  AccountEvent.append({
    type: eventType,
    id: accountId,
    balance: openingBalance,
    timestamp: Date.now()
  })

  insertAccount({
    id: accountId,
    balance: openingBalance
  })
}

function close (accountId, eventType = constants.EVENTS.close) {
  const account = getAccountById(accountId)

  AccountEvent.append({
    type: eventType,
    id: accountId,
    balance: account.balance,
    timestamp: Date.now()
  })

  removeAccount(account)
}

function transferMoney (accountIdFrom, accountIdTo, amount, eventType = constants.EVENTS.transfer) {
  console.log(`${accountIdFrom} sent ${amount} to ${accountIdTo}`)

  AccountEvent.append({
    type: eventType,
    fromId: accountIdFrom,
    toId: accountIdTo,
    amount,
    timestamp: Date.now()
  })

  const accountFrom = getAccountById(accountIdFrom)
  const accountTo = getAccountById(accountIdTo)

  accountFrom.balance -= amount
  accountTo.balance += amount

  updateAccount(accountFrom)
  updateAccount(accountTo)
}

const depositMoney = (accountId, amount) => {
  AccountEvent.append({
    type: constants.EVENTS.deposit,
    id: accountId,
    amount,
    timestamp: Date.now()
  })

  const account = getAccountById(accountId)
  account.balance += amount
  updateAccount(account)
}

const updateAccountName = (accountId, name) => {
  const account = getAccountById(accountId)
  account.id = name
  updateAccount(account)
}

module.exports = {
  get: getAll,
  open,
  close,
  transferMoney,
  depositMoney,
  updateAccountName
}

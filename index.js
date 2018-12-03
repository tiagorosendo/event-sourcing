'use strict'

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const program = require('commander')
const listAccounts = require('./lib/listAccounts')
const transferMoney = require('./lib/transferMoney')
const create = require('./lib/createAccount')
const close = require('./lib/closeAccount')
const undo = require('./lib/undo')
const deposit = require('./lib/depositMoney')

clear()
console.log(
  chalk.cyan.bold(
    figlet.textSync('Braspag Tech Talks', { horizontalLayout: 'full' })
  )
)

program
  .command('createAccount')
  .alias('ca')
  .description('Create Account')

  .action(() => {
    create()
  })

program
  .command('getaccounts')
  .alias('ga')
  .description('Get All Accounts')

  .action(() => {
    listAccounts()
  })

program
  .command('transfer')
  .alias('t')
  .description('Transfer money')

  .action(() => {
    transferMoney()
  })

program
  .command('closeAccount')
  .alias('c')
  .description('Close Account')

  .action(() => {
    close()
  })

program
  .command('undo')
  .alias('u')
  .description('Undo events')

  .action(() => {
    undo()
  })

program
  .command('deposit')
  .alias('d')
  .description('Deposit Money')

  .action(() => {
    deposit()
  })

program.parse(process.argv)

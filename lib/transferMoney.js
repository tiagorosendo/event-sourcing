'use strict'

const inquirer = require('inquirer')
const colors = require('colors')
const pad = require('pad')
const account = require('./account')
const choicesHelper = require('./choicesHelper')

const questions = [{
  type: 'list',
  name: 'accountToDebit',
  message: 'Choose an account to debit',
  choices: choicesHelper.accounts()
},
{
  type: 'list',
  name: 'accountToCredit',
  message: 'Choose an account to credit',
  choices: choicesHelper.accounts()
},
{
  type: 'input',
  name: 'valueToTransfer',
  message: 'How much do you wanna transfer?',
  default: 0
}
]

module.exports = function () {
  inquirer
        .prompt(questions)
        .then((answers) => {
          console.log('Your Request')
          console.log('------------------')

          console.log(pad(colors.grey('Account to debit: '), 30), answers.accountToDebit)
          console.log(pad(colors.grey('Account to credit: '), 30), answers.accountToCredit)
          console.log(pad(colors.grey('Value: '), 30), answers.valueToTransfer)

          account.transferMoney(answers.accountToDebit, answers.accountToCredit, Number(answers.valueToTransfer))
        })
}

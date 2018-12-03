'use strict'

const inquirer = require('inquirer')
const colors = require('colors')
const pad = require('pad')
const account = require('./account')
const choicesHelper = require('./choicesHelper')

const questions = [{
  type: 'list',
  name: 'accountToDeposit',
  message: 'Choose an account to deposit',
  choices: choicesHelper.accounts()
},
{
  type: 'input',
  name: 'valueToTransfer',
  message: 'How much do you want to deposit?',
  default: 0
}
]

module.exports = function () {
  inquirer
        .prompt(questions)
        .then((answers) => {
          console.log('Your Request')
          console.log('------------------')

          console.log(pad(colors.grey('Account to deposit: '), 30), answers.accountToDeposit)
          console.log(pad(colors.grey('Value: '), 30), answers.valueToTransfer)

          account.depositMoney(answers.accountToDeposit, Number(answers.valueToTransfer))
        })
}

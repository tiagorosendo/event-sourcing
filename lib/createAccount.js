'use strict'

const inquirer = require('inquirer')
const colors = require('colors')
const pad = require('pad')
const account = require('./account')

const questions = [{
  type: 'input',
  name: 'accountId',
  message: 'Type the account Id',
  default: 'Tiago'
},
{
  type: 'input',
  name: 'initialValue',
  message: 'Type the initial amount?',
  default: 0
}
]

module.exports = function () {
  inquirer
        .prompt(questions)
        .then((answers) => {
          console.log('Your Request')
          console.log('------------------')

          console.log(pad(colors.grey('Account Id: '), 30), answers.accountId)
          console.log(pad(colors.grey('Initial Amount: '), 30), answers.initialValue)
          account.open(answers.accountId, Number(answers.initialValue))
        })
}

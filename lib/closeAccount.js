'use strict'

const inquirer = require('inquirer')
const colors = require('colors')
const pad = require('pad')
const account = require('./account')
const choicesHelper = require('./choicesHelper')


const questions = [{
  type: 'list',
  name: 'account',
  message: 'Select an account to close',
  choices: choicesHelper.accounts()
}]

module.exports = function () {
  inquirer
        .prompt(questions)
        .then((answers) => {
          console.log('Your Request')
          console.log('------------------')

          console.log(pad(colors.grey('Account closed: '), 30), answers.account)
          if (answers.account) {
            account.close(answers.account)
          }
        })
}

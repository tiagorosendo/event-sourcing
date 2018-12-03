'use strict'

const inquirer = require('inquirer')
const colors = require('colors')
const pad = require('pad')
const accountEvent = require('./accountEventReverser')
const choicesHelper = require('./choicesHelper')


const questions = [{
  type: 'list',
  name: 'accountToUndo',
  message: 'Choose an account to undo some event',
  choices: choicesHelper.accounts()
},
{
  type: 'input',
  name: 'eventsToUndo',
  message: 'Type how many events you want to undo?',
  default: '0'
}
]

module.exports = function () {
  inquirer
        .prompt(questions)
        .then((answers) => {
          console.log('Your Request')
          console.log('------------------')

          console.log(pad(colors.grey('You select to undo: '), 30), `${answers.eventsToUndo} events`)
          console.log(pad(colors.grey('From account: '), 30), answers.accountToUndo)
          accountEvent.reverseEvent(answers.accountToUndo, Number(answers.eventsToUndo))
        })
}

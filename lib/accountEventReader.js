'use strict'

const fs = require('fs')
const os = require('os')
const constants = require('./constants')
const account = require('./account')

const getEvents = () => {
  const eventLines = fs.readFileSync(constants.EVENT_LOG_PATH, 'utf-8')

  return eventLines
      .split(os.EOL)
      .filter((eventLineStr) => eventLineStr.length)
      .map((eventLineStr) => {
        let eventLine = {}
        try {
          eventLine = JSON.parse(eventLineStr)
        } catch (err) {
          console.error(err)
        }
        return eventLine
      })
}

const rebuild = () => {
  const events = getEvents()

  events.forEach((x) => {
    if (x.type === constants.EVENTS.open) {
      account.open(x.id, Number(x.balance) + 100)
    }
  })
}


const query = (number) => rebuild(number)

module.exports = {
  getEvents,
  query,
  rebuild
}

'use strict'

const account = require('./account')
const constants = require('./constants')
const accountEventReader = require('./accountEventReader')

const undo = (accountId, lastX) => {
  const eventsDeleted = accountEventReader
    .getEvents()
    .filter((x) => x.id === accountId)
    .splice(-lastX)

  console.log(eventsDeleted)

  if (!eventsDeleted) {
    console.log('Error')
    return
  }

  eventsDeleted.forEach((eventDeleted) => {
    // eslint-disable-next-line
    switch (eventDeleted.type) {
      case constants.EVENTS.open:
        account.close(eventDeleted.id)
        break
      case constants.EVENTS.close:
        account.open(eventDeleted.id,
          Number(eventDeleted.balance))
        break
      case constants.EVENTS.transfer:
        console.log('transfer')
        account.transferMoney(eventDeleted.toId,
          eventDeleted.fromId,
          Number(eventDeleted.amount))
        break
      case constants.EVENTS.deposit:
        console.log('transfer')
        account.depositMoney(eventDeleted.id,
          -Number(eventDeleted.amount))
        break
    }
  })
}

exports.reverseEvent = undo

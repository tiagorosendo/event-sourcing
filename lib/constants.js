'use strict'

const path = require('path')

const EVENTS = {
  open: 'open',
  deposit: 'deposit',
  close: 'close',
  transfer: 'transfer'
}

const EVENT_LOG_PATH = path.join(__dirname, 'event_log.txt')

module.exports = {
  EVENTS,
  EVENT_LOG_PATH
}

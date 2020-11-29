const moment         = require('moment')
const config         = require('./config/config')
const rabbitMQClient = require('./utils/rabbitmq')
const psqlInterface  = require('./utils/psql')

var step = async function() {
  try {
    await rabbitMQClient.consumer(config.rabbitmq.queue, (message) => {
      psqlInterface.connect()
      psqlInterface.parseMessage(message)
    })
  } catch (error) {
    console.error(error)
    throw new Error('Isso nao deveria dar ruim')
  }
}

module.exports = setInterval(step, config.frequency)
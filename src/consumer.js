const config         = require('./config/config')
const rabbitMQClient = require('./utils/rabbitmq')

var step = async function() {
  try {
    await rabbitMQClient.connect()
    await rabbitMQClient.createQueue(config.rabbitmq.queue)
    await rabbitMQClient.consumer(config.rabbitmq.queue)
  } catch (error) {
    console.error(error)
    throw new Error('Isso nao deveria dar ruim')
  }
}

module.exports = setInterval(step, config.frequency)
const config         = require('./config/config')
const rabbitMQClient = require('./utils/rabbitmq')
const psqlInterface  = require('./utils/psql')

var round = 0
var step = async function() {
  console.log(round)
  round = round + 1
  try {
    await rabbitMQClient.connect()
    await rabbitMQClient.createQueue(config.rabbitmq.queue)
    console.log('Temos de consumir aqui')
    let message = await rabbitMQClient.consumer(config.rabbitmq.queue)
    console.log('Mensagem no consumer')
    console.log(message)
  } catch (error) {
    console.error(error)
    throw new Error('Isso nao deveria dar ruim')
  }
}

module.exports = setInterval(step, config.frequency)
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
    await rabbitMQClient.consumer(config.rabbitmq.queue, (message) => {
      console.log('Imprime essa treta')
      console.log(message)
      psqlInterface.connect()
      psqlInterface.parseMessage(message)
    })
  } catch (error) {
    console.error(error)
    throw new Error('Isso nao deveria dar ruim')
  }
}

module.exports = setInterval(step, config.frequency)
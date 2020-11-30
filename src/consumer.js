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
    let message = await rabbitMQClient.consumer(config.rabbitmq.queue)
    await psqlInterface.connect()
    
    const promises = message.map(async (point) => {
      console.log('Point ' + point)
      arrayValues = []
      arrayValues.push(point.timestamp)
      arrayValues.push(point.day)
      arrayValues.push(point.light)
      arrayValues.push(point.temperature)
      arrayValues.push(point.humidity)
      arrayValues.push(point.motion)
      await psqlInterface.insertIntoTable(arrayValues)
    })
    await Promise.all(promises)
  } catch (error) {
    console.error(error)
    throw new Error('Isso nao deveria dar ruim')
  }
}

module.exports = setInterval(step, config.frequency)
const config         = require('./config/config')
const rabbitMQClient = require('./utils/rabbitmq')

var step = async function() {
  try {
    await rabbitMQClient.connect()
    await rabbitMQClient.createQueue(config.rabbitmq.queue)
    await rabbitMQClient.consumer(config.rabbitmq.queue)
    const promises = JSON.parse(message).map(async (point) => {
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
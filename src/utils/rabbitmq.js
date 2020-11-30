const config         = require('../config/config')
const psqlInterface  = require('./psql')
const amqp           = require('amqplib')

class RabbitMQHelper {
  constructor () {
    this.conn     = null
    this.channels = null
  }
  
  async connect () {
    const brokerUrl = `${config.rabbitmq.protocol}://${config.rabbitmq.username}:${config.rabbitmq.password}@${config.rabbitmq.host}:${config.rabbitmq.port}`
    try {
      console.log('Trying to connect at RabbitMQ at')
      console.log(brokerUrl)
      this.conn = await amqp.connect(brokerUrl)
      this.channels = {}
    } catch (error) {
      console.log('Unable to connect over RabbitMQ broker')
      
      console.log(error)
    }
  }

  async disconnect () {
    await this.conn.close()
    this.conn = null
    this.channels = {}
  }

  /**
   * @param {String} queueName
   * @param {String} type 
   */
  
  async createQueue (queueName, type) {
    const channel = await this.conn.createChannel()
    await channel.assertExchange(queueName, type)
    this.channels[queueName] = channel
  }

  /**
   * @param {String} queueName
   */
  getChannel (queueName) {
    return this.channels[queueName]
  }

  queueExists (queueName) {
    return queueName in this.channels
  }

  /**
   * @param {String} queueName
   * @param {Buffer} message 
  */
  
  publish (queueName, message) {
    if (!this.queueExists(queueName)) {
      throw new Error ('Queue not created')
    }
    this.channels[queueName].publish(queueName, '', message)
  }


  async consumer(queueName) {
    if (!this.queueExists(queueName)) {
      throw new Error ('Queue not created')
    }
    await this.channels[queueName].assertQueue(queueName, {durable: true})
    await this.channels[queueName].bindQueue(queueName, queueName, '')
    return await this.channels[queueName].consume(queueName, async (message) => {
      let string = message.content.toString()
      console.log(JSON.parse(string).size())
    })
  }

  ackMessage (queueName, message) {
    if (!this.queueExists(queueName)) {
      throw new Error ('Queue not created')
    }
    this.channels[queueName].ack(message)
  }
}

module.exports = new RabbitMQHelper()
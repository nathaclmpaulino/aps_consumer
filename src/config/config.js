module.exports = {
  rabbitmq: {
    username: process.env.RABBITMQ_USERNAME || 'guest',
    password: process.env.RABBITMQ_PASSWORD || 'guest',
    queue: process.env.RABBITMQ_QUEUE || 'general_queue',
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: process.env.RABBITMQ_PORT || 5672,
    protocol: process.env.RABBITMQ_PROTOCOL  || 'amqp'
  },
  psql: {
    host: process.env.POSTGRES_HOST || 'localhost',
    username: process.env.POSTGRES_USER || 'localuser',
    password: process.env.POSTGRES_PASSWORD || 'somedummypassword',
    port: process.env.POSTGRES_PORT || '5432',
    database: process.env.POSTGRES_DB || 'localdb'
  },
  port: process.env.PORT || 3001,
  frequency: process.env.FREQUENCY || 50000
}
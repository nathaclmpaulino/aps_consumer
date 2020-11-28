const express = require('express')
const app = express()
const port = process.env.PORT || 3001

var server = app.listen(port, function() {
  console.log(`Consumer running over port: ${port}`)
})

require('./src/index')

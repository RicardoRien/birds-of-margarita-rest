const express = require('express')

const birdsRouter = require('../routes/birds-routes')
const birdwatchersRouter = require('../routes/birdwatchers-routes')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.json({ message: 'API - Birds of Margarita.' })
})

server.use('/api/birds', birdsRouter)
server.use('/api/observations', birdwatchersRouter)

module.exports = server

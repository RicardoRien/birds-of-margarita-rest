const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const cors = require('cors')

const restricted = require('../auth/restricted-middleware')
const authRouter = require('../auth/auth-routes')
const usersRouter = require('../routes/users-routes')
const birdsRouter = require('../routes/birds-routes')
const birdwatchersRouter = require('../routes/birdwatchers-routes')

const app = express()
app.use(helmet())
app.use(cors())

const sessionConfig = {
  name: 'cookie_session', 
  secret: process.env.SECRET, 
  cookie: {
    maxAge: 1000 * 60 * 60, // Time span cookie [milis,hour,second] (1 hour)
    secure: false, // For production set to true for https only access
    httpOnly: true // True means no acces from JavaScript
  },
  resave: false,
  saveUninitialized: true // GDPR (EUR) Laws. User has to give consent
}

app.use(express.json())
app.use(session(sessionConfig))

app.get('/', (req, res) => {
  res.json({ message: 'API - Birds of Margarita.' })
})

app.use('/api/auth', authRouter)
app.use('/api/users', restricted, usersRouter)
app.use('/api/birds', restricted, birdsRouter)
app.use('/api/observations', restricted, birdwatchersRouter)

module.exports = app

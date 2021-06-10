const express = require('express')
const dbHelper = require('../helpers/dbHelpers') // Brings Helper Functions()
const bcrypt = require('bcryptjs')

const router = express.Router()

// '/api/auth' endpoint
router.post('/register', (req, res) => {
  const credentials = req.body
  const { username, password } = credentials

  if(!(username && password)) {
    return res.status(400).json({ message: 'username and password required' })
  }

  const hash = bcrypt.hashSync(credentials.password, 12)
  credentials.password = hash

  dbHelper.addUser(credentials)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      if (error.errno == 19) {
        res.status(400).json({ message: 'Username already exist! choose other' })
      } else {
        res.status(500).json(error)
      }
    })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if(!(username && password)) {
    return res.status(400).json({ message: 'username and password required' })
  }

  dbHelper.findUserByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

        req.session.user = {
          id: user.id,
          username: user.username
        }

        res.status(200).json({ message: `Welcome, ${user.username}.` })
      } else {
        res.status(401).json({ message: 'Invalid credentials' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Unnable to retrieve users' })
      console.log(error)
    })
})

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json(error)
      } else {
        res.status(200).json({ message: 'Log out! Goodbye' })
      }
    })
  } else {
      res.status(200).json({ message: 'Not logged in' })
  }
})

module.exports = router

const express = require('express')
const dbHelper = require('../helpers/dbHelpers') // Brings Helper Functions()

const router = express.Router()

// 'api/users' endpoint
router.get('/', (req, res) => {
  dbHelper.findAllUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({ message: 'Unnable to retrieve users' })
    })
})

router.get('/:username', (req, res) => {
  const { username } = req.params

  dbHelper.findUserByUsername(username)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

module.exports = router

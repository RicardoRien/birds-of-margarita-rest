const express = require('express')
const dbHelper = require('../helpers/dbHelpers') // Brings Helper Functions()

const router = express.Router()

// api/observations/
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  dbHelper.removeObservation(id)
    .then( count => {
      if (count > 0) {
        res.status(200).json({ message: `Observation with ID ${id} deleted!` })
      } else {
        res.status(404).json({ message: 'Observation not found. Check ID, probably do not exist' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving data' })
      console.log(error)
    })
})

module.exports = router

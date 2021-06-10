const express = require('express')
const dbHelper = require('../helpers/dbHelpers') // Brings Helper Functions()

const router = express.Router()

// /api/birds/
router.get('/', (req, res) => {
  dbHelper.find()
    .then(birds => {
      res.status(200).json(birds)
    })
    .catch(error => {
      res.status(500).json({ message: 'Can not find birds' })
    })
});

router.post('/', (req, res) => {
  dbHelper.addBird(req.body)
    .then(bird => {
      res.status(200).json(bird)
    })
    .catch(error => {
      res.status(500).json({ message: 'Can not add bird' })
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  dbHelper.findById(id)
    .then(bird => {
      if (bird) {
        res.status(200).json(bird)
      } else {
        res.status(404).json({ message: 'Bird not found. Check ID, probably do not exist' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Error in the operation' })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  dbHelper.remove(id)
    .then( count => {
      if (count > 0) {
        res.status(200).json({ message: 'Record deleted!' })
      } else {
        res.status(404).json({ message: 'Can not find ID/record' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Error in the operation' })
    })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  dbHelper.update(id, changes)
    .then(bird => {
      if (bird) {
        res.status(200).json(bird)
      } else {
        res.status(404).json({ message: 'Record not found' })
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Error in the operation' })
    })
})

// Add an observation.
router.post('/:id/observations', (req, res) => {
  const { id } = req.params;
  const birdwatch = req.body;
  
  if(!birdwatch.bird_id) {
    birdwatch['bird_id'] = parseInt(id, 10)
  }

  dbHelper.findById(id)
    .then(bird => {
      if (!bird) {
        res.status(404).json({ message: 'Invalid ID' })
      }

      // Check for all required fields
      if(!birdwatch.watcher || !birdwatch.observation ) {
        res.status(400).json({ message: `Must provide "watcher" and "observation" values` })
      }

      dbHelper.addObservation(birdwatch, id)
        .then(observation => {
          if(observation) {
            res.status(200).json(observation)
          }
        })
        .catch(error => {
          res.status(500).json({ message: 'Error in the operation' })
        })
    })
    .catch(error => {
      res.status(500).json({ message: 'Error finding birds' })
    })
}) 

router.get('/:id/observations', (req, res) => {
  const { id } = req.params;
  dbHelper.findBirdObservations(id)
    .then(bird => {
      if (bird.length === 0) {
        res.status(404).json({ message: 'Bird with no observations. Check ID' })
      } else {
        res.status(200).json(bird)
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Error retrieving data' })
    })
})

module.exports = router

const db = require('../dbConfig')

async function addBird(bird) {
  const [id] = await db('birds').insert(bird);
  return findById(id)
} 

function find() {
  return db('birds')
}

function findById(id) {
  return db('birds').where({ id }).first()
}

function remove(id) {
  return db('birds').where({ id }).del()
}

function update(id, changes) {
  return db('birds')
    .where({ id })
    .update(changes)
    .then(() => findById(id))
}

function findObservationById(id) {
  return db('birdwatchers')
    .where({ id })
    .first()
}

async function addObservation(observation, bird_id) {
  const [id] = await db('birdwatchers')
    .where({ bird_id })
    .insert(observation);
  return findObservationById(id);
}

function findBirdObservations(bird_id) {
  return db('birds')
    .join('birdwatchers', 'birds.id', 'birdwatchers.bird_id')
    .select(  
      'birds.id as BirdID',
      'birds.common_name as BirdName',
      'birds.scientific_name as ScientificName',
      'birdwatchers.id as WatcherID',
      'birdwatchers.watcher as Watcher',
      'birdwatchers.observation as Observation'
    )
    .where({ bird_id })
}

function removeObservation(id) {
  return db('birdwatchers').where({ id }).del()
}
// function removeObservation(id) {
//   return db('birdwatchers').where(birdwarchers.id === id).del()
// }
module.exports = {
  addBird, 
  find,
  findById, 
  remove,
  update,
  addObservation,
  findObservationById,
  findBirdObservations,
  removeObservation
}

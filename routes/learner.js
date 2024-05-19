const express = require('express')
const router = express.Router()

const {
  getLearner,
  createNewLearner,
  getLearnerProfile,
  postLearnerProfile
} = require('../controllers/learner')

router.post('/', async (req, res) => {
  createNewLearner(req, res)
})

router.get('/', (req, res) => {
  getLearner(req, res)
})

router.get('/profile', getLearnerProfile)
router.post('/profile', postLearnerProfile)

module.exports = router

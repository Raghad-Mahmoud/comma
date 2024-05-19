const express = require('express')
const router = express.Router()

const { getAllLearnersTable } = require('../controllers/dashboardCharts')

const User = require('../models/learner')

router.get('/adminLearner', async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 1
  const pageSize = parseInt(req.query.pageSize) || 2

  try {
    const learnersArray = await getAllLearnersTable(pageNumber, pageSize)
    const count = await User.countDocuments({ status: { $in: [0, 1] } })

    const context = {
      title: 'All learners',
      learners: learnersArray,
      pageCount: Math.ceil(count / pageSize),
      currentPage: pageNumber,
      pageSize: pageSize
    }
    res.render('TableAdmintoLearner/tableAdminLearner', { context })
  } catch (error) {
    res.render('./pages/something_went_wrong', { error: 'Cant Access Learners' })
    res.status(500).send('Internal Server Error')
  }
})
module.exports = router

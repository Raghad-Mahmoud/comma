const express = require('express')
const router = express.Router()

const { getAllAdmins, post_Newadmin, getNewAdminspage } = require('../controllers/admin')

router.get('/admins', (req, res) => {
  getAllAdmins(req, res)
})

router.get('/admins/Newadmin', (req, res) => {
  getNewAdminspage(req, res)
})

router.post('/admins/Newadmin', post_Newadmin)

module.exports = router

const express = require('express')
const router = express.Router()

const { get_login, get_signup, post_login, post_signup, logout } = require('../controllers/auth')

router.get('/login', get_login)
router.post('/login', post_login)
router.get('/signup', get_signup)
router.post('/signup', post_signup)
router.post('/logout', logout)
module.exports = router

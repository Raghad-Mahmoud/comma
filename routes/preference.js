const express = require('express')
const router = express.Router()

const preferencesController = require('../controllers/preference')
const { get_session_loggedIn } = require('../middleware/sessionMiddleWare')
router.post('/outline', preferencesController.post_preferences)
router.get('/outline/apply/:courseId',(req,res) => {
    const encodedCourseId = req.params.courseId;
    const courseId=decodeURIComponent(encodedCourseId)
    let learnerId = get_session_loggedIn(req)
    try {
      if (learnerId == null) {
        error = 'Please  Login'
        res.render('pages/learner/login', { title: 'login in', error,isLoggedIn:ids[1]})
        return
      }
      preferencesController.enroll_course(courseId,learnerId )
    } catch (error) {
      console.error('Failed to apply course:', error)
      res.status(500).json({ error: 'Failed to apply course' })
  
  }})
module.exports = router

const express = require('express')
const router = express.Router()
const {
  getSingleCourse,
  getCoursesPage,
  createNewCourse,
  postCoursesPage,
  searchCourses,
  postSearch
} = require('../controllers/courses')
const { get_session_loggedIn } = require('../middleware/sessionMiddleWare')

router.get('/courses', getCoursesPage)
router.post('/courses', postCoursesPage)
router.post('/search', postSearch)

router.get('/outline', async (req, res) => {
  try {
    const isLoggedIn = get_session_loggedIn(req)
    const singleCoursePage = await getSingleCourse(req, res)

    res.render('pages/home/outline_page', {
      courses: false,
      isLoggedIn: isLoggedIn,
      title: 'courses page',
      singleCourse: singleCoursePage
    })
  } catch (error) {
    console.log(error)
    res.render('./pages/something_went_wrong', { error: 'Cant Get Course Outline' })
  }
})

router.post('/dashboard/courses', createNewCourse)

module.exports = router

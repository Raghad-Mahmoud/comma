const learner = require('../models/learner')
const { get_session_loggedIn } = require('../middleware/sessionMiddleWare')
const course = require('../models/course')
/**
 * Handles the post request for learner preferences.
 * @param {Object} req - it takes the preferences that user chose
 * @param {Object} res - it returns when the preferences saved succesfully otherwise it give an error message
 */
const post_preferences = async (req, res) => {
  let learnerId = get_session_loggedIn(req)
  let error = ''
  if (learnerId == null) {
    error = 'Please  Login'
    res.render('pages/learner/login', { title: 'login in', error, isLoggedIn: learnerId })
    return
  }
  if (req.body.actionFlag2 === 'actionApply') {
    try {
      const learnerSchema = learner.schema
      const typeDefaultValue = learnerSchema.path('preferences.type').options.default
      const lengthDefaultValue = learnerSchema.path('preferences.length').options.default
      const assessmentsDefaultValue = learnerSchema.path('preferences.assessment').options.default
      const collaborativeDefaultValue = learnerSchema.path('preferences.collaborative').options
        .default
      const applyForAllCoursesDefaultValue = learnerSchema.path('preferences.applyForAllCourses')
        .options.default

      const userData = {
        'preferences.length': lengthDefaultValue,
        'preferences.type': typeDefaultValue,
        'preferences.assessment': assessmentsDefaultValue,
        'preferences.collaborative': collaborativeDefaultValue,
        'preferences.applyForAllCourses': applyForAllCoursesDefaultValue
      }
      await learner.findByIdAndUpdate(learnerId, { $set: userData }, { new: true })

      return res.redirect(`/courses`)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error' })
    }
  } else {
    let tempApply
    let tempCollaborative
    const { content, length, assessments, applyForAllCourses, collaborative } = req.body

    let error = ''

    try {
      if (!content || !length || !assessments) {
        error = 'Please select all fields'
        res.status(500).json(error)
        return
      }

      if (applyForAllCourses) {
        tempApply = true
      } else {
        tempApply = false
      }

      if (collaborative) {
        tempCollaborative = true
      } else {
        tempCollaborative = false
      }

      const userData = {
        'preferences.type': content,
        'preferences.length': length,
        'preferences.assessment': assessments,
        'preferences.collaborative': tempCollaborative,
        'preferences.applyForAllCourses': tempApply
      }

      await learner.findByIdAndUpdate(learnerId, { $set: userData }, { new: true })

      return res.redirect(`/courses`)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Server error' })
    }
  }
}
/**
 * The function receives the course id and learnerId
 *  and then stores the learnerId and the time according to the course id
 * @param {courseId} name          id course sent from route
 * @param {learnerId} name         learnerId sent from route
 */
const enroll_course = async (courseId, learnerId) => {
  try {
    const newApplication = {
      learner_id: learnerId,
      status: false,
      time: new Date()
    }
    const Course = await course.findById(courseId)
    Course.applications.push(newApplication)
    Course.save()
  } catch (error) {
    throw error
  }
}
module.exports = {
  post_preferences,
  enroll_course
}

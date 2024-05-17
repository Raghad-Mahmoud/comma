const bcrypt = require('bcrypt')
const User = require('../models/learner')
const { capitalizefLetter, validateLastName } = require('./auth')
const {
  getPopularCourses,
  getNoCreatedCourses,
  getNoOfCourses,
  getEnrolledFinished,
  getAllCoursesTable,
  NumberOfCoursesInYear,
  getAllLearnerActive,
  adminUpdateLearner,
  getTop10EnrolledCourses
} = require('./dashboardCharts')

const {
  getCountryLearners,
  getNoOflearner,
  getNoOfMonthlyRegistration,
  getNoOfviewers,
  getTotalEnrolledUserCount,
  getlearnerID
} = require('./learner')

const { usersData } = require('../helpers/dashboard')
const { getCourses } = require('./courses')

const Course = require('../models/course')
const { application } = require('express')

const firstNameRegex = /^[A-Za-z][a-z]*$/
const lastNameRegex = /^[A-Za-z][a-z]*( [A-Za-z][a-z]*)?$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z.]+\.[a-zA-Z]+$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const getDashboard = async (req, res) => {
  // * temporary context object
  const staticData = usersData
  const context = {
    title: 'Dashboard',
    description: 'Dashboard page description',
    user: {
      name: 'Admin Doe',
      email: 'jhonDoe@gmail.com'
    },
    analytics: {
      popularCoursesPie: JSON.stringify(await getPopularCourses()),
      NoOfCoursesList: await NumberOfCoursesInYear(),
      NoOfCountryLearners: await getCountryLearners(),
      NoOfCourses: await getNoOfCourses(),
      NoOflearner: await getNoOflearner(),
      NoOfMonthlyRegistration: await getNoOfMonthlyRegistration(),
      enrolledFinishedCourses: JSON.stringify(await getEnrolledFinished()),
      TotalEnrolledUserCount: await getTotalEnrolledUserCount(),
      Noofviewers: await getNoOfviewers(),
      Top10Enrolledcourses: await getTop10EnrolledCourses()
    }
  }

  res.render('pages/dashboard/index.ejs', context)
}

const getDashboardCourses = async (req, res) => {
  const context = {
    title: 'All courses',
    data: {
      courses: JSON.stringify(await getAllCoursesTable())
    }
  }
  res.render('pages/dashboard/courses.ejs', context)
}

const getDashboardAdmins = async (req, res) => {
  const context = {
    title: 'All admins',
    admins: []
  }

  res.render('pages/dashboard/admins.ejs', context)
}

const getDashboardLearners = async (req, res) => {
  res.render('pages/dashboard/learners.ejs', { title: 'All Learners' })
}
/**
 * Get learners with pagination and search functionality.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getLearner = async (req, res) => {
  try {
    const { offset = 0, limit = 0, search = '' } = req.query
    const queryData = { status: { $in: [1] } }

    if (search) {
      queryData.$or = [
        { firstname: { $regex: search, $options: 'i' } },
        { lastname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }
    const { learners, count } = await getAllLearnerActive(queryData, offset, limit)
    res.status(200).json({ learners, count })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

const getContentfulDashboard = async (req, res) => {
  // * temporary context object
  const context = {
    title: 'Contentful Dashboard',
    description: 'Contentful Dashboard page description'
  }

  res.render('pages/dashboard_contentful/index.ejs', context)
}
/**
 * The course name is searched and found, and the isDeleted skema is changed to true.
The aim of this process is to delete a virtual from the course schedule
 * @param {courseId} name         title course sent from route
 * 
 */
const softDeleted = async (courseId) => {
  try {
    const course = await Course.findOne({ title: courseId })
    if (!course) {
      throw new Error('course not found')
    }
    course.isDeleted = true
    await course.save()
  } catch (error) {
    throw error
  }
}

const getContentfulForms = async (req, res) => {
  const context = {
    title: 'Contentful Forms'
  }

  res.render('pages/dashboard_contentful/ui-forms.ejs', context)
}

const getContentfulButtons = async (req, res) => {
  const context = {
    title: 'Contentful buttons'
  }

  res.render('pages/dashboard_contentful/ui-buttons.ejs', context)
}

const getContentfulCards = async (req, res) => {
  const context = {
    title: 'Contentful cards'
  }

  res.render('pages/dashboard_contentful/ui-cards.ejs', context)
}

const getContentfulTypography = async (req, res) => {
  const context = {
    title: 'Typo. cards'
  }

  res.render('pages/dashboard_contentful/ui-typography.ejs', context)
}

const getContentfulIcons = async (req, res) => {
  const context = {
    title: 'Icons. cards'
  }

  res.render('pages/dashboard_contentful/icons-feather.ejs', context)
}
const getAddNewLearner = (req, res) => {
  res.render('pages/dashboard/new_learner', { title: 'Add New Learner', error: '' })
}
const postAddNewLearner = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body
  let error = ''

  if (!firstname || !lastname || !email || !password || !confirmPassword) {
    error = 'Please fill in all fields'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }

  if (!firstNameRegex.test(firstname)) {
    error = 'First name should contain only lowercase form except the first letter'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }

  if (!lastNameRegex.test(lastname)) {
    error = 'Last name should contain only lowercase form except the first letters of the words'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }

  const learnerExists = await User.findOne({ email })
  if (learnerExists) {
    error = 'Email already exists'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }

  if (!emailRegex.test(email)) {
    error = 'Invalid email address'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }

  if (password !== confirmPassword) {
    error = 'Passwords do not match'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }
  if (!passwordRegex.test(password)) {
    error =
      'Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter'
    res.render('pages/dashboard/new_learner', { title: 'Add New User', error })
    return
  }
  validateLastName(lastname)
  const capitalizedFirstname = capitalizefLetter(firstname)
  const capitalizedLastname = validateLastName(lastname)
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({
    firstname: capitalizedFirstname,
    lastname: capitalizedLastname,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    isDeleted: false,
    status: true
  })
  try {
    await user.save()
    return res.redirect('/dashboard/learners')
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

const deleteLearner = async (learnerId) => {
  try {
    const learner = await User.findOne({ email: learnerId })
    if (!learner) {
      throw new Error('Learner not found')
    }
    learner.status = false
    learner.isDeleted = true
    await learner.save()
  } catch (error) {
    throw error
  }
}

const getapplicationpage = async (req, res) => {
  const context = {
    title: 'application',
    application: {
      learnerid: await getlearnerID()
    }
  }
  res.render('pages/dashboard/application.ejs', context)
}

/**
 * Update course status.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateCourseStatus = async (req, res) => {
  const courseId = req.query.courseId
  const newStatus = req.query.status
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $set: { 'applications.$[].status': newStatus } },
      { new: true }
    )

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' })
    }
    res.json({ message: 'Course status updated successfully' })
  } catch (error) {
    console.error('Error updating course status:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * #### Update course data (Title | Desscription | Outline).
 * @param {Object} req - data to be Updated.
 * @param {Object} res - Indicator whether updated ot not.
 */
const putUpdatedCourseDashboard = async (req, res) => {
  try {
    const courseTitle = req.params.id
    const { title, description, outline } = req.body
    const course = await Course.findOne({ title: courseTitle })

    if (!course) {
      // Course not found
      return res.status(404).json({ error: 'Course not found' })
    }
    // Update the course properties
    course.title = title
    course.description = description
    course.outline = outline

    // Save the updated course
    await course.save()

    // Return success response
    res.json({ message: 'Course updated successfully' })
  } catch (error) {
    console.error('Failed to update course:', error)
    res.status(500).json({ error: 'Failed to update course' })
  }
}

/**
 * #### Getting course data (description & outline according to the course title).
 * @param {Object} req - course title.
 * @param {Object} res - description & outline data.
 */
const getUpdateCourseDashboard = async (req, res) => {
  const courseTitle = req.query.title
  Course.findOne({ title: courseTitle })
    .then((course) => {
      if (!course) {
        return res.status(404).json({ error: 'Course not found' })
      }
      const courseDetails = {
        description: course.description,
        outline: course.outline
      }
      res.json(courseDetails)
    })
    .catch((error) => {
      console.error('Failed to fetch course details:', error)
      res.status(500).json({ error: 'Failed to fetch course details' })
    })
}

module.exports = {
  getDashboard,
  getContentfulDashboard,
  getDashboardAdmins,
  getDashboardLearners,
  softDeleted,
  getContentfulForms,
  getContentfulButtons,
  getContentfulCards,
  getContentfulTypography,
  getContentfulIcons,
  getAddNewLearner,
  postAddNewLearner,
  getLearner,
  deleteLearner,
  adminUpdateLearner,
  getDashboardCourses,
  getapplicationpage,
  updateCourseStatus,
  putUpdatedCourseDashboard,
  getUpdateCourseDashboard
}

const Course = require('../models/course')
const { getCourses } = require('./courses')
const { numbersArr, usersData } = require('../helpers/dashboard')
const learner = require('../models/learner')
const User = require('../models/learner')

/**
 * Returns Number of courses created each month for the previous year
 *
 * Send a JSON response wtih "coursesCounts" as a LIST
 */

const NumberOfCoursesInYear = async () => {
  try {
    const pipeline = [
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000) // Date since 12 months ago until now.
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]
    const courseCounts = await Course.aggregate(pipeline)
    const currentMonth = new Date().getMonth()
    const array = Array.from({ length: 12 }, (_, i) => {
      const month = (currentMonth - i + 11) % 12
      const count = courseCounts.find(({ _id }) => _id === month + 1)?.count || 0
      return count
    }).reverse()
    return array
  } catch (error) {
    console.error("error : couldn't get Courses", error)
  }
}

/**
 * #### Returns an array of popular courses.
 * @param {Number} limit - The number of courses to return. **Default = `7`**.
 * @param {Boolean} others - total sum of all other courses. **Default = `false`**.
 * @returns {Array} An array of popular courses[limit + 1] (with others object if added)
 */
const getPopularCourses = async (limit = 5, others = false) => {
  let courses = await getCourses(limit, 'DESC')
  courses = courses.reduce((result, course) => {
    if (course.title)
      result.push({
        title: course.title?.substring(0, 10) + '...',
        views: course.enrolledUsers
      })
    return result
  }, [])

  const allViews = await getCoursesEnrolls()
  let MaxLimitExceeded = false

  if (isNaN(limit) || limit < 0) {
    limit = 3
  }
  if (limit > courses.length) {
    limit = courses.length
    MaxLimitExceeded = true
  }
  let popularCourses = courses
    .sort((courseX, courseY) => {
      courseX.views > courseY.views ? 1 : -1
    })
    .slice(0, limit)
    .map((course) => {
      return {
        ...course,
        percentage: ((course.views / allViews) * 100).toFixed(2)
      }
    })

  const popularViews = popularCourses.reduce(
    (previosCount, newCourse) => previosCount + newCourse.views,
    0
  )
  if (!MaxLimitExceeded && others) {
    const otherCoursesObj = {
      title: 'Others',
      views: allViews - popularViews,
      percentage: (((allViews - popularViews) / allViews) * 100).toFixed(2)
    }
    popularCourses.push(otherCoursesObj)
  }
  return popularCourses
}

const getNoOfCourses = async () => {
  try {
    const NoOfCourses = await Course.estimatedDocumentCount()
    return NoOfCourses
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
}

/**
 * #### Returns an array containing enrolled & finished courses.
 * @param {Number} limit - The number of courses to return. **Default = `10`**.
 * @returns {Array} An array of courses with enrolled & finished properties.
 */
const getEnrolledFinished = async (limit = 10) => {
  let courses = await getCourses(limit, 'DESC')
  const enrolledFinished = courses.map((course) => {
    return {
      title: course.title?.substring(0, 15) + '...',
      enrolled: course.enrolledUsers,
      finished: Math.floor(Math.random() * course.enrolledUsers) / 2
    }
  })
  const sortedEnrolledFinished = enrolledFinished.sort((courseX, courseY) =>
    courseX.finished / courseX.enrolled < courseY.finished / courseY.enrolled ? 1 : -1
  )
  return sortedEnrolledFinished.slice(0, limit)
}

/**
 * #### returns all(currently limited) courses.
 * @param {Number} limit - The number of courses to query. **Default = `100`**.
 * @param {Boolean} sort - defines the sorting of the records. `'ASC'` | `'DESC'` | `false`. Default = `false`.
 * @returns {Array} An array of course objects.
 */
const getAllCoursesTable = async (limit = 20) => {
  try {
    let courses = await getCourses(limit)
    courses = courses.reduce((result, course) => {
      if (course.isDeleted == false)
        result.push({
          title: course.title,
          enrolled: course.enrolledUsers,
          rating: course.rating,
          stars: course.stars,
          totalHours: course.totalHours
        })
      return result
    }, [])
    return courses
  } catch (error) {
    console.error("error : couldn't get Courses", error)
  }
}

/**
 * #### queries aggregate sum function on enrolled users.
 * @returns {Number} total sum of enrolled users.
 */
async function getCoursesEnrolls() {
  try {
    const sum = await Course.aggregate([
      {
        $group: {
          _id: null,
          totalEnrolls: { $sum: '$enrolledUsers' }
        }
      }
    ])
    return sum[0].totalEnrolls
  } catch (error) {
    console.error("error : couldn't get Courses", error)
  }
}

const getTop10EnrolledCourses = async () => {
  try {
    // Retrieve the top 10 enrolled courses based on the 'enrolledUsers' field in descending order
    const top10Courses = await Course.find()
      .sort({ enrolledUsers: -1 })
      .limit(10)
      .select({ title: 1, enrolledUsers: 1 })

    return top10Courses
  } catch (error) {
    console.error('An error occurred while fetching the top enrolled courses:', error)
    throw error
  }
}
/**
 * Get all active learners.
 *
 * @param {Object} queryData - The query data to filter learners.
 * @param {number} offset - The number of documents to skip.
 * @param {number} limit - The maximum number of documents to return.
 * @returns {Object} - An object containing learners and count.
 */
const getAllLearnerActive = async (queryData, offset = 0, limit = 0) => {
  try {
    const learners = await User.find(queryData).skip(Number(offset)).limit(Number(limit)).exec()
    const count = await User.countDocuments(queryData)
    return { learners, count }
  } catch (error) {
    console.error(error)
    throw error
  }
}
/**
 * Update learner information as an admin.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const adminUpdateLearner = async (req, res) => {
  try {
    const userData = {
      email: req.body.emailInput,
      firstname: req.body.firstNameInput,
      lastname: req.body.lastNameInput,
      updatedAt: new Date()
    }
    const user_email = req.body.userEmail
    const existingUser = await learner.findOne({ email: userData.email })
    const user = await learner.findOne({ email: user_email })
    if (
      userData.email == user.email &&
      userData.firstname == user.firstname &&
      userData.lastname === user.lastname
    ) {
      return res.status(600).json({ error: 'Nothing was Updated' })
    }
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      return res.status(400).json({ error: 'This email is already used by another user.' })
    }
    const updatedUser = await learner.findOneAndUpdate(
      { email: user_email },
      { $set: userData },
      { new: true, projection: { email: 1, firstname: 1, lastname: 1 } }
    )
    res.status(200).json({ redirected: true })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error updating user data')
  }
}
module.exports = {
  getPopularCourses,
  getEnrolledFinished,
  getAllCoursesTable,
  getNoOfCourses,
  NumberOfCoursesInYear,
  getAllLearnerActive,
  adminUpdateLearner,
  getTop10EnrolledCourses
}

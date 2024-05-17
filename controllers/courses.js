const Course = require('../models/course')
const { get_session_loggedIn } = require('../middleware/sessionMiddleWare')

/**
 * #### Returns sorting results
 * @param {Object} req it has the data of the course requested to create
 * @create stores the course in the database
 */
const createNewCourse = async (req, res) => {
  const { title, description, outline } = req.body
  try {
    const newCourse = await Course.create({
      title: title,
      description: description,
      outline: outline
    })
    res.status(200).json(newCourse)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateCourse = async (req, res) => {
  const { id } = req.params

  try {
    const {
      title,
      image,
      description,
      isDeleted,
      outline,
      totalHours,
      enrolledUsers,
      rating,
      stars,
      topicID,
      publishedAt,
      view
    } = req.body

    const singleCourse = await Course.findOneAndUpdate(
      { _id: id },
      {
        title: title | Course.title,
        image: image | Course.image,
        description: description | Course.description,
        isDeleted: isDeleted | Course.isDeleted,
        outline: outline | Course.outline,
        totalHours: totalHours | Course.totalHours,
        enrolledUsers: enrolledUsers | Course.enrolledUsers,
        rating: rating | Course.rating,
        stars: stars | Course.stars,
        topicID: topicID | Course.topicID,
        publishedAt: publishedAt | Course.publishedAt,
        view: view | Course.view
      }
    )

    if (!singleCourse) {
      return res.status(404).json({ error: 'No such course.' })
    }

    res.status(200).json(singleCourse)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/**
 * #### queries courses schema.
 * @param {Number} limit - The number of courses to query. **Default = `100`**.
 * @param {Boolean} sort - defines the sorting of the records. `'ASC'` | `'DESC'`, **Default** = `false`.
 * @returns {Array} An array of course objects.
 */
const getCourses = async (limit = 100, sort = false) => {
  try {
    if (sort === 'DESC') sort = -1
    else if (sort === 'ASC') sort = 1
    else sort = false
    const courses = await Course.find().sort({ enrolledUsers: sort }).limit(limit)
    return courses
  } catch (error) {
    res.status(400).json({ message: 'could not get courses', error: err.message })
  }
}

/**
 * Find the course according to the course id and return it
 * @param {courseId} name          id course sent from route
 * @return {singleCourse} name     return singleCourse from DB
 */
const getSingleCourse = async (req, res) => {
  const courseId = req.query.courseId

  const singleCourse = await Course.findById(courseId)
  if (!singleCourse) {
    return res.status(404).json({ error: 'No such course' })
  }
  return singleCourse
}

/**
 * #### modifying the url path to include the search keyword
 * @param {String} req it includes the search keyword
 * @redirect to the path with the search keyword
 */
const postSearch = async (req, res) => {
  const searchQuery = req.body.searchText
  if (searchQuery && searchQuery.trim().length > 0) {
    res.redirect(`/courses?search=${searchQuery}`)
  } else {
    res.redirect('/courses')
  }
}

/**
 * #### Returns search results or all paginated courses
 * @param {path query} req it has the user's search keyword
 * @returns {Array}  all documents that matched the search keyword with 16 limit pagination per page
 */
const coursePagination = async (req, res) => {
  let page = parseInt(req.query.page) || 1
  let limit = 16
  let query = {}

  if (req.query.search) {
    const regex = new RegExp(req.query.search, 'i')
    query = { $or: [{ title: regex }, { description: regex }] }
  }
  const pageCourses = await Course.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 })
  return {
    currentPage: page,
    pageCourses: pageCourses,
    searchQuery: req.query.search
  }
}

/**
 * #### Returns sorting results
 * @param {Object} req it has the user's sorting criteria
 * @returns {Array}  all documents that matched the query
 */
const getSortedCourses = async (req) => {
  const searchQuery = req.body.searchQuery
  let page = parseInt(req.query.page) || 1
  let limit = 16
  if (searchQuery[0] == 'rating') searchQuery[0] = ''
  if (searchQuery[1] == 'enrollment') searchQuery[1] = ''
  if (searchQuery[2] == 'Topic') searchQuery[2] = ''

  const query = {}
  if (searchQuery[0] === 'Asc') {
    query.sortByRating = 1
  } else if (searchQuery[0] === 'Desc') {
    query.sortByRating = -1
  }
  // Sorting by 'enrolledUsers'
  if (searchQuery[1] === 'Asc') {
    query.sortByEnrolledUsers = 1
  } else if (searchQuery[1] === 'Desc') {
    query.sortByEnrolledUsers = -1
  }
  // Searching by 'topic'
  if (searchQuery[2]) {
    query.topic = searchQuery[2]
  }
  // Searching by 'tags'
  if (searchQuery[3]) {
    query.tags = searchQuery[3]
  }
  const results = await Course.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
  return results
}

/**
 * #### Opens courses page
 * @param {req} req to open the courses page
 * @returns {Array}  all documents that is paginated with limit 16 each page
 */
const getCoursesPage = async (req, res) => {
  try {
    const isLoggedIn = get_session_loggedIn(req)
    const size = await getCoursesSize(req, res)
    const { page, pageCourses, searchQuery } = await coursePagination(req, res)
    res.render('pages/home/courses_page.ejs', {
      courses: true,
      isLoggedIn: isLoggedIn,
      title: 'courses page',
      currentPage: page,
      pageCourses: pageCourses,
      size: size,
      searchQuery: searchQuery
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}

/**
 * #### Display the sorting results
 * @param {Object} req user's sorting criteria
 * @render document's that matched the specified sorting criteria
 */
const postCoursesPage = async (req, res) => {
  try {
    const isLoggedIn = get_session_loggedIn(req)
    const size = await getCoursesSize(req, res)
    const pageCourses = await getSortedCourses(req, res)
    const { page, searchQuery } = await coursePagination(req, res)
    res.render('pages/home/courses_page.ejs', {
      courses: true,
      isLoggedIn: isLoggedIn,
      title: 'courses page',
      pageCourses: pageCourses,
      size: size,
      searchQuery: searchQuery,
      currentPage: page
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}

/**
 * #### Returns size of the courses collection
 * @returns {Number}  total documents in the courses collection
 */
const getCoursesSize = async () => {
  const size = await Course.countDocuments()
  return size
}

module.exports = {
  createNewCourse,
  updateCourse,
  getCourses,
  getSingleCourse,
  coursePagination,
  getSortedCourses,
  getCoursesSize,
  getCoursesPage,
  postCoursesPage,
  postSearch
}

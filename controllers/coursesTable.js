const operations = require('./courses')
const course = require('../models/course')

const formControllerPost = (req, res) => {
  const newCourse = operations.createNewCourse(req, res)
}

module.exports = { formControllerPost }

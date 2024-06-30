const { faker } = require('@faker-js/faker')
const contentSchema = require('../models/content')
const courseSchema = require('../models/course')

const DEBUG = false

// * object templates for schemas * //
const contentObj = {
  courseID: '',
  type: 'video',
  length: 'average',
  data: 'https://www.youtube.com/watch?v=9bZkp7q19f0'
}

const contentTypes = ['link', 'text']
const contentLengths = ['short', 'average', 'long']

// * ------------------------------- * //

/**
 * ### currently doing each in this function:
 * - get course IDs
 * - generate content
 * - seed db content
 * @returns {Promise<Array>} A promise that resolves to an array of added content objects.
 */
const getCourseIDs = async () => {
  courseSchema
    .find()
    .select('_id')
    .then((courses) => {
      DEBUG && console.log('course IDs:\n', courses) //* logging data results
      DEBUG && console.log('course IDs length:\n', courses.length) //* logging data results
      return courses
    })
    .then(async (courses) => {
      const content = await generateContent(courses)
      return content
    })
    .then(async (content) => {
      DEBUG && console.log('generating done.\ndoing create...')
      await createContent(content)
    })
    .then(() => {
      console.info(
        '-------------------------------------------------------------\n------------------- SEEDED SUCCESSFULLY... ------------------\n-------------------------------------------------------------'
      )
    })
    .catch((err) => console.error(err))
}

// * database querying functions * //

/**
 * @description This function deletes all content from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of deleted content objects.
 */
const deleteAllContent = async () => {
  contentSchema
    .deleteMany()
    .then((result) => console.info({ message: 'deleted all Content', result }))
    .catch((err) => console.error(err))
}
/**
 * @description This function creates content in the database.
 * @param {Object} content - An object containing content data.
 * @returns {Promise<Array>} A promise that resolves to an array of created content objects.
 */
const createContent = async (content) => {
  contentSchema
    .create(content)
    .then((result) => console.log(result))
    .catch((err) => console.error(err))
}
// * ------------------------------- * //

// * data generation functions * //
/**
 * Generates content for courses.
 * @param {Array} courses - An array of course objects.
 * @returns {Promise<Array>} A promise that resolves to an array of generated content objects.
 */
const generateContent = async (courses) => {
  const content = []
  const generateLength = Math.floor(courses.length / 2)

  for (let i = 0; i < generateLength; i++) {
    DEBUG && console.log('generating at i:', i)
    for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
      let newContent = Object.assign({}, contentObj)
      newContent.courseID = courses[i]._id
      newContent.type = contentTypes[Math.floor(Math.random() * contentTypes.length)]
      newContent.length = contentLengths[Math.floor(Math.random() * contentLengths.length)]

      if (newContent.type === 'link') {
        newContent.data = faker.internet.url()
      } else {
        newContent.data = faker.lorem.paragraphs(4, '<br/>\n')
      }
      content.push(newContent)
    }
  }

  DEBUG && console.log('All content:', content) //* logging data results
  return content
}

//* ------------------------------- *//

/**
 * @description This function seeds database with: **course content**
 * #### `NOTE` This currently works (manually) in 2 passes, each for the half
 * #### of the array, due to memory issues.
 * @returns {Promise<Array>} A promise that resolves to an array of seeded content objects.
 */
async function seedContent() {
  console.info(
    '-------------------------------------------------------------\n------------------- SEEDING DATABASE... ---------------------\n-------------------------------------------------------------'
  )
  //! deletes old content, use at your own risk
  // await deleteAllContent()

  //* generate Content then insert them into the database
  await getCourseIDs()
}

module.exports = { seedContent }

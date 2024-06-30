const courseSchema = require('../models/course')
const DEBUG = true

/**
 * #### generates and inserts tags into the course schema
 * @returns {Promise<Array>} A promise that resolves to an array of updated course objects.
 */
const generateTagsInsert = async () => {
  courseSchema
    .find()
    .then((courses) => {
      DEBUG && console.log('number of courses:\n', courses.length) //* logging data results
      return courses
    })
    .then(async (courses) => {
      for (let i = 0; i < courses.length; i++) {
        DEBUG && console.log('generating at i:', i)
        DEBUG && console.log({ id: courses[i]._id }, generateTagsFromTitle(courses[i].title))
        const filter = { _id: courses[i]._id }
        const update = { tags: generateTagsFromTitle(courses[i].title) }
        await courseSchema.findOneAndUpdate(filter, update)
      }
    })
    .then(() => {
      console.info(
        '-------------------------------------------------------------\n------------------- SEEDED SUCCESSFULLY... ------------------\n-------------------------------------------------------------'
      )
    })
    .catch((err) => console.error(err))
}

/**
 * #### generates tags from a course title
 * @param {String} title - A string of the course title.
 * @returns {Array} An array of tags generated from the title.
 */
const generateTagsFromTitle = (title) => {
  const newTags = []
  const tags = title.split(' ')
  tags.forEach((tag) => {
    let cleanTag = tag.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
    if (
      cleanTag === 'to' ||
      cleanTag === 'the' ||
      cleanTag === 'in' ||
      cleanTag === 'from' ||
      cleanTag === 'and' ||
      cleanTag === 'with' ||
      cleanTag === 'of' ||
      cleanTag === 'for' ||
      cleanTag === 'an' ||
      cleanTag === 'how' ||
      cleanTag.length < 2
    )
      return
    newTags.push(cleanTag.toLowerCase())
  })
  return newTags
}

/**
 * #### seeds the database with tags
 * @returns {Promise<Array>} A promise that resolves to an array of updated course objects.
 */
async function seedTags() {
  DEBUG &&
    console.info(
      '-------------------------------------------------------------\n------------------- SEEDING DATABASE... ---------------------\n-------------------------------------------------------------'
    )
  //* delete old content

  //* generate tags then insert them into the database
  await generateTagsInsert()
}

module.exports = { seedTags }

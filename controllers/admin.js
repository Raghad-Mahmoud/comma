const validator = require('validator')
const bcrypt = require('bcrypt')
const admin = require('../models/admin')

const nameRegex = /^[a-z]+$/
const firstNameRegex = /^[A-Za-z][a-z]*$/
const lastNameRegex = /^[A-Za-z][a-z]*( [A-Za-z][a-z]*)?$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z.]+.[a-zA-Z]$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const updateAdmin = async (req, res) => {
  try {
    const doc = await admin.findOne({ email: req.body.targetEmail }).exec()
    const storage = { data: req.body }
    let msg = {}
    let keys = []
    let errorFlag = false
    const errorSet = (key) => {
      keys.push(key)
      msg.keys = keys
      msg.error = ' is invalid'
      errorFlag = true
    }
    delete req.body.targetEmail
    for (const key of Object.keys(req.body)) {
      const value = req.body[key].trim()
      if (key === 'firstname' && !validator.matches(value, firstNameRegex)) errorSet(key)
      if (key === 'lastname' && !validator.matches(value, lastNameRegex)) errorSet(key)
      if (key === 'email' && !validator.isEmail(value)) errorSet(key)
      if (key === 'password' && validator.isStrongPassword(value)) {
        const hashedPass = await bcrypt.hash(value, 10)
        doc[key] = hashedPass
      } else if (key === 'password' && !validator.isStrongPassword(value)) {
        errorSet(key)
      }
      if (key !== 'password' && !errorFlag) {
        doc[key] = value
      }
    }
    if (errorFlag) {
      return res.status(400).json({ storage, msg: msg, status: 'Fail' })
    }
    if (!errorFlag) {
      await doc.save()
      return res.status(200).json({ msg: 'Updated Successfully', status: 'Success' })
    }
  } catch (error) {
    console.error("error : couldn't update admin", error)
    res.status(500)
  }
}
const deleteAdmin = async (req, res) => {
  try {
    email = req.body.email
    const doc = await admin.findOne({ email: email }).exec()
    doc['isDeleted'] = true
    await doc.save()
    return res.status(200).json({ msg: 'Deleted Successfully', status: 'Success' })
  } catch (error) {
    console.error("error : couldn't delete admin", error)
    res.status(500)
  }
}

/**
 * #### gets all admins from using search query
 * @param {Object} req - request object with optional `query` object
 * @param {Object} res - response object with admin list and total **not-limit** count
 */
const getAllAdmins = async (req, res) => {
  try {
    let { limit, offset, search, sort } = req.query
    if (search !== undefined) {
      search = search?.split('?')[0]
      limit = limit?.split('?')[0]
      offset = 0
    }
    limit[1] && (limit = limit[1])
    sort = sort?.split('?')[0] || 'asc'
    const filteredAdmins = await admin
      .find({
        $or: [
          { firstname: { $regex: search || '' } },
          { lastname: { $regex: search || '' } },
          { email: { $regex: search || '' } }
        ]
      })
      .skip(offset)
      .limit(limit)
      .sort({ firstname: sort === 'asc' ? 1 : -1 })
    const adminsCount = search == undefined ? await getAdminCount() : filteredAdmins.length
    const adminsData = {
      results: filteredAdmins,
      count: adminsCount
    }
    res.json(adminsData)
  } catch (err) {
    res.status(400).json({ message: 'could not get admins', error: err.message })
  }
}

/**
 * #### gets all admins count from the database
 * @returns {Number} - number of admins in the database
 */
const getAdminCount = async () => {
  try {
    const adminCount = await admin.count()
    return adminCount
  } catch (error) {
    res.status(400).json({ message: 'could not count admins', error: err.message })
  }
}
/**
 * Capitalizes the first letter of a string.
 *
 * @param {str} str - The input string.
 * @returns {str} - The input string with the first letter capitalized.
 */
function capitalizefLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const getNewAdminspage = async (req, res) => {
  res.render('pages/dashboard/new_admin.ejs', { title: 'Add New admin', error: '' })
}

const post_Newadmin = async (req, res) => {
  const { firstNameAdmin, lastNameAdmin, adminemail, adminPassword1, confirmadminPassword } =
    req.body
  let error = ''
  if (
    !firstNameAdmin ||
    !lastNameAdmin ||
    !adminemail ||
    !adminPassword1 ||
    !confirmadminPassword
  ) {
    error = 'Please fill in all fields'
    res.render('pages/dashboard/new_admin.ejs', { title: 'Add New admin', error })
    return
  }
  if (!nameRegex.test(firstNameAdmin)) {
    error = 'First name should contain only lowercase letters'
    res.render('pages/dashboard/new_admin.ejs', { title: 'Add New admin', error })
    return
  }
  if (!nameRegex.test(lastNameAdmin)) {
    error = 'Last name should contain only lowercase letters'
    res.render('pages/dashboard/new_admin.ejs', { title: 'Add New admin', error })
    return
  }
  // if statment always excute

  let adminExists = await admin.countDocuments({ adminemail })
  if (adminExists == 1) {
    error = 'Email already exists'
    res.render('pages/dashboard/new_admin.ejs', { title: 'Add New admin', error })
    return
  }

  if (!emailRegex.test(adminemail)) {
    error = 'Invalid email address'
    res.render('pages/dashboard/new_admin.ejs', { title: 'Add New admin', error })
    return
  }
  if (adminPassword1 !== confirmadminPassword) {
    error = 'Passwords do not match'
    res.render('pages/dashboard/new_admin.ejs', { title: 'Add New admin', error })
    return
  }
  if (!passwordRegex.test(adminPassword1)) {
    error =
      'Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter'
    res.render('pages/dashboard/new_admin.ejs', { title: 'Add New admin', error })
    return
  }

  const capitalizedFirstname = capitalizefLetter(firstNameAdmin)
  const capitalizedLastname = capitalizefLetter(lastNameAdmin)
  const hashedPassword = await bcrypt.hash(adminPassword1, 10)
  const newAdmin = new admin({
    firstname: capitalizedFirstname,
    lastname: capitalizedLastname,
    email: req.body.adminemail,
    password: hashedPassword
  })
  try {
    await newAdmin.save()
    res.status(200).json({ message: 'Data saved successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = {
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  getNewAdminspage,
  post_Newadmin
}

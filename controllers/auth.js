const User = require('../models/learner')

const Admin = require('../models/admin')
const { set_session, get_session_loggedIn } = require('../middleware/sessionMiddleWare')
const bcrypt = require('bcrypt')

const get_signup = (req, res) => {
  res.render('pages/learner/signup', { title: 'Sign Up', error: '' })
}

const getNewAdminspage = async (req, res) => {
  res.render('pages/dashboard/newadmin.ejs', { title: 'Add New admin', error: '' })
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

/**
 * Validates the last name by capitalizing the first letter of each word.
 *
 * @param {lastname} lastname - The last name to validate.
 * @returns {lastname} - The validated last name with the first letter of each word capitalized.
 */
function validateLastName(lastname) {
  const words = lastname.split(' ')
  const formattedLastName = words.map((word) => {
    if (word.length > 0 && !/^[A-Z]/.test(word)) {
      return capitalizefLetter(word)
    } else return word
  })
  return formattedLastName.join(' ')
}

const firstNameRegex = /^[A-Za-z][a-z]*$/
const lastNameRegex = /^[A-Za-z][a-z]*( [A-Za-z][a-z]*)?$/
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z.]+.[a-zA-Z]$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const post_signup = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body
  let error = ''

  if (!firstname || !lastname || !email || !password || !confirmPassword) {
    error = 'Please fill in all fields'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }

  if (!firstNameRegex.test(firstname)) {
    error = 'First name should contain only lowercase form except the first letter'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }

  if (!lastNameRegex.test(lastname)) {
    error = 'Last name should contain only lowercase form except the first letters of the words'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }

  const learnerExists = await User.findOne({ email })
  if (learnerExists) {
    error = 'Email already exists'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }

  if (!emailRegex.test(email)) {
    error = 'Invalid email address'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }

  if (password !== confirmPassword) {
    error = 'Passwords do not match'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }
  if (!passwordRegex.test(password)) {
    error =
      'Password must be at least 8 characters long and include at least one digit, one lowercase letter, and one uppercase letter'
    res.render('pages/learner/signup', { title: 'Sign Up', error })
    return
  }
  validateLastName(lastname)
  const capitalizedFirstname = capitalizefLetter(firstname)
  const capitalizedLastname = validateLastName(lastname)
  const hashedPassword = await bcrypt.hash(password, 10)

  const learner = new User({
    firstname: capitalizedFirstname,
    lastname: capitalizedLastname,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    status: true
  })
  try {
    await learner.save()
    res.render('pages/learner/login', { title: 'login', error: '' })
  } catch (error) {
    res.render('./pages/something_went_wrong', { error: 'Failed Registering Account' })
  }
}

/**
 * Render learner login page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const get_login = (req, res) => {
  res.render('pages/learner/login', { title: 'login', error: '' })
}

/**
 * Handle learner login.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const post_login = async (req, res) => {
  if (get_session_loggedIn(req)) {
    return res.redirect('/courses')
  }
  let email = req.body.email
  let password = req.body.password

  // const salt = await bcrypt.genSalt(10)

  if (!emailRegex.test(email)) {
    let error = 'Invalid email address'
    res.render('pages/learner/login', { title: 'login in', error })
    return
  }

  if (!passwordRegex.test(password)) {
    let error = 'Password and Email did not match'
    res.render('pages/learner/login', { title: 'login in', error })
    return
  }

  const user = await User.findOne({ email })

  if (!user) {
    let error = 'Password and Email did not match'
    res.render('pages/learner/login', { title: 'login in', error })
    return
  }

  const passwordsMatch = await bcrypt.compare(password, user.password)

  if (user.email === email && passwordsMatch) {
    await set_session(req, user._id)
    res.redirect('/courses')
  } else {
    let error = 'Password and Email did not match'
    res.render('pages/learner/login', { title: 'login', error })
  }
}

const logout = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error(err)
      res.render('./pages/home/courses_page', { error: '' })
    }
    res.redirect('/')
  })
}

module.exports = {
  capitalizefLetter,
  validateLastName,
  get_login,
  post_login,
  get_signup,
  post_signup,
  getNewAdminspage,
  logout
}

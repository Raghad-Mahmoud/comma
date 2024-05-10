const express = require('express')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const dashboardRouter = require('./routes/dashboard')
const authRoutes = require('./routes/auth')
const landingPage = require('./routes/landingPage')
const courses = require('./routes/courses')
const learner = require('./routes/learner')
const Preferences = require('./routes/preference')
const AdminLearner = require('./routes/adminToLearner')
const admins = require('./routes/admins')

const app = express()
require('dotenv').config()
require('./config/mongoose') // database connection

//-- Express configuration & Middleware
app.set('view engine', 'ejs') // use EJS
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, '/public'))) // set path for assets folder
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(
  session({
    name: 'sessionId',
    secret: 'Kuy8fuSeYHDfR6dOCwNS6K6sy2QmhSEp',
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 15,
      secure: false,
      httpOnly: true
    }
  })
)

// -- Routes
app.use('/', AdminLearner)
app.use('/', landingPage)
app.use('/', authRoutes)
app.use('/', courses)
app.use('/', learner)
app.use('/', dashboardRouter)
app.use('/api', admins)
app.use('/', Preferences)


app.listen(process.env.SERVER_PORT, () => {
  console.log(`server running on port ${process.env.SERVER_PORT}`)
  console.log(`http://localhost:${process.env.SERVER_PORT}`)
})

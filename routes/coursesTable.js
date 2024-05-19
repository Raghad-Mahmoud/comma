const express = require('express')
const router = express.Router()
const formController=require('../controllers/courses')

router.post("/dashboard/courses",formController.createNewCourse);
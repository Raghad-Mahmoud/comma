const mongoose = require('mongoose')

const Schema = mongoose.Schema
const learnerSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: true
  },
  dob: {
    type: Date,
    required: false,
    default: null
  },
  gender: {
    type: String,
    required: false
  },
  language: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  educationLevel: {
    type: String,
    required: false
  },
  major: {
    type: String,
    required: false
  },
  // todo: change to a schema
  finishedCourses: {
    type: Number,
    required: false
  },
  graduationYear: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  preferredCommunication: {
    type: String,
    required: false,
    enum: ['email', 'phone', 'social media', 'other']
  },
  socialMedia: {
    type: String,
    required: false
  },
  // ? what is this
  timeAvailability: {
    type: String,
    required: false
  },
  currentOccupation: {
    type: String,
    required: false
  },
  professionalBackground: {
    type: String,
    required: false
  },
  // --------------
  // todo: change to a schema
  careerGoals: {
    type: String,
    required: false
  },
  interests: {
    type: String,
    required: false
  },
  learningGoals: {
    type: String,
    required: false
  },
  // ------------------
  softSkills: {
    type: String,
    required: false
  },
  hardSkills: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: false
  },
  preferences: {
    length: {
      type: String,
      required: true,
      default: 'Average'
    },
    type: {
      type: String,
      required: true,
      default: 'video'
    },
    assessment: {
      type: String,
      required: true,
      default: 'After each chapter'
    },
    collaborative: {
      type: Boolean,
      required: true,
      default: false
    },
    applyForAllCourses: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  }
})

module.exports = mongoose.model('Learner', learnerSchema)

const mongoose = require('mongoose')

const learnerSchema = new mongoose.Schema({
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
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  },
  img: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Admin', learnerSchema)

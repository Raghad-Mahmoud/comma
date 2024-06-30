const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      default: 'video'
    },
    length: {
      type: String,
      required: true,
      default: 'average'
    },
    data: {
      type: String,
      required: true
    },
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Content', contentSchema)

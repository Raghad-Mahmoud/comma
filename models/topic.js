const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema(
  {
    id: {
      unique: true,
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Topic', topicSchema)

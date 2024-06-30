const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    },
    outline: {
      type: String,
      required: false
    },
    totalHours: {
      type: Number,
      default: 0,
      required: true
    },
    enrolledUsers: {
      type: Number,
      default: 0,
      required: true
    },
    rating: {
      type: Number,
      required: false
    },
    stars: {
      type: Number,
      required: false
    },
    topic: {
      type: String,
      required: false
    },
    publishedAt: {
      type: Number,
      required: false
    },
    view: {
      type: Number,
      required: false
    },

    assessments: {
      type: String,
      required: true,
      default: 'After each topic'
    },
    content: {
      data: {
        type: String,
        required: false
      },
      length: {
        type: String,
        required: true,
        default: 'Average'
      },
      type: {
        type: String,
        required: true,
        default: 'video'
      }
    },
    tags: [
      {
        type: String,
        required: false
      }
    ],
    isDeleted: {
      type: Boolean,
      default: false
    },
    applications: [
      {
        learner_id: {
          type: String,
          required: true
        },
        status: {
          type: Boolean,
          required: true,
          default: null
        },
        time: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Course', courseSchema)

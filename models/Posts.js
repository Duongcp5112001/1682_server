const mongoose = require('mongoose')

const POSTS_COLLECTION_NAME = "posts"

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  like: {
    type: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "member",
        },
        createdAt: Date,
      },
    ],
    default: [],
    _id: false,
  },
  dislike: {
    type: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "member",
        },
        createdAt: Date,
      },
    ],
    default: [],
    _id: false,
  },
  views: {
    type: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "member",
        },
        createdAt: Date,
      },
    ],
    default: [],
    _id: false,
  },
  comments: {
    type: [
      {
        content: String,
        createdAt: Date,
        createdBy: {
          type: mongoose.Types.ObjectId,
          ref: "member",
        },
        editHistory: {
          type: [
            {
              content: String,
              updatedAt: Date,
            },
          ],
          default: [],
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "member",
  },
  inGroup: {
    type: String,
    required: false,
    default: "",
  },
  subscribers: {
    type: [
      {
        user: { 
          type: mongoose.Types.ObjectId, 
          ref: "member" 
        },
        createdAt: Date,
      },
    ],
    default: [],
    _id: false,
  },
}, {
    timestamps: true
})

module.exports = mongoose.model(POSTS_COLLECTION_NAME, postsSchema)
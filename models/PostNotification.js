const mongoose = require('mongoose')

const POSTS_COLLECTION_NAME = 'posts_notifications'

const POSTS_NOTIFICATION_TYPE = {
    SUBMISSION = "SUBMISSION",
    UPDATE = "UPDATE",
}

const postsNotificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        default: "",
    },
    type: {
        type: POSTS_NOTIFICATION_TYPE,
        required: true,
        default: POSTS_NOTIFICATION_TYPE.SUBMISSION,
    },
    idea: {
        type: mongoose.Types.ObjectId,
        ref: "posts",
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
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
}, {
    timestamps: true
})

module.exports = mongoose.model(POSTS_NOTIFICATION_NAME, postsNotificationSchema)
const mongoose = require('mongoose')

const feedBackSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        default: "",
    },

    description: {
        type: String,
        require: true,
        default: "",
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

module.exports = mongoose.model('feedBack', feedBackSchema)
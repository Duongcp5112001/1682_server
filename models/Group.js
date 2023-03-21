const mongoose = require('mongoose')

const GROUP_COLLECTION_NAME = "group";

const DEPARTMENT_STATUS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
}

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        default: "",
    },

    description: {
        type: String,
        require: true,
        default: "",
    },

    avatar: {
        type: String,
        require: false,
        default: "",
    },

    coverImage: {
        type: String,
        require: false,
        default: "",
    },

    status: {
        type: DEPARTMENT_STATUS,
        required: true,
        default: DEPARTMENT_STATUS.ACTIVE,
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
        ref: "user",
    },
}, {
    timestamps: true
})

module.exports = mongoose.model(GROUP_COLLECTION_NAME, groupSchema)
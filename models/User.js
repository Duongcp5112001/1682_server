const GROUP_COLLECTION_NAME = require('./Group')

const mongoose = require('mongoose')

const USER_COLLECTION_NAME = "user";

const USER_STATUS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
}

const USER_ROLE = {
    STAFF: "USER",
    ADMIN: "ADMIN",
}

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "",
    },
    coverImage: {
        type: String,
        require: false,
        default: "",
    },
    status: {
        type: USER_STATUS,
        required: true,
        default: USER_STATUS.INACTIVE,
    },
    code: {
        type: String,
        required: true,
        default: {},
    },
    codeExpires: {
        type: Date,
        required: true,
        default: new Date(),
    },
    role: {
        type: USER_ROLE,
        required: true,
        default: USER_ROLE.STAFF,
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
        type: mongoose.Types.ObjectId && String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model(USER_COLLECTION_NAME, userSchema)
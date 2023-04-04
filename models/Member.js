const mongoose = require('mongoose')

const MEMBER_COLLECTION_NAME = "member";

const MEMBER_STATUS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
}

const MEMBER_ROLE = {
    MEMBER: "MEMBER",
    ADMIN: "ADMIN",
    USER: "USER"
}

const memberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
        unique: true
    },
    password: {
        type: String,
        required: false,
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
        type: MEMBER_STATUS,
        required: true,
        default: MEMBER_STATUS.ACTIVE,
    },
    codeExpires: {
        type: Date,
        required: true,
        default: new Date(),
    },
    role: {
        type: MEMBER_ROLE,
        required: true,
        default: MEMBER_ROLE.MEMBER,
    },
    friends: {
        type: [
            {
                friendId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'member'
                },
                createdAt: Date,
            }
        ],
        default: [],
    },
    groups: {
        type: [
            {
                groupId: {
                    type: mongoose.Types.ObjectId,
                    ref: "group"
                },
                createdAt: Date,
            }
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
        type: mongoose.Types.ObjectId && String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model(MEMBER_COLLECTION_NAME, memberSchema)
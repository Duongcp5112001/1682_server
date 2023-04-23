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
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdamri.edu.vn%2Fuser-avatar%2F&psig=AOvVaw3Mz-Iw-CT-g77yO_Di9DMC&ust=1682336932369000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNihwcz3v_4CFQAAAAAdAAAAABAJ",
    },
    coverImage: {
        type: String,
        require: false,
        default: "https://www.google.com/url?sa=i&url=http%3A%2F%2Ficonerecife.com.br%2Fwp-content%2Fplugins%2Fuix-page-builder%2Fuixpb_templates%2Fimages%2FUixPageBuilderTmpl%2F&psig=AOvVaw1vFK7jzGWeeWS4rhcZ8Ia9&ust=1682336817072000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKDL_ZX3v_4CFQAAAAAdAAAAABAE",
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
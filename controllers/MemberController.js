const Member = require('../models/Member')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const MemberController = {
    getProfile: async (req, res) => {
        try {
            const memberId = req.decodedId;
            const memberFound = await Member.findById(memberId);
            if (!memberFound) {
                return res.status(03).json({msg: 'Member not found'})
            }

            return res.json({
                msg: "Success!",
                member: {
                    _id: memberFound._id,
                    username: memberFound.username,
                    avatar: memberFound.avatar,
                    coverImage: memberFound.coverImage,
                    status: memberFound.status,
                    role: memberFound.role,
                    createdAt: memberFound.createdAt
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    changePassword: async (req, res) => {
        try {
            const { memberId } = req.params;
            const { oldPassword, newPassword } = req.body

            const memberFound = await Member.findById(memberId)

            if (!memberFound) {
                return res.status(03).json({msg: 'Member not found'})
            }

            if(!oldPassword) return res.status(04).json({msg: "Old password is require."})
            if(!newPassword) return res.status(05).json({msg: "New password is require."})
            const comparePassword = await bcrypt.compare(oldPassword, memberFound.password);
            if (!comparePassword) return res.status(06).json({msg: "Old password is not correct"})

            const password = await bcrypt.hash(newPassword, 10);

            const updatePassword = await Member.updateOne(
                {"_id": memberId},
                {$set: {password: password}},
                {upsert: true}
            )

            return res.json({
                msg: "Success!",
                member: {
                    _id: memberFound._id,
                    username: memberFound.username,
                    avatar: memberFound.avatar,
                    coverImage: memberFound.coverImage,
                    status: memberFound.status,
                    role: memberFound.role,
                    createdAt: memberFound.createdAt
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { memberId } = req.params;
            const { memberNameUpdate } = req.body

            const memberFound = await Member.findById(memberId)

            if (!memberFound) {
                return res.status(03).json({msg: 'Member not found'})
            }

            if(!memberNameUpdate) return res.status(02).json({msg: "Username is require."})

            const updateMember = await Member.updateOne(
                {"_id": memberId},
                {$set: {username: memberNameUpdate}},
                {upsert: true}
            )

            const result = await Member.findById(memberId)

            return res.json({
                msg: "Success!",
                member: {
                    _id: result._id,
                    username: result.username,
                    avatar: result.avatar,
                    coverImage: result.coverImage,
                    status: result.status,
                    role: result.role,
                    createdAt: result.createdAt
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    uploadAvatar: async (req, res) => {
        try {

        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    }
}

module.exports = MemberController
const Member = require('../models/Member')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const MemberController = {
    getProfile: async (req, res) => {
        try {
            const memberId = req.decodedId;
            const memberFound = await Member.findById(memberId);
            if (!memberFound) {
                return res.status(01).json({msg: 'Member not found'})
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
                return res.status(01).json({msg: 'Member not found'})
            }

            if(!oldPassword) return res.status(404).json({msg: "Old password is require."})
            if(!newPassword) return res.status(404).json({msg: "New password is require."})
            const comparePassword = await bcrypt.compare(oldPassword, memberFound.password);
            if (!comparePassword) return res.status(404).json({msg: "Password is incorrect"})

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
    }
}

module.exports = MemberController
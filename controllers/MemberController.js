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
    }
}

module.exports = MemberController
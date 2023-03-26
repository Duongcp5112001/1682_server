const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserController = {
    getProfile: async (req, res) => {
        try {
            const userId = req.decodedId;
            const userFound = await User.findById(userId);
            if (!userFound) {
                return res.status(01).json({msg: 'User not found'})
            }
            return res.json({
                msg: "Success!",
                User: {
                    _id: userFound._id,
                    username: userFound.username,
                    avatar: userFound.avatar,
                    coverImage: userFound.coverImage,
                    status: userFound.status,
                    role: userFound.role,
                    createdAt: userFound.createdAt,
                }
            })
        } catch (err) {
            console.error(err);
            return res.status(403);
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { userId } = req.params;
            const { userNameUpdate } = req.body

            const userFound = await User.findById(userId)

            if (!userFound) {
                return res.status(01).json({msg: 'User not found'})
            }

            if(!userNameUpdate) return res.status(404).json({msg: "Username is require."})

            const updateUser = await User.updateOne(
                {"_id": userId},
                {$set: {username: userNameUpdate}},
                {upsert: true}
            )

            const result = await User.findById(userId)

            return res.json({
                msg: "Success!",
                user: {
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
    }
}

module.exports = UserController
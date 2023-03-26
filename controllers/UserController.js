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
    }
}

module.exports = UserController
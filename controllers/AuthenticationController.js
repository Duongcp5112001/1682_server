const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const AuthenticationController = {
    register: async (req, res) => {
        try {
            const { nickname, email, password } = req.body

            const user_name = await User.findOne({nickname})
            if(user_name) return res.status(400).json({msg: "This user name already exists."})

            const user_email = await User.findOne({email})
            if(user_email) return res.status(400).json({msg: "This email already exists."})

            if(password.lenght < 8)
            return res.status(400).json({msg: "Password must be at least."})

            const passwordHass = await bcrypt.hash(password,12)

            const newUser = new User({
                nickname, email, password:passwordHass,
            })

            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id}) 
            
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 
            })

            await newUser.save()

            res.json({
                msg: "Register Success!",
                access_token,
                user: {
                    ...newUser._doc,
                    password:'',
                }
            })

            console.log(newUser)

        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    login: async (req, res) => {
        try {
            
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    logout: async (req, res) => {
        try {
            
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.RANDOM_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.RANDOM_REFRESH_TOKEN, {expiresIn: '30d'})
}

module.exports = AuthenticationController
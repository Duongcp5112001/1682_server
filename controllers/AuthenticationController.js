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

            if(password.length < 8)
            return res.status(400).json({msg: "Password must be at least 8 characters."})

            const passwordHass = await bcrypt.hash(password,12)

            const newUser = new User({
                nickname, email, password:passwordHass,
            })

            const access_token = createAccessToken({id: newUser._id})
            const refresh_token = createRefreshToken({id: newUser._id}) 
            
            res.cookie('refreshtoken', refresh_token, {
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
            const { email, password } = req.body
  
            if(!email) return res.status(404).json({msg: "Email is require."})
            const user = await User.findOne({email}).populate("-password")
            if (!user) return res.status(404).json({msg: "This email dose not exist."})

            if(!password) return res.status(404).json({msg: "Password is require."})
            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) return res.status(404).json({msg: "Password is incorrect"})


            const access_token = createAccessToken({id: user._id})
            const refresh_token = createRefreshToken({id: user._id}) 
            
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 
            })

            res.json({
                msg: "Login Success!",
                access_token,
                user: {
                    ...user._doc,
                    password:'',
                }
            })
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api/refresh_token',})
            return res.json({msg: 'Logged out successfully'})
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const ref_token = req.cookies.refreshtoken
            if(!ref_token) return res.status(404).json({msg: "Please login first."})
            
            jwt.verify(token, process.env.RANDOM_REFRESH_TOKEN, async (err, result) => {
               if(err) return res.status(404).json({msg: "Please login first."})
               console.log(result)
            })
            res.json({ref_token})
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
const Member = require('../models/Member')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const AuthenticationController = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body

            const member_name = await Member.findOne({username})
            const user_name = await User.findOne({username})
            if(member_name || user_name) return res.status(404).json({errorCode: "07" ,msg: "This username already exists."})

            if(password.length < 8 && password.length > 0)
            return res.status(403).json({errorCode: "08", msg: "Password must be at least 8 characters."})

            const passwordHass = await bcrypt.hash(password,12)

            const newMember = new Member({
                username, password:passwordHass,
            })

            const access_token = createAccessToken({id: newMember._id})
            const refresh_token = createRefreshToken({id: newMember._id}) 
            
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 
            })

            await newMember.save()

            res.json({
                msg: "Register Success!",
                access_token,
                member: {
                    ...newMember._doc,
                    password:'',
                }
            })
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    registerNonPassword: async (req, res) => {
        try {
            const { username } = req.body

            const member_name = await Member.findOne({username})
            
            if(member_name) return res.status(404).json({errorCode: "07", msg: "This username already exists."})

            const newUser = new Member({
                username, role: "USER"
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
                }
            })
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body
  
            if(!username) return res.status(404).json({errorCode: "02", msg: "Username is require."})
            const member = await Member.findOne({username}).populate("-password")
            if (!member) return res.status(404).json({errorCode: "01", msg: "This username dose not exist."})

            if(!password) return res.status(404).json({errorCode: "10", msg: "Password is require."})
            const comparePassword = await bcrypt.compare(password, member.password)
            if (!comparePassword) return res.status(404).json({errorCode: "11", msg: "Password is incorrect"})


            const access_token = createAccessToken({id: member._id})
            const refresh_token = createRefreshToken({id: member._id}) 
            
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 30*24*60*60*1000 
            })

            res.json({
                msg: "Login Success!",
                access_token,
                member: {
                    ...member._doc,
                    password:'',
                }
            })
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    loginNonPassword: async (req, res) => {
        try {
            const { username } = req.body
  
            if(!username) return res.status(404).json({errorCode: "02", msg: "Username is require."})
            const user = await Member.findOne({username})
            if (!user) return res.status(404).json({errorCode: "09", msg: "This username dose not exist."})


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
            if(!ref_token) return res.status(403).json({ errorCode: "12", msg: "Please login first."})
            
            jwt.verify(ref_token, process.env.RANDOM_REFRESH_TOKEN, async (err, result) => {
               if(err) return res.status(403).json({errorCode: "12", msg: "Please login first."})
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
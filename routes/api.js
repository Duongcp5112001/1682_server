const router = require('express').Router();
const AuthenticationController = require('../controllers/AuthenticationController');
const verifyToken = require('../middleware/authorization');
const MemberController = require('../controllers/MemberController')
const UserController = require('../controllers/UserController')

//Auth
router.post('/register',AuthenticationController.register);

router.post('/register-no-password',AuthenticationController.registerNonPassword);

router.post('/login', AuthenticationController.login);

router.post('/login-no-password', AuthenticationController.loginNonPassword);

router.post('/logout',AuthenticationController.logout);

router.post('/refresh_token', AuthenticationController.generateAccessToken);


//Member
router.get('/member/get-profile', verifyToken, MemberController.getProfile);

//User
router.get('/user/get-profile', verifyToken, UserController.getProfile);

module.exports = router

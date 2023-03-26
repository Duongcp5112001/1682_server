const router = require('express').Router();
const verifyToken = require('../middleware/authorization');
const AuthenticationController = require('../controllers/AuthenticationController');
const MemberController = require('../controllers/MemberController');
const UserController = require('../controllers/UserController');
const upload = require('../middleware/upload')

//Auth
router.post('/register',AuthenticationController.register);

router.post('/register-no-password',AuthenticationController.registerNonPassword);

router.post('/login', AuthenticationController.login);

router.post('/login-no-password', AuthenticationController.loginNonPassword);

router.post('/logout',AuthenticationController.logout);

router.post('/refresh_token', AuthenticationController.generateAccessToken);


//Member
router.get(
    '/member/get-profile', 
    verifyToken, 
    MemberController.getProfile
    );
router.put(
    '/member/:memberId/change-password',
    verifyToken,
    MemberController.changePassword
    );
router.put(
    '/member/:memberId/update-profile',
    verifyToken,
    MemberController.updateProfile
    );
router.put(
    '/member/:memberId/upload-avatar',
    verifyToken,
    upload.single('avatar'),
    MemberController.uploadAvatar
    );
    
//User
router.get(
    '/user/get-profile', 
    verifyToken, 
    UserController.getProfile
    );
router.put(
    '/user/:userId/update-profile',
    verifyToken,
    UserController.updateProfile
    );
router.put(
    '/user/:userId/upload-avatar',
    verifyToken,
    
    );

module.exports = router

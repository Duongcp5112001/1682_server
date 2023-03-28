const router = require('express').Router();
const verifyToken = require('../middleware/authorization');
const AuthenticationController = require('../controllers/AuthenticationController');
const MemberController = require('../controllers/MemberController');
<<<<<<< Updated upstream
const UserController = require('../controllers/UserController');
=======
const GroupController = require('../controllers/GroupController');
const PostsController = require('../controllers/PostsController');
>>>>>>> Stashed changes

//Auth
router.post(
    '/register',
    AuthenticationController.register
    );

router.post(
    '/register-no-password',
    AuthenticationController.registerNonPassword
    );

router.post(
    '/login', 
    AuthenticationController.login
    );

router.post(
    '/login-no-password', 
    AuthenticationController.loginNonPassword
    );

router.post(
    '/logout',
    AuthenticationController.logout
    );

router.post(
    '/refresh_token', 
    AuthenticationController.generateAccessToken
    );


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
    '/member/:accountId/update-profile',
    verifyToken,
    MemberController.updateProfile
    );
<<<<<<< Updated upstream
router.put(
    '/member/:memberId/upload-avatar',
=======

router.post(
    '/member/create-group',
>>>>>>> Stashed changes
    verifyToken,
    MemberController.uploadAvatar
    );
<<<<<<< Updated upstream
router.post('/member/create-group')
    
=======
>>>>>>> Stashed changes

router.post(
    '/member/create-posts',
    verifyToken,
    checkMember,
    PostsController.createPosts 
    );

router.post(
    '/member/:groupId/create-posts',
    verifyToken,
    checkMember,
    PostsController.createPostsInGroup 
    );
    
//User
router.get(
    '/user/get-profile', 
    verifyToken, 
    MemberController.getProfile
    );

router.put(
    '/user/:accountId/update-profile',
    verifyToken,
    MemberController.updateProfile
    );

//Admin
router.put(
    '/admin/:memberId/deactive-account',
    verifyToken,
    checkAdmin,
    MemberController.deactiveAcount
    );

router.put(
    '/admin/:memberId/active-account',
    verifyToken,
    checkAdmin,
    MemberController.activeAccount
    );

router.put(
    '/admin/:groupId/deactive-group',
    verifyToken,
    checkAdmin,
    GroupController.deactiveGroup
    );

router.put(
    '/admin/:groupId/active-group',
    verifyToken,
    checkAdmin,
    GroupController.activeGroup
    );

router.get(
    '/admin/get-list-members',
    verifyToken,
    checkAdmin,
    MemberController.getListMembers
    );

router.get(
    '/admin/get-list-groups',
    verifyToken,
    checkAdmin,
    GroupController.getListGroups
    );


module.exports = router

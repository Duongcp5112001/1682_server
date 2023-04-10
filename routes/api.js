const router = require('express').Router();
const { verifyToken, checkAdmin, checkMember } = require('../middleware/authorization');
const AuthenticationController = require('../controllers/AuthenticationController');
const MemberController = require('../controllers/MemberController');
const GroupController = require('../controllers/GroupController');
const PostsController = require('../controllers/PostsController');

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

router.post(
    '/member/create-group',
    verifyToken,
    checkMember,
    GroupController.createGroup
    );

router.post(
    '/member/create-posts',
    verifyToken,
    checkMember,
    PostsController.createPosts 
    );

router.put(
    '/posts/:postsId/like-dislike/:action',
    verifyToken,
    PostsController.likeDislikePosts
);

router.post(
    '/member/:groupId/create-posts',
    verifyToken,
    checkMember,
    PostsController.createPostsInGroup 
    );

router.put(
    '/posts/:postsId/like-dislike/:action',
    verifyToken,
    PostsController.likeDislikePosts
    );

router.put(
    '/posts/:postsId/view-posts',
    verifyToken,
    PostsController.viewPosts
    );

router.put(
    '/posts/:postsId/comment-posts',
    verifyToken,
    PostsController.commentPosts
    );

router.delete(
    '/posts/:postsId/comment/:commentId/delete',
    verifyToken,
    PostsController.deleteCommentPosts
    );

router.delete(
    '/posts/:postsId/delete',
    verifyToken,
    PostsController.deletePosts
    );

router.delete(
    '/posts/:postsId/group/:groupId/delete',
    verifyToken,
    checkMember,
    PostsController.deleteGroupPosts
    );

router.put(
    '/posts/:postsId/comment/:commentId/edit',
    verifyToken,
    PostsController.editComment
    );

router.put(
    '/group/:groupId/edit',
    verifyToken,
    checkMember,
    GroupController.editGroup
    );

router.put(
    '/group/:groupId/member/:memberId/accept-join-request',
    verifyToken,
    GroupController.acceptMemberJoin
    );

router.put(
    '/member/:memberId/accept-add-friend-request',
    verifyToken,
    MemberController.acceptAddFriend
    );

router.get(
    '/group/search-group',
    GroupController.getByName
    );

router.get(
    '/member/search-member',
    MemberController.getByName
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

router


module.exports = router

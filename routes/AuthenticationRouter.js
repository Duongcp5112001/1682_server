const router = require('express').Router();
const AuthenticationController = require('../controllers/AuthenticationController');


router.post('/register',
    AuthenticationController.register
  );

router.post('/login', 
    AuthenticationController.login
  );

router.post('/logout',
    AuthenticationController.logout
  );

router.post('/refresh_token', 
    AuthenticationController.generateAccessToken
  );

// router.use(function (req, res) {
//     return res.errorCode({
//       errorCode: "40",
//       message: "Invalid API Route",
//       data: {},
//     });
// });

module.exports = router

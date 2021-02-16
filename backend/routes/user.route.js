const express = require('express');
const checkAuth = require('../middleware/check-auth')
const router = express.Router();


// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
router.post('/open/signup', user_controller.user_create);

router.post('/open/login', user_controller.user_login);

router.post('/open/googlelogin', user_controller.google_login);

// a simple test url to check that all of our files are communicating correctly.
router.get('/admin/users', user_controller.users);

//Url and controller for getting
router.get('/admin/user/:id', user_controller.get_user);

router.get('/verify/:token', user_controller.verify);
router.get('/reverify/:id', user_controller.reverify);


router.put('/admin/userupdate/:id', user_controller.update_user);


module.exports = router;

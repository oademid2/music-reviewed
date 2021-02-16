const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

// Require the controllers WHICH WE DID NOT CREATE YET!!
const policy_controller = require('../controllers/policy.controller');

//Url and controller for creating products
router.put('/admin/updatepolicy/:id', policy_controller.update_policy);

//Url and controller for creating products
//router.post('/open/createpolicy', policy_controller.policy_create);

router.get('/open/policy', policy_controller.policy);

module.exports = router;
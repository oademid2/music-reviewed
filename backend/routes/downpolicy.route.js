const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

// Require the controllers WHICH WE DID NOT CREATE YET!!
const downpolicy_controller = require('../controllers/downpolicy.controller');

//Url and controller for creating products
router.put('/admin/updatedownpolicy/:id', downpolicy_controller.update_downpolicy);

//Url and controller for creating products
//router.post('/open/createdownpolicy', downpolicy_controller.downpolicy_create);

router.get('/open/downpolicy', downpolicy_controller.downpolicy);

module.exports = router;
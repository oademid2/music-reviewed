const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

// Require the controllers
const review_controller = require('../controllers/review.controller');

router.post('/user/addreview', checkAuth, review_controller.add_review);


router.get('/open/reviews', review_controller.reviews);


router.get('/open/getreview/:id', review_controller.get_review);

router.delete('/admin/deletereview/:id', review_controller.delete_review);


module.exports = router;
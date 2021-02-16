const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

// Require the controllers 
const song_controller = require('../controllers/song.controller');

// get list og songs -- old version
router.get('/open/song', song_controller.song);

// get list of songs
router.get('/open/songs', song_controller.songs);

//add a song --only authenticsted users
router.post('/admin/create', checkAuth, song_controller.song_create);

//get a song by id
router.get('/open/getsong/:id', song_controller.get_song);

//update song by d
router.put('/user/update/:id', song_controller.update_song);

router.delete('/admin/getsong/:id', song_controller.delete_song);



//router.put('/:id/update', product_controller.product_update);

module.exports = router;
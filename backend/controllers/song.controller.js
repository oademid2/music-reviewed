const Song = require('../models/song.model');

const sanitize = function(html){
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }
  


exports.song = function (req, res) {

    Song.find(function(err, result) {
        if (err)
            res.send(err);

        res.json(result);
    });
};

exports.songs = function (req, res) {
    Song.find(function(err, result) {
        if (err)
            res.send(err);

        res.json(result);
    });
};

exports.song_create = function (req, res,next) {
    let song = new Song(
        {
            title: req.body.title,
            artist: req.body.artist ,
            album: req.body.album  ,
            reviews: 0,
            genre: req.body.genre,
            track: req.body.track,
            rating: null,
            hidden: false,
            lastreview: null,
            year: req.body.year,
            dispute: null,
            notice: null,
            request: null,
        }
    );

    song.save(function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);

    })
};

exports.get_song = function (req, res) {
   Song.findById(req.params.id, function (err, song) {
        if (err) return next(err);
        res.send(song);
    })
};



exports.update_song = function (req, res) {
    Song.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, song) {
        if (err) return next(err);
        res.send(song);
    });
};

exports.delete_song = function (req, res) {
    Song.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
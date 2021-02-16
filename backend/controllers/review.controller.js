const Review = require('../models/review.model');

//Simple version, without validation or sanitation
/*exports.song = function (req, res) {
    //res.send('Greetings from the song controller!');
    Song.find(function(err, result) {
        if (err)
            res.send(err);

        res.json(result);
    });
};*/

exports.add_review = function (req, res,next) {
    let review = new Review(
        {
            title: req.body.title,
            email: req.body.email,
            review: req.body.review,
            songid: req.body.songid,
            stars: req.body.stars
      
        }
    );

    review.save(function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);

    })
};

exports.reviews = function (req, res) {
    Review.find(function(err, result) {
        if (err)
            res.send(err);

        res.json(result);
    });
};

exports.get_review = function (req, res) {
    Review.findById(req.params.id, function (err, review) {
         if (err) return next(err);
         res.send(review);
     })
 };
 
 exports.delete_review = function (req, res) {
    Review.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
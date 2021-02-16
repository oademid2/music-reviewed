const Contest = require('../models/colicy.model');


exports.contests = function (req, res) {
    Contest.find(function(err, result) {
        if (err)
            res.send(err);

        res.json(result);
    });
};


exports.update_contest = function (req, res) {
    Contest.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, contest) {
        if (err) return next(err);
        res.send(contest);
    });
};
const Downpolicy = require('../models/Downpolicy.model');


exports.downpolicy = function (req, res) {
    Downpolicy.find(function(err, result) {
        if (err)
            res.send(err);

        res.json(result[0]);
    });
};


exports.update_downpolicy = function (req, res) {
    Downpolicy.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, downpolicy) {
        if (err) return next(err);
        res.send(downpolicy);
    });
};


/*
exports.downpolicy_create = function (req, res,next) {
    let policy = new Downpolicy(
        {
           policydoc: '',
           contact: '',
           exists: false
        }
    );

    policy.save(function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);

    })
};*/
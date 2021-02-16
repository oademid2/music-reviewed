const Policy = require('../models/policy.model');


exports.policy = function (req, res) {
    Policy.find(function(err, result) {
        if (err)
            res.send(err);

        res.json(result[0]);
    });
};


exports.update_policy = function (req, res) {
    Policy.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, policy) {
        if (err) return next(err);
        res.send(policy);
    });
};
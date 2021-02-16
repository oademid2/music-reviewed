const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    title: {type: String, required: true},
    email: {type: String, required: true},
    review: {type: String, required: true},
    songid: {type: String, required: true},
    stars: {type: Number, required: false}
});

module.exports = mongoose.model('Review', ReviewSchema);
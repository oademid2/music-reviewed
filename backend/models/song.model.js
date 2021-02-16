const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    album: {type: String, required: false},
    year: {type: Number, required: false},
    track: {type: Number, required: false},
    genre: {type: Number, required: false},
    reviews: {type: Number, required: false},
    rating: {type: Number, required: false},
    hidden: {type: Boolean, required:true},
    lastreview: {type: Object, required: false},
    dispute: {type: Object, required: false},
    notice: {type: Object, required: false},
    request: {type: Object, required: false},

});


// Export the model
module.exports = mongoose.model('Song', SongSchema);
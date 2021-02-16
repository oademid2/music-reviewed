const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContestSchema = new Schema({
    type: {type: String, required: true},
    date: {type: String, required: true},
    comment: {type: String, required: true}
});


// Export the model
module.exports = mongoose.model('Contest', ContestSchema);
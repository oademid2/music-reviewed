const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DownpolicySchema = new Schema({
    policydoc: {type: String, required: true},
    contact: {type: String, required: true},
    exists: {type: Boolean, required: true}
});


// Export the model
module.exports = mongoose.model('Downpolicy', DownpolicySchema);
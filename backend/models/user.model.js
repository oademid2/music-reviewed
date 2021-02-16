const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    active: {type: Boolean, required:true},
    manager: {type: Boolean, required:true},
    verified: {type: Boolean, required: true},
    verToken: {type: String, required: false}
});

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

//create schema
const UserSchema = mongoose.Schema({
    Username: String,
    Password: String,
}
);

module.exports = mongoose.model('User',UserSchema);
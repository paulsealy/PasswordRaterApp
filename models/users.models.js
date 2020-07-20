const mongoose = require('mongoose');
//when inputting data they are both strings
//create schema
const UserSchema = mongoose.Schema({
    Username: String,
    Password: String,
}
);

module.exports = mongoose.model('User',UserSchema);
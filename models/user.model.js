//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const userSchema = mongoose.Schema({
    // personal information
    id: String,
    name: String,
    phone_number: String,
    email_address: String,
    password: String,
    date_of_birth: { type: Date, default: Date.now },
    gender: String,
    photo_url: { type: String, default: 'none' },
});

// exporting user schema.
module.exports = mongoose.model('user', userSchema);

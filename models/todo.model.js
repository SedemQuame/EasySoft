//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const todoSchema = mongoose.Schema({
    // personal information
    id: String,
    title: String,
    description: String,
    start_time: { type: Date, default: Date.now },
    deadline: { type: Date, default: Date.now },
    status: String,
    user_id: String,
});

// exporting user schema.
module.exports = mongoose.model('todo', todoSchema);

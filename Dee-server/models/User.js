const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    location: { type: String },
    password: { type: String, required: true },
    countryCode: { type: String },
    phoneNumber: { type: String }
});

module.exports = mongoose.model('User', UserSchema);

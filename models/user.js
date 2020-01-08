"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: Number, required: true },
    password: { type: String, required: true, select: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
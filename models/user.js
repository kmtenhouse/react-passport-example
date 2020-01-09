"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        max: [320, "Email address is too long"],
        required: true
    },
    password: {
        type: String,
        min: [8, "Password must be a minimum of 8 characters long"],
        max: [64, "Password cannot be greater than 64 characters long"],
        required: true,
        select: false
    }
});

userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
} 

const User = mongoose.model('User', userSchema);

module.exports = User;
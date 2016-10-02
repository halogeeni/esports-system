/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// subdocument schemas

var userBanSchema = new mongoose.Schema({
  name: String
});

var userPlatformSchema = new mongoose.Schema({
  name: String
});

// user parent schema

var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  _contactInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ContactInfo',
    required: true
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  pastTeams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  pastTournaments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
  }],
  platforms: [userPlatformSchema],
  birthday: {
    type: Date/*,
    required: true*/
  },
  bans: [userBanSchema],
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// set password for user
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

// check if password is valid
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    // seven days expiration time
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        nickname: this.nickname,
        // expiration is to be passed as unix time in seconds
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
};

mongoose.model('User', userSchema);

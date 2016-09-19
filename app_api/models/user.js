/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

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
    type: Date,
    required: true
  },
  bans: [userBanSchema]
    /*,
    hash: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    }
    */
}, {
  timestamps: true
});

mongoose.model('User', userSchema);

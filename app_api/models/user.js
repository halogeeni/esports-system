/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
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
    contactInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContactInfo',
      required: true
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
      }
    ],
    pastTeams: [
      {
        type: mongoose.Schema.Types.ObectId,
        ref: 'Team'
      }
    ],
    pastTournaments: [
      {
        type: mongoose.Schema.Types.ObectId,
        ref: 'Tournament'
      }
    ],
    platforms: [
      {
        name: String,
        type: String
      }
    ],
    registerDate: {
      type: Date
    },
    birthday: {
      type: Date,
      required: true
    },
    bans: [
      {
        type: String
      }
    ],
    hash: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    }
  }
);

mongoose.model('User', userSchema);

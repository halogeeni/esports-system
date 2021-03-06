/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    _adminUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    pastUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    additionalInfo: {
      type: String
    },
    pastTournaments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
      }
    ]
  },
  {
    timestamps: true
  }
);

mongoose.model('Team', teamSchema);

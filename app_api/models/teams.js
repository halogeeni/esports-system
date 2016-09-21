/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    adminUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    teamStats: [
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

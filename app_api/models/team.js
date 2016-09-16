/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    pastUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    additionalInfo: {
      type: String
    },
    teamStats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tournament'
        //and somehow the result
      }
    ],
    registerDate: {
      type: Date,
      required: true
    }
  }
);

mongoose.model('Team', teamSchema);

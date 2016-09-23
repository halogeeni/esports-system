/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var roundTeamSchema = new mongoose.Schema(
  {
    _team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    score: {
      type: Number
    }
  }
);

var roundSchema = new mongoose.Schema(
  {
    winnerTeam: roundTeamSchema,
    loserTeam: roundTeamSchema
  }
);

var matchSchema = new mongoose.Schema(
  {
    _game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true
    },
    _tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
      required: true
    },
    bestOf: {
      type: Number,
      enum: [1, 2, 3, 5],
      required: true
    },
    teams: [
      {
        // a reference to the teamid
        _team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Team',
          required: true
        },
        // team names are stored as strings, as they can change over time
        name: {
          type: String,
          required: true
        },
        // players are however persistent -> stored as objectids
        players: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
          }
        ]
      }
    ],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    rounds: [roundSchema]
  },
  {
    timestamps: true
  }
);

mongoose.model('Match', matchSchema, 'matches');

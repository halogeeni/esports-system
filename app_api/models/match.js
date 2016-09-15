/*jslint node: true */

var mongoose = require('mongoose');

var matchSchema = new mongoose.Schema(
  {
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
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
        team: {
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
    // TODO how to reference to the winning team?
    rounds: [
      {
        // now referencing to array of teams ( teams[0], teams[1] )
        winnerTeam: {
          type: Number,
          required: true
        },
        // scores are referenced same way
        scores: [
          {
            type: Number,
            required: true
          }
        ]
      }
    ]
  }
);

mongoose.model('Match', matchSchema, 'matches');

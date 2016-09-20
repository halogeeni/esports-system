/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true
    },
    matches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
      }
    ],
    info: {
      type: String
    },
    rules: {
      type: String
    },
    tournamentStructure: {
      type: String,
      enum: ['Single elimination', 'Double elimination', 'Round robin', 'GSL'],
      default: 'Single elimination',
      required: true
    },
    groupStage: {
      type: Boolean,
      default: false
    },
    groups: [
      {
        name: String,
        teams: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
          }
        ]
      }
    ],
    tournament_finished: {
      type: Boolean,
      required: true,
      default: false
    },
    sponsors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sponsor'
      }
    ],
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    max_teams: {
      type: Number
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
      }
    ],
    checkInStartDate: {
      type: Date
    },
    checkInEndDate: {
      type: Date
    },
    checkedInTeams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
      }
    ]
  },
  {
    timestamps: true
  }
);

mongoose.model('Tournament', tournamentSchema);

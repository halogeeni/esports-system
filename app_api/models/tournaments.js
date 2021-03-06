/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema(
  {
    name: String,
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
      }
    ]
  }
);

var tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    _game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true
    },
    _event: {
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
    hasGroupStage: {
      type: Boolean,
      default: false
    },
    groups: [groupSchema],
    isFinished: {
      type: Boolean,
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
    maxTeams: {
      type: Number,
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

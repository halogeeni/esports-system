/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    info: {
      type: String,
      required: true
    },
    _contactInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContactInfo',
      required: true
    },
    tournaments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
      }
    ],
    sponsors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sponsor'
      }
    ],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

mongoose.model('Event', eventSchema);

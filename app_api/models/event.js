/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true
    },
    eventInfo: {
      type: String,
      required: true
    },
    eventContactInfo: {
      type: String,
      required: true
    },
    eventTournaments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
      }
    ],
    eventSponsors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sponsor'
      }
    ],
    eventCreationDate: {
      type: Date,
      required: true
    },
    eventStartDate: {
      type: Date,
      required: true
    },
    eventEndDate: {
      type: Date,
      required: true
    }
  }
);

mongoose.model('Event', eventSchema, 'events');

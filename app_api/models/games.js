/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var mapSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    }
  }
);

var gameSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    // short name is an alternate title for displaying when space is scarce
    // i.e. Counter Strike: Global Offensive -> CS:GO
    shortName: {
      type: String,
      required: true
    },
    maps: [mapSchema],
    minPlayerCount: {
        type: Number,
        required: true
    },
    maxPlayerCount: {
        type: Number,
        required: true
    }
  }
);

mongoose.model('Game', gameSchema);

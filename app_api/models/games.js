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
    name: {
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

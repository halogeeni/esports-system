/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    maps: [
      {
        name: {
            type: String,
            required: true
        }
      }
    ],
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

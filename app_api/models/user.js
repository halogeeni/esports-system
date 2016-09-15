/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    }
  }
);

mongoose.model('User', userSchema, 'users');

/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema(
  {
    name: String
  }
);

mongoose.model('User', userSchema, 'users');

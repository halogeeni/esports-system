/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
    name: String
  }
);

mongoose.model('User', userSchema, 'users');

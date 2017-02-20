/*jslint node: true */
'use strict';

var mongoose = require('mongoose');

require('./teams');
require('./users');
require('./events');
require('./games');
require('./contactInfos');
require('./tournaments');
require('./matches');

// Create Mongoose connection to localhost db (DEVELOPMENT)
var dbURI = 'mongodb://localhost:27017/washbear';
mongoose.connect(dbURI);

// logging
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// db disconnect
var gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// Connection management

// nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// interrupt signal
process.on('SIGINT', function() {
  gracefulShutdown('SIGINT received', function() {
    process.exit(0);
  });
});

// termination signal
process.on('SIGTERM', function() {
  gracefulShutdown('SIGTERM received', function() {
    process.exit(0);
  });
});

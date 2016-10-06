/*jslint node: true */
'use strict';

require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./app_api/models/db');
require('./app_api/config/passport');

var compressor = require('node-minify');

//var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();

/*
// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');
*/

var appClientFiles = [
  'app_client/app.js',
  'app_client/common/services/authentication.service.js',
  'app_client/home/home.controller.js',
  'app_client/form/register.controller.js',
  'app_client/auth/login/login.controller.js',
  'app_client/players/players.controller.js',
  'app_client/event/events.controller.js',
  'app_client/teams/teams.controller.js',
  'app_client/teams/team.controller.js',
  'app_client/user/user.controller.js',
  'app_client/common/services/event.dataservice.js',
  'app_client/common/services/player.dataservice.js',
  'app_client/common/services/team.dataservice.js',
  'app_client/common/directives/navigation/navigation.controller.js',
  'app_client/common/directives/footer/footerGeneric.directive.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/sidenav/sideNavigation.directive.js',
  'app_client/common/directives/notification/notification.directive.js',
  'app_client/common/directives/ads/adbannerLeft/adbannerLeft.directive.js'
];

new compressor.minify({
  type: 'no-compress',
  fileIn: appClientFiles,
  fileOut: 'public/angular/washbear.min.js',
  callback: function(err, min) {
    console.log(err);
  }
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

//app.use('/', routes);
app.use('/api', routesApi);

/*
// catch all unidentified requests and respond with index.html
// KILLS HEROKU !!!

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

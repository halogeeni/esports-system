/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var Game = mongoose.model('Game');

var sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.addGame = function (req, res) {
  Game.create({
    fullName: req.body.fullName,
    shortName: req.body.shortName,
    maps: req.body.maps,
    minPlayerCount: req.body.minPlayerCount,
    maxPlayerCount: req.body.maxPlayerCount
  }, function (err, game) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, game);
    }
  });
};

module.exports.deleteGame = function (req, res) {
  var gameid = req.params.id;

  if (gameid) {
    Game
      .findByIdAndRemove(gameid).exec(function (err, game) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 204, null);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "no game id in request"
    });
  }
};

module.exports.getGame = function (req, res) {
  var gameid = req.params.id;

  if (req.params && gameid) {
    Game
      .findById(gameid).exec(
        function (err, game) {
          if (!game) {
            sendJsonResponse(res, 404, {
              "message": "no gameid in request"
            });
            return;
          } else if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 200, game);
        });
  } else {
    sendJsonResponse(res, 404, {
      "message": "no gameid in request"
    });
  }
};

module.exports.getGames = function (req, res) {
  Game.find({}, null, {
    sort: {
      name: 1
    }
  }, function (err, games) {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, games);
    }
  });
};

/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.addTeam = function(req, res) {
  var captain = req.body.adminUser;

  Team.create({
    name: req.body.name,
    _adminUser: captain,
    players: captain,
    additionalInfo: req.body.additionalInfo
  }, function(err, team) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      User.findByIdAndUpdate(captain, {
        $push: {
          "teams": team._id
        }
      }, function(err, player) {
        if (err) {
          sendJsonResponse(res, 404, err);
        }
      });
      sendJsonResponse(res, 201, team);
    }
  });
};

module.exports.deleteTeam = function(req, res) {
  var teamid = req.params.id;

  if (teamid) {
    Team
      .findByIdAndRemove(teamid).exec(
        function(err, team) {
          if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 204, null);
        });
  } else {
    sendJsonResponse(res, 404, {
      "message": "no teamid in request"
    });
  }
};

module.exports.getTeam = function(req, res) { 
  var teamid = req.params.id;

  if (req.params && teamid) {
    Team
      .findById(teamid)
      //.populate('_adminUser')
      .populate('players')
      .populate('pastUsers')
      //.populate('teamStats')
      .exec(
        function(err, team) {
          if (!team) {
            sendJsonResponse(res, 404, {
              "message": "teamid not found"
            });
            return;
          } else if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 200, team);
        });
  } else {
    sendJsonResponse(res, 404, {
      "message": "no teamid in request"
    });
  }
};

// no population here (yet) -> less payload
module.exports.getTeams = function(req, res) {
  Team.find({}, null, {
    sort: {
      name: 1
    }
  }, function(err, teams) {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, teams);
    }
  });
};

module.exports.addPlayer = function(req, res) {
  var teamId = req.params.teamid;
  var playerId = req.params.playerid;

  console.log('in addPlayer - teamId: ' + teamId + ', playerId: ' + playerId);

  if (req.params && playerId && teamId) {
    console.log('in addPlayer - passed param check');
    Team
      .findByIdAndUpdate(teamId, {
          $push: {
            "players": playerId
          },
          $pull: {
            "pastUsers": playerId
          }
        }, {
          new: true
        },
        function(err, team) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            // add respective teamid to player as well
            User.findByIdAndUpdate(playerId, {
              $push: {
                "teams": teamId
              }
            }, function(err, player) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 200, team);
              }
            });
          }
        });
  }
};

module.exports.removePlayer = function(req, res) {
  var teamId = req.params.teamid;
  var playerId = req.params.playerid;

  console.log('in removePlayer - teamId: ' + teamId + ', playerId: ' + playerId);

  if (req.params && playerId && teamId) {
    console.log('in removePlayer - passed param check');
    Team
      .findByIdAndUpdate(teamId, {
          $pull: {
            "players": playerId
          },
          $push: {
            "pastUsers": playerId
          }
        }, {
          new: true
        },
        function(err, team) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            // remove respective teamid from player as well
            User.findByIdAndUpdate(playerId, {
              $pull: {
                "teams": teamId
              }
            }, function(err, player) {
              if (err) {
                sendJsonResponse(res, 404, err);
              } else {
                sendJsonResponse(res, 200, team);
              }
            });
          }
        });
  }
};

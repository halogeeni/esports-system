/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var Team = mongoose.model('Team');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// TODO: addTeam niids teh captain player men to be added once you add neu team :>
// Check that this works :p

module.exports.addTeam = function(req, res) {
  Team.create({
    name: req.body.name
  }, function(err, team) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, team);
    }
  });
};

module.exports.deleteTeam = function(req, res) {
  var teamid = req.params.teamid;
  
  if (teamid) {
    Team
      .findByIdAndRemove(teamid).exec(
      function(err, user) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 204, null);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "No teamid in request."
    });
  }
};

module.exports.getTeam = function(req, res) { 
  var teamid = req.params.teamid;
  
  if (req.params && teamid) {
    Team
      .findById(teamid).exec(
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
      "message": "No teamid in request"
    });
  }
};

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

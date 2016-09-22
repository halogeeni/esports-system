/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Tournament = mongoose.model('Tournament');
var ContactInfo = mongoose.model('ContactInfo');
var Match = mongoose.model('Match');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// events

// insert new event to database
module.exports.addEvent = function(req, res) {
  ContactInfo.create({
    email: req.body.email,
    streetAddress: req.body.streetAddress,
    postalCode: req.body.postalCode,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    website: req.body.website
  }, function(err, contactInfo) {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      Event.create({
        name: req.body.name,
        info: req.body.info,
        _contactInfo: contactInfo._id,
        tournaments: req.body.tournaments,
        sponsors: req.body.sponsors,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      }, function(err, event) {
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          sendJsonResponse(res, 201, event);
        }
      });
    }
  });
};

// delete single event by id
module.exports.deleteEvent = function(req, res) {
  var eventid = req.params.id;
  if (eventid) {
    Event
      .findByIdAndRemove(eventid)
      .exec(
        function(err, event) {
          if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 204, null);
        }
      );
  } else {
    sendJsonResponse(res, 404, {
      "message": "no eventid in request"
    });
  }
};

// get single event by id
module.exports.getEvent = function(req, res) { 
  if (req.params && req.params.id) {
    Event
      .findById(req.params.id)
      .populate('_contactInfo')
      //.populate('tournaments')
      //.populate('sponsors')
      .exec(function(err, event) {
        if (!event) {
          sendJsonResponse(res, 404, {
            "message": "eventid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, event);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "no eventid in request"
    });
  }
};

// no population here (yet) -> less payload
module.exports.getEvents = function(req, res) {
  Event.find({}, null, {
    sort: {
      name: 1
    }
  }, function(err, events) {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, events);
    }
  });
};

// tournaments

module.exports.addTournament = function(req, res) {
  Tournament.create({
    name: req.body.name,
    _game: req.body.game,
    matches: req.body.matches,
    info: req.body.info,
    rules: req.body.rules,
    tournamentStructure: req.body.tournamentStructure,
    hasGroupStage: req.body.hasGroupStage,
    groups: req.body.groups,
    isFinished: req.body.isFinished,
    sponsors: req.body.sponsors,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    maxTeams: req.body.maxTeams,
    teams: req.body.teams,
    checkInStartDate: req.body.checkInStartDate,
    checkInEndDate: req.body.checkInEndDate
  }, function(err, tournament) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, tournament);
    }
  });
};

module.exports.deleteTournament = function(req, res) {
  var tournamentId = req.params.id;

  if (tournamentId) {
    Tournament
      .findByIdAndRemove(tournamentId).exec(
      function(err, tournament) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 204, null);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "no tournamentid in request"
    });
  }
};

module.exports.getTournament = function(req, res) { 
  var tournamentId = req.params.id;

  if (req.params && tournamentId) {
    Tournament
      .findById(tournamentId)
      .populate('_game')
      .populate('matches')
      .populate('teams')
      .exec(
      function(err, tournament) {
        if (!tournament) {
          sendJsonResponse(res, 404, {
            "message": "tournamentid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, tournament);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "no tournamentid in request"
    });
  }
};

module.exports.getTournaments = function(req, res) {
  Tournament.find({}, null, {
    sort: {
      name: 1
    }
  }, function(err, tournament) {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, tournament);
    }
  });
};

// matches

module.exports.addMatch = function(req, res) {
  Match.create({
    name: req.body.name,
    _game: req.body.game,
    matches: req.body.matches,
    info: req.body.info,
    rules: req.body.rules,
    tournamentStructure: req.body.tournamentStructure,
    hasGroupStage: req.body.hasGroupStage,
    groups: req.body.groups,
    isFinished: req.body.isFinished,
    sponsors: req.body.sponsors,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    maxTeams: req.body.maxTeams,
    teams: req.body.teams,
    checkInStartDate: req.body.checkInStartDate,
    checkInEndDate: req.body.checkInEndDate
  }, function(err, team) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, team);
    }
  });
};

module.exports.deleteMatch = function(req, res) {
  var matchId = req.params.id;

  if (matchId) {
    Match
      .findByIdAndRemove(matchId).exec(
      function(err, match) {
        if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 204, null);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "no matchid in request"
    });
  }
};

module.exports.getMatch = function(req, res) { 
  var matchId = req.params.id;

  if (req.params && matchId) {
    Match
      .findById(matchId)
      .populate('_game')
      .populate('_team')
      .populate('players')
      .exec(
      function(err, match) {
        if (!match) {
          sendJsonResponse(res, 404, {
            "message": "matchid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, match);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "no matchid in request"
    });
  }
};

module.exports.getMatches = function(req, res) {
  // TODO so far this returns all matches in the db
  Match.find({}, null, {
    sort: {
      name: 1
    }
  }, function(err, match) {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, match);
    }
  });
};
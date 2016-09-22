/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var ContactInfo = mongoose.model('ContactInfo');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

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
      eventName: 1
    }
  }, function(err, events) {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      sendJsonResponse(res, 200, events);
    }
  });
};

var mongoose = require('mongoose');
var Event = mongoose.model('Event');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// insert new event to database
module.exports.addEvent = function(req, res) {

    Event.create({
      eventName: req.body.eventName,
      eventInfo: req.body.eventInfo,
      eventContactInfo: req.body.eventContactInfo,
      eventTournaments: req.body.eventTournaments,
      eventSponsors: req.body.eventSponsors,
      eventStartDate: req.body.eventStartDate,
      eventEndDate: req.body.eventEndDate
    }, function(err, event) {
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 201, event);
      }
    });
  
};

// delete single event by id
module.exports.deleteEvent = function(req, res) {

  var eventid = req.params.eventid;
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
      .populate('_eventName')
      .populate('_eventInfo')
      .populate('_eventContactInfo')
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
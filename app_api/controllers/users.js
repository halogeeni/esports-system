/*jslint node: true */
'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var User = mongoose.model('User');
var ContactInfo = mongoose.model('ContactInfo');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// insert new user to database
module.exports.addUser = function(req, res) {
  if (!req.body.firstname ||
      !req.body.lastname ||
      !req.body.nickname ||
      !req.body.email ||
      !req.body.birthday ||
      !req.body.streetAddress ||
      !req.body.postalCode ||
      !req.body.city ||
      !req.body.country ||
      !req.body.phone ||
      !req.body.website ||
      !req.body.password)
  {
      sendJsonResponse(res, 400, {
          "message": "all fields are required"
      });
      return;
  }

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
      var _salt = crypto.randomBytes(32).toString('hex');
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        nickname: req.body.nickname,
        birthday: req.body.birthday,
        _contactInfo: contactInfo._id,
        salt: _salt,
        hash: crypto.pbkdf2Sync(req.body.password, _salt, 10000, 512, 'sha512')
                    .toString('hex')
      }, function(err, user) {
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          // we shouldn't return any payload on successful creation, only 201
          sendJsonResponse(res, 201, { "message" : "user created" });
        }
      });
    }
  });
};

module.exports.deleteUser = function(req, res) {
  // TODO related ContactInfo should be deleted as well
  var userid = req.params.userid;
  if (userid) {
    User
      .findByIdAndRemove(userid)
      .exec(
        function(err, user) {
          if (err) {
            sendJsonResponse(res, 404, err);
            return;
          }
          sendJsonResponse(res, 204, null);
        }
      );
  } else {
    sendJsonResponse(res, 404, {
      "message": "no userid in request"
    });
  }
};

// get single user by id
// TODO add populate to tournaments etc.
module.exports.getUser = function(req, res) { 
  if (req.params && req.params.id) {
    User
      .findById(req.params.id)
      .populate('_contactInfo')
      .populate('teams')
      .exec(function(err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "userid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, user);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "no userid in request"
    });
  }
};

// get all users sorted alphabetically by nickname ( case sensitive :D )
// no population here (yet) -> less payload
module.exports.getUsers = function(req, res) {
  User
    .find({}, null, {
      sort: {
        nickname: 1
      }
    }, function(err, users) {
      if (err) {
        sendJsonResponse(res, 404, err);
      } else {
        sendJsonResponse(res, 200, users);
      }
    });
};

/*

-WIP-

module.exports.updateUser = function(req, res) {
    if (!req.params.userid) {
        sendJsonResponse(res, 404, {
            "messsage": "userid is required"
        });
        return;
    }

    Vid
        .findById(req.params.userid)
        .exec(
            function(err, user) {
                if (!vuser) {
                    sendJsonResponse(res, 404, {
                        "message": "userid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }

                video.title = req.body.title;
                video.description = req.body.description;
                video.save(function(err, video) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, video);
                    }
                });
            });
};



EXAMPLE CODE

// update existing video by id
module.exports.videosUpdateOne = function(req, res) {
    if (!req.params.videoid) {
        sendJsonResponse(res, 404, {
            "messsage": "videoid is required"
        });
        return;
    }

    Vid
        .findById(req.params.videoid)
        .exec(
            function(err, video) {
                if (!video) {
                    sendJsonResponse(res, 404, {
                        "message": "videoid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }

                video.title = req.body.title;
                video.description = req.body.description;
                video.save(function(err, video) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, video);
                    }
                });
            });
};

*/

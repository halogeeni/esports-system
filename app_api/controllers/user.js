var mongoose = require('mongoose');
var User = mongoose.model('User');
var ContactInfo = mongoose.model('ContactInfo');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// insert new user to database
module.exports.addUser = function(req, res) {
  var contactInfoId;

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
      contactInfoId = contactInfo._id;
    }
  });

  // attempt to create user only if contactinfo was created
  if (contactInfoId) {
    User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      nickname: req.body.nickname,
      birthday: req.body.birthday,
      _contactInfo: contactInfoId
    }, function(err, user) {
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        sendJsonResponse(res, 201, user);
      }
    });
  }
};

module.exports.deleteUser = function(req, res) {
  // TODO related ContactInfo should be deleted as well
  var userid = req.params.userid;
  if (userid) {
    Vid
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

// get single video by id
module.exports.getUser = function(req, res) { 
  if (req.params && req.params.userid) {
    User
      .findById(req.params.userid)
      .populate('_contactInfo')
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
module.exports.getUsers = function(req, res) {
  User
    .find({}, null, {
      sort: {
        nickname: 1
      }
      .populate('_contactInfo')
    }, function(err, users) {
      if (err) {
        sendJsonResponse(res, 404, err);
      } else {
        sendJsonResponse(res, 200, users);
      }
    });
};

/*

TODO update user by id

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

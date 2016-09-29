var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// user login controller
module.exports.login = function(req, res) {
    if (!req.body.email ||  !req.body.password) {
        sendJsonResponse(res, 400, {
            "message": "all fields are required"
        });
        return;
    }

    passport.authenticate('local', function(err, user, info) {
        var token;

        if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }

        if (user) {
            token = user.generateJwt();
            sendJsonResponse(res, 200, {
                "token": token
            });
        } else {
            sendJsonResponse(res, 401, info);
        }
    })(req, res);
};

const User = require('../models/user');
const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config');
const cors = require('cors');

let userId = '';

// routes to handle social features, following, getting follow requests, etc.
//middleware to verify a tokens

routes.use((req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    //decode token
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token. '});
            } else {
                req.decoded = decoded;
                userId = decoded._doc._id;
                next();
            }
        });
    }
    // if there is no token
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//gets a user by username
routes.get('/user/:username', cors(corsOptions), (req, res) => {
    let username = req.params.username;
    User.find({name: username}, (err, user) => {
        res.json(user);
    });
});


//returns list of following
routes.get('/following', (req, res) => {
    // get the current user object
    User.findById(userId, (err, user) => {
        res.json(user.following);
    });
});

//returns list of followers
routes.get('/followers', (req, res) => {
    // get the current user object
    User.findById(userId, (err, user) => {
        res.json(user.followers);
    });
});

//sends a follow request
routes.post('/followRequest', (req, res) => {
    let recipientId = req.body.userGuidToAdd;

    User.find({guid: recipientId}, (err, userToFollowReturn) => {
        if (err) {
            console.log(err);
            res.json({success: false});
        }

        let userToFollow = userToFollowReturn[0];

        //add a following request to this user
        User.findById(userId, (err, currUser) => {

            if (err) {
                res.json({success: false});
            }

            let currUserGuid = currUser.guid;

            //check to see if the current user has already sent a request
            if (userToFollow.followRequests.indexOf(currUserGuid) === -1) {
                //add to the chosen users follow requests
                userToFollow.followRequests.push(currUserGuid);
                userToFollow.save();

                res.json({success: true});
            } else {
                res.json({success: false, statusCode:4001, message: 'User already submiitted request.'})
            }


        });
    });
});


//Confirms follow request and updates documents for both the requester
//and approver
routes.post('/followAccept', (req, res) =>  {
    let requesterGuid = req.body.reqGuid;

    //find the current user
    User.findById(userId, (err, currUser) => {
        //make sure we have follow requests
        if (currUser.followRequests.length === 0) {
            res.json({success: false, message: 'Empty list of following requests.'});
        }

        //find the requester
        User.find({guid: requesterGuid}, (err, requestUserReturn) => {
            if (err) {
                console.log(err);
                res.json({success: false});
            }

            if (requestUserReturn.length === 0) {
                res.json({success: false, statusCode:4004, message: 'Requester not found'});
            }

            //guid's assigned are unique, we know it's the first entry
            let requestUser = requestUserReturn[0];

            //add the current user to the requestors `following`
            requestUser.following.push(currUser.guid);
            requestUser.save((err, saved) => {
                //update the current user to include the newly accepted follower in 'followers'
                currUser.followers.push(requestUser.guid);

                //update follow requests
                let idx = currUser.followRequests.indexOf(requestUser.guid);
                currUser.followRequests.splice(idx, 1);

                currUser.save();

                res.json({success: true});
            });
        });

    });

});

//ignore follow request
routes.post('/followIgnore', (req, res) => {
    let requesterGuid = req.body.reqGuid;

    //get current user
    User.findById(userId, (err, user) => {
        if (err) {
            console.log(err);
            res.json({success: false});
        }

        console.log(user);

        //remove the users request from request list
        let idx = user.followRequests.indexOf(requesterGuid);

        if (idx > -1) {
            user.followRequests.splice(idx, 1);
            user.save();
        }

        res.json({success: true});
    });
});

module.exports = routes;

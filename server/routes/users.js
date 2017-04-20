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

//neccessary on all other routes
routes.options('*', cors());


//TODO: Modify to return non-sensitive information
//for search page
routes.get('/allUsers', (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});


//gets the current user
routes.get('/currentUser', (req, res) => {
    User.findById(userId, (err, user) => {
        if (err) {
            console.log(err);
            return res.json({success: false});
        }

        res.json({user: user});
    });
})


//gets a user by username
routes.get('/user/:username', (req, res) => {
    let username = req.params.username;
    User.find({name: username}, (err, user) => {
        if (user.length > 0) {
            //pass back only profile information
            //exclude pw, other sensitive data

            // TODO: Add user current list to return

            let profileUser = {
                username: user[0].name,
                guid: user[0].guid,
                followers: user[0].followers,
                following: user[0].following,
                followRequests: user[0].followRequests
            }

            res.json(profileUser);
        }

        else { //no user was found
            res.json({userNotFound: true});
        }


    });
});


//gets a user by guid
routes.get('/user/guid/:guid', (req, res) => {
    let guid = req.params.guid;

    User.findOne({guid: guid}, (err, user) => {
        if (err) throw err;

        let safeUserObj = {
            username: user.name,
            guid: user.guid
        }

        res.json(safeUserObj);
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

        console.log(currUser);

        if (currUser.followRequests.length === 0) {
            return res.json({success: false, message: 'Empty list of following requests.'});
        }

        //find the requester
        User.find({guid: requesterGuid}, (err, requestUserReturn) => {
            if (err) {
                console.log(err);
            }

            if (requestUserReturn.length === 0) {
                return res.json({success: false, statusCode:4004, message: 'Requester not found'});
            } else {
                //guid's assigned are unique, we know it's the first entry
                let requestUser = requestUserReturn[0];

                //add the current user to the requestors `following`
                requestUser.following.push(currUser.guid);

                requestUser.save((reqUserErr, reqUserSaved) => {

                    //update the current user to include the newly accepted follower in 'followers'
                    currUser.followers.push(requestUser.guid);

                    //update follow requests
                    let idx = currUser.followRequests.indexOf(requestUser.guid);
                    currUser.followRequests.splice(idx, 1);

                    currUser.save((currUserErr) => {
                        if (currUserErr) {
                            console.log(currUserErr);
                        }

                        res.json({success: true});
                    });
                });
            }
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

        //remove the users request from request list
        let idx = user.followRequests.indexOf(requesterGuid);

        if (idx > -1) {
            user.followRequests.splice(idx, 1);
            user.save();
        }

        res.json({success: true});
    });
});


//unfollows a user
routes.post('/unfollowUser', (req, res) => {
    let unfolloweeGuid = req.body.unfollowGuid;
    // get the current user
    User.findById(userId, (err, user) => {
        if (err) {
            return res.json({success: false});
        }

        //used in the next save operation
        let currentUserGuid = user.guid;

        let idx = user.following.indexOf(unfolloweeGuid);

        if (idx > -1) {
            user.following.splice(idx, 1);

        }
        user.save((err) => {
            if (err) {
                return res.json({success: false, error: err});
            }

            //Remove from the unfollowee's followers

            User.findOne({guid: unfolloweeGuid}, (err, unfollowee) => {
                let idx = unfollowee.followers.indexOf(currentUserGuid);

                if (idx > -1) {
                    unfollowee.followers.splice(idx, 1);
                }

                unfollowee.save((err) => {
                    if (err) {
                        return res.json({success: false, error: err});
                    }

                    res.json({success: true});
                });
            });

        });

    });

});

module.exports = routes;

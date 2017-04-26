const User = require('../models/user');
const List = require('../models/list');
const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config');
const cors = require('cors');

let userId = '';

// Public routes needed for profiles

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

//returns todays list by date and user id
routes.get('/profileList', (req, res) => {
    let id = req.query.userGuid;

    List.findOne({user_guid: id}, (err, list) => {
        res.json(list);
    });
});


module.exports = routes;

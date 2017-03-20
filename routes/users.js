const User = require('../models/user');
const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config');

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

//returns list of following
routes.get('/following', (req, res) => {
    // get the current user object
    User.find({}, (err, user) => {
        res.json(user.following);
    });
});

//returns list of followers
routes.get('/followers', (req, res) => {
    // get the current user object
    User.find({}, (err, user) => {
        res.json(user.followers);
    });
});

//TODO:
//sends a follow request

//TODO:
//adds a user to following

//TODO:
//adds a user to followers


module.exports = routes;

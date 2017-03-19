const User = require('../models/user');
const express = require('express');
const routes = express.Router();

const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const List = require('../models/list');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('../config');

// route middleware to verify a tokens

routes.use((req, res, next) => {
    // check header or url parameters or post parameters for token
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

//test route to return all users
routes.get('/allUsers', (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});

module.exports = routes;

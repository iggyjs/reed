const User = require('../models/user');
const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const config = require('../config');
const cors = require('cors');


routes.options('*', cors());

// TODO: Sanitize input for both
//logs a user in
routes.post('/login', (req, res) => {
    User.findOne({
        name: req.body.name
    }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            // check if password matches
            bcrypt.compare(req.body.password, user.password, (err, response) => {
                if (response == true) {
                    // if user is found and password is right
                    // create a token
                    let token = jwt.sign(user, config.secret, {
                        expiresIn: '1d' // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                } else {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                }
            });
        }
    }); //end User.findOne
});

//creates a new user
routes.post('/signup', (req, res) => {
    let payload = req.body;
    let pw = req.body.password;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(pw, salt, (err, hash) => {
            let user = new User({
                guid: shortid.generate(),
                name: payload.name,
                password: hash,
                admin: true
            });

            user.save((err, user) => {
                if (err) throw err;

                let token = jwt.sign(user, config.secret, {
                    expiresIn: '1d' // expires in 24 hours
                });

                console.log('User saved successfully');
                res.json({ success: true, token: token });
            });
        });
    });
});

module.exports = routes;

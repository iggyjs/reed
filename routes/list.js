const User = require('../models/user');
const List = require('../models/list');
const express = require('express');
const routes = express.Router();

const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');

const saltRounds = 10;
const config = require('../config');

let userId = '';

// route middleware to verify a tokens
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

//test route to return all users
routes.get('/allUsers', (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});


//creates a new list associated with the current user
routes.post('/lists', (req, res) => {
    let payload = req.body;
    let title = payload.title;
    let currDate = moment().format('MM:DD:YYYY');

    let list = new List({
        user_guid: userId,
        listTitle: title,
        date: currDate
    });

    list.save((err) => {
        if (err) throw err;

        res.json({ success: true });
    });
});

//returns all lists associated with the current user
routes.get('/lists', (req, res) => {
    List.find({user_guid: userId}, (err, data) => {
        res.json(data);
    });
});

//returns todays list by date and user id
routes.get('/currList', (req, res) => {
    let today = moment().format('MM:DD:YYYY');

    List.findOne({user_guid: userId, date: today}, (err, list) => {
        res.json(list);
    });
});

//adds a new article to the current list
routes.post('/addArticle', (req, res) => {
    let today = moment().format('MM:DD:YYYY');
    let payload = req.body;

    // TODO: Add image thumb
    let article = {
        title: payload.articleName,
        description: payload.articleDescription,
        link: payload.articleLink,
    };

    List.findOne({user_guid: userId, date: today}, (err, list) => {
        list.articles.push(article);

        list.save((err) => {
            if (err) throw err;

            res.json({success: true});

        });
    });

});

module.exports = routes;

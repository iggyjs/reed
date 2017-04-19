const User = require('../models/user');
const List = require('../models/list');
const Article = require('../models/article');
const express = require('express');
const routes = express.Router();

const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const cors = require('cors');

const saltRounds = 10;
const config = require('../config');

let userId = '';

//neccessary on all other routes
routes.options('*', cors());

// middleware to verify a tokens
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

//returns all lists
routes.get('/lists', (req, res) => {
    List.find({}, (err, data) => {
        res.json(data);
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
    List.findOne({user_id: userId}, (err, list) => {
        res.json(list);
    });
});

// clears current list
routes.post('/clearCurrList', (req, res) => {
    List.findOneAndUpdate({user_id: userId}, {$set: { articles: [] }}, {new: true}, (err, newList) => {
        
        if (err) throw err;

        res.json({success: true, list: newList});

    });
});


//adds a new article to the current list
routes.post('/addArticle', (req, res) => {
    let today = moment().format('MM:DD:YYYY');
    let payload = req.body;

    // TODO: Add image thumb
    let article = new Article({
        articleTitle: payload.articleTitle,
        articleDescription: payload.articleDes,
        articleLink: payload.articleLink,
    });

    List.findOneAndUpdate({user_id: userId}, {$push: {articles: article}}, {new: true}, (err, newList) => {

        if (err) throw err;

        res.json({success: true, list: newList});

    });
});

module.exports = routes;

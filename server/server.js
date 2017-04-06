const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./models/user');
const cors = require('cors');

const PORT = process.env.PORT || 8000;
mongoose.connect('mongodb://localhost/reed');

//routes
const auth = require('./routes/auth');
const list = require('./routes/list');
const users = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//temporary (I think?) middleware for development and having CORS header
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.options('*', cors());

//middleware to log requests
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

app.get('/', (req, res) => {
    res.send('Here\'s our API!');
});

app.use(bodyParser.json());

//apply our routes
app.use('/api', users, auth, list);

app.listen(PORT);
console.log('Server running at port ' + PORT + '...');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');
const User = require('./models/user');

const PORT = process.env.PORT || 8000;
mongoose.connect('mongodb://localhost/reed');

//routes
const auth = require('./routes/auth');
const list = require('./routes/list');

app.use(bodyParser.urlencoded({extended: false}));

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
app.use('/api', auth, list);

app.listen(PORT);
console.log('Server running at port ' + PORT + '...');

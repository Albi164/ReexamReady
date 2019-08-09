const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const checkJwt = require('express-jwt');
const config = require('config');
const path = require('path');

// const cors = require('cors');
//
// app.use(cors);
app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});
// app.use(
//     checkJwt({ secret: config.get('jwtSecret') }).unless({ path : openPaths})
// );

// let openPaths = [
//     '/api/users/authenticate',
//     '/api/jobs',
//     '/api/categories',
//     '/api/locations',
//     '/job/*',
//     '/jobs/*'
// ];
const port = process.env.PORT|| 5000;
app.use(cookieParser());
app.use(express.json());
//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://albi123:albi123@cluster0-ihrbv.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/programs', require('./routes/api/programs'));
app.use('/api/tvchannel', require('./routes/api/tvchannel'));
app.use('/api/favorite', require('./routes/api/favorite'));

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('/api', function (req, res) {
    const index = path.join(__dirname, '/frontend/build', 'index.html');
    res.sendFile(index);
});

app.listen(port, () => console.log(`Exam API running on port ${port}!`));
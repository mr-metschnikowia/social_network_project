const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
var hpp = require('hpp');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require("cors");
// getting packages

var app = express();
// initialise express instance

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// configure body-parser

app.use(cors());
// allow cors requests

app.use(hpp());
// use HPP to prevent parameter pollution attacks

app.disable('x-powered-by');
// disabled x-powered-by headers - to prevent hackers from getting server info

dotenv.config();
// bring environmental variables from .env files - they are added to process.env
process.env.TOKEN_SECRET;
// access environmental variables from process.env

let usersCollection = null;
// create collections

const API_PORT = 3000;
//defining global variables

/// MongoDB Configuration ///
const config = require('./config-db.js');
// get MongoDB Atlas config file
const url = `mongodb+srv://${config.username}:${config.password}@${config.cluster}.mongodb.net/${config.database}?retryWrites=true&w=majority`;
// build MongoDB Atlas connection string
const client = new MongoClient(url, { useUnifiedTopology: true });
// use connection string to initialise new mongo client 

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
// function to generate JWT access token based on username and server's secret key, expires in 30min

function authenticateToken(req, res, next) {
    try {
        const token = req.headers['authorization'];
        // check if valid header included

        if (token.length < 1) {
            return res.status(401);
        }
        // handles cases when JWT access token is missing - other methods of handling this method failed

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        // verify access token 

        req.userTokenDeets = decoded;
        // attach decrypted username to request

    } catch (err) {
        console.log(err);
        return res.status(401);
    }

    next();
}
// JWT token authentication middleware

function getProfilePhoto(req, res, next) {
    const username = req.userTokenDeets.username;
    client.db().collection('profilePics').findOne({ username: username })
        .then(doc => {
            if (doc === null) {
                res.status(400).json({ username: "", photo: "" });
            }
            else {
                res.status(200).json(doc);
            }
        })
}
// function to return user profile photo and username

app.get("/api/getProfilePhoto", authenticateToken, getProfilePhoto);
// get profile photo endpoint

app.post("/api/authentication-test", authenticateToken, (req, res, next) => {
    res.send(`${req.userTokenDeets.username} authenticated successfully`);
})
// JWT authentication test

const validateUser = (req, res, next) => {
    try {
        if (req.body.username.length < 1 || req.body.password.length < 1) {
            return  res.status(400).send("Invalid username or password!");
        }
        // checks if username and password exist and if they are valid
    } catch (err) {
        return res.status(400).send("Invalid username or password!");
    }

    next()
}
// validates user details upon registration

app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Pass to next layer of middleware
    next();
});
// CORS settings, as Vue and Node servers hosted on different ports of same machine

app.post('/api/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    // get data from request body
    const query = { username: username, password: password };
    // construct db query
    usersCollection.findOne(query)
        .then(doc => {
            if (doc) {
                const token = generateAccessToken({ username: req.body.username });
                // generate JWT token
                res.status(200).json(token);
                // send token to user
            } else {
                res.status(400).send("Username or password incorrect!");
            }
        })
    // query database and send response
});
// post endpoint
// recieve: username and password data
// database: check if exists in user collection
// response: success/failure

app.post('/api/register', validateUser, (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = { username: username };
    usersCollection.findOne(query)
        .then(doc => {
            if (doc) {
                res.status(400).send("User already exists");
            } else {
                usersCollection.insertOne({ username: username, password: password })
                .then(jsn => res.status(200).send());
            }
        })
});
// new user registration endpoint

/// Connect to MongoDB Atlas Database ///
client.connect()
    .then (conn => console.log('connection successful'))
    .catch(err => { console.log(`Could not connect to ${url.replace(/:([^:@]{1,})@/, ':****@')}`, err); throw err; })
     // confirm connection

    .then(conn => usersCollection = client.db().collection('users'))
    .catch(err => console.log(`collection not found`))
    // retrieve preexisting collections 

    .then(() => app.listen(API_PORT, () => console.log(`Listening on localhost: ${API_PORT}`)))
    .catch(err => console.log(`Could not start server`, err))
    // launch server on API port 3000
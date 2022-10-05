const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
var hpp = require('hpp');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// getting packages

var app = express();
// initialise express instance

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// configure body-parser

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
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Pass to next layer of middleware
    next();
});
// allows CORS, as Vue and Node servers hosted on different ports of same machine

app.post('/api/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    // get data from request body
    const query = { username: username, password: password };
    // construct db query
    usersCollection.findOne(query)
        .then(doc => {
            if (doc) {
                res.status(200).send();
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

    .then(() => usersCollection.find().toArray().then(docs => console.log(docs)))
    .catch(err => console.log("cannot print collection"))
    // print users collection

    .then(() => app.listen(API_PORT, () => console.log(`Listening on localhost: ${API_PORT}`)))
    .catch(err => console.log(`Could not start server`, err))
    // launch server on API port 3000
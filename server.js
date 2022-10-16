const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
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

function getMyProfile(req, res, next) {
    const username = req.userTokenDeets.username;
    client.db().collection('profiles').findOne({ username: username })
        .then(doc => {
            if (doc === null) {
                res.json({
                    username: username, profilePhoto: "data:image/png;base64,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",
                    about: "About me!", backgroundPhoto: "data:image/jpeg;base64,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"
                });
                // default user details if they havent been created yet
            }
            else {
                res.json(doc);
            }
        })
}
// function to get logged in user profile data for profile page
// when users register document should be made in profiles collection

function updateMyProfile(req, res, next) {
    const username = req.userTokenDeets.username;
    const query = { username: username };
    const options = { upsert: true };
    const update = {
        $set: { about: req.body.about, backgroundPhoto: req.body.backgroundPhoto, profilePhoto: req.body.profilePhoto }
    };
    client.db().collection("profiles").updateOne(query, update, options)
        .then(doc => {
            if (doc != null) {
                res.status(200).send("Profile updated successfully");
            } else {
                res.status(400).send("Failed to update profile!");
            }
        })
    // if profile does exist, update with new data
    // if profile doesn't exist, create a new profile in the database
}
// function to update profile

function getUsers(req, res, next) {
    const query = req.params.QUERY;
    const regex = new RegExp(`^${query}`, "i");
    // make regex from query
    client.db().collection('profilePics').find({ username: regex }).toArray()
        // query database using regex and return array of results 
        .then(docs => {
            if (docs != null) { res.json(docs); }
            else { res.json([]) };
        })
        .catch(() => console.log("error finding docs"))
}
// get users - gets all users and their profile photos

function validatePost(reqBody, username) {
    if (!reqBody.title || reqBody.title.length < 1) {
        throw new Error("Post is missing title!");
        //res.status(400).send("Post is missing title!");
        //return
    // check post title
    } else if (!reqBody.content || reqBody.content.length < 1) {
        throw new Error("Post is missing content!");
        //res.status(400).send("Post is missing content!");
        //return 
    }
    // check post content

    return { username: username, title: reqBody.title, content: reqBody.content }
    // return post object
}
// function checks if post is in correct format

function createPost(req, res, next) {
    const post = validatePost(req.body, req.userTokenDeets.username);
    // create post document
    client.db().collection("posts").insertOne(post)
        .then(() => res.status(200).send("Post created successfully!"))
        .catch((err) => res.status(400).send("Failed to create post!"))
    // insert post into collection and handle result 
}
// function to create new post

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

/// Endpoints ///

app.get("/api/getMyProfile", authenticateToken, getMyProfile);
// get logged in user profile details endpoint

app.post("/api/updateMyProfile", authenticateToken, updateMyProfile);
// endpoint to update personal profile

app.post("/api/createPost", authenticateToken, createPost);
// create post endpoint

app.get("/api/getUsers/:QUERY", authenticateToken, getUsers);
// get users for search bar endpoint

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
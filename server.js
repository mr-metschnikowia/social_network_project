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
    const cookie = req.headers['authorization'];
    const startOfToken = cookie.indexOf("token") > -1 ? cookie.indexOf("token") + 6 : 0;
    const endOfToken = cookie.indexOf("userProfile") > -1 ? cookie.indexOf("userProfile") : cookie.length;
    const token = cookie.slice(startOfToken, endOfToken);
    // extract JWT token from cookie

    if (token.length < 1) {
        res.status(401);
    }
    // handles cases when JWT access token is missing - other methods of handling this method failed

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        // verify access token 
        req.userTokenDeets = decoded;
        // attach decrypted username to request

        next();
        // proceed to next middleware function
    } catch (TokenExpiredError) {
        res.status(401);
    }
    // handle jwt expired error
}
// JWT token authentication middleware

function getUserProfile(req, res, next) {
    const loggedInUser = req.userTokenDeets.username;
    const username = req.params.USER;
    const yourAccount = loggedInUser === username ? true : false;
    // check if user is trying to access their own account or someone else's
    client.db().collection('profiles').findOne({ username: username })
        .then(doc => {
            if (doc === null) {
                res.json({
                    yourAccount: yourAccount,
                    username: username,
                    profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlWMZ09kj-SybZSnCv5J2qeouVqxiUC-ru6g&usqp=CAU",
                    about: "incorrect username sent in fetch request",
                    backgroundPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4PdlaAGOw430gRc3YX0jSbj_vEUNFV5w4Zg&usqp=CAU",
                });
                // default user details if they havent been created yet
            }
            else {
                doc["yourAccount"] = yourAccount;
                // add data about whether user is trying to access someone else's account or their own 
                res.json(doc);
            }
        })
}
// function to get profile of specified user

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
    // check post title
    } else if (!reqBody.content || reqBody.content.length < 1) {
        throw new Error("Post is missing content!");
        //return 
    }
    // check post content
    else if (!reqBody.date) {
        throw new Error("Post is missing date!");
    }
    // check post date

    return { username: username, title: reqBody.title, content: reqBody.content, date: reqBody.date }
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

function followUser(req, res, next) {
    const loggedInUser = req.userTokenDeets.username;
    const userToFollow = req.params.USER;
    const query = { user: loggedInUser, following: userToFollow }
    client.db().collection("followers").findOne(query)
        .then(doc => {
            if (doc === null) {
                client.db().collection("followers").insertOne(query);
                res.status(200).send(`Following ${userToFollow}`);
            } else {
                res.status(400).send(`You already follow ${userToFollow}`)
            }
        })
}
// function checks if logged in user is already following user, if no, logged in user: user key-value pair is inserted into db

async function getFollowerCount(req, res, next) {
    const username = req.params.USER;
    const query = { following: username };
    await client.db().collection("followers").countDocuments(query)
        .then(count => res.json({ followerCount: count }))
}
// function counts number of documents in followers collection where following === username

async function getFeed(req, res, next) {
    const username = req.userTokenDeets.username;
    const followingQuery = { user: username };
    const followingDocuments = await client.db().collection("followers").find(followingQuery).toArray();
    const followingUsers = followingDocuments.map(document => document.following);
    // get all usernames of people that you are following
    const posts = await client.db().collection("posts").find({ "username": { "$in": followingUsers } }).toArray();
    // get posts from users that you follow
    res.json(posts.reverse());
    // send posts in json response in chronological order (latest first)
    // error handling - if not following anyone or if followers have never made any posts
}
// function gets all posts of users that you follow in chronological order (most recent first)

async function getFollowers(req, res, next) {
    const username = req.params.USER;
    const documents = await client.db().collection("followers").find({ following: username }).toArray();
    const followers = documents.map(document => document.user);
    // get all users who are following you
    const profiles = await client.db().collection("profilePics").find({ "username": { "$in": followers } }).toArray();
    // get follower profile info
    res.json(profiles);
}
// function to get all followers of authenticating user

async function getFollowing(req, res, next) {
    const username = req.params.USER;
    const documents = await client.db().collection("followers").find({ user: username }).toArray();
    const following = documents.map(document => document.following);
    // get all users who you are following
    const profiles = await client.db().collection("profilePics").find({ "username": { "$in": following } }).toArray();
    // get following profile info
    res.json(profiles);
}
// function to get all users that user is following

/// Endpoints ///

app.get("/api/getFollowerCount/:USER", authenticateToken, getFollowerCount);
// get user count endpoint

app.get("/api/followUser/:USER", authenticateToken, followUser);
// follow specified user endpoint

app.get("/api/getUserProfile/:USER", authenticateToken, getUserProfile);
// get profile of specified user

app.post("/api/updateMyProfile", authenticateToken, updateMyProfile);
// endpoint to update personal profile

app.post("/api/createPost", authenticateToken, createPost);
// create post endpoint

app.get("/api/getUsers/:QUERY", authenticateToken, getUsers);
// get users for search bar endpoint

app.get("/api/getProfilePhoto", authenticateToken, getProfilePhoto);
// get profile photo endpoint

app.get("/api/getFeed", authenticateToken, getFeed);
// get homepage feed endpoint

app.get("/api/getFollowers/:USER", authenticateToken, getFollowers);
// get followers endpoint

app.get("/api/getFollowing/:USER", authenticateToken, getFollowing);
// get following endpoint

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
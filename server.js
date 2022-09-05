//const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
// getting packages

var app = express();
// initialise express instance

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// configure body-parser

let usersCollection = null;
// create collections

const API_PORT = 3000;
//defining global variables

const config = require('./config-db.js');
// get MongoDB Atlas config file
const url = `mongodb+srv://${config.username}:${config.password}@${config.cluster}.mongodb.net/${config.database}?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useUnifiedTopology: true });
// build MongoDB Atlas connection string

app.use(express.static('content'));
// serve up static content from content directory

//mongoose.connect(url, connectionParams)
client.connect()
    .then (conn => console.log('connection successful'))
    .catch(err => { console.log(`Could not connect to ${url.replace(/:([^:@]{1,})@/, ':****@')}`, err); throw err; })
     // confirm connection

    .then(conn => usersCollection = client.db().collection('users'))
    .catch(err => console.log(`collection not found`))
    // retrieve preexisting collections 

    .then(() => console.log(usersCollection.find().toArray().then(docs => console.log(docs))))
    // print users collection

    .then(() => app.listen(API_PORT, () => console.log(`Listening on localhost: ${API_PORT}`)))
    .catch(err => console.log(`Could not start server`, err))
    // launch server on API port 3000
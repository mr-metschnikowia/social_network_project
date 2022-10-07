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

const API_PORT = 3000;
//defining global variables

/// MongoDB Configuration ///
const config = require('./config-db.js');
// get MongoDB Atlas config file
const url = `mongodb+srv://${config.username}:${config.password}@${config.cluster}.mongodb.net/${config.database}?retryWrites=true&w=majority`;
// build MongoDB Atlas connection string
const client = new MongoClient(url, { useUnifiedTopology: true });
// use connection string to initialise new mongo client 

const dataToInsert = [{ username: "Chicken", photo: "https://www.whatsappimages.in/wp-content/uploads/2021/01/I-am-sad-profile-Images-34.jpg" }];

async function createCollection(collection, data) {
    /*
    client.db().createCollection(collection)
        .then(() => console.log("connection successful"))
        .catch(err => console.log("unable to create collection"))
        // create new collection
    */
    await client.db().collection(collection).insertMany(data)
            .then(() => console.log("data successfully inserted"))
            .catch(err => console.log("unable to insert data into new collection"))
    // insert data into new collection
}                                                   
// asyncronous function which creates a new collection and inserts data into the collection

client.connect()
    .then(conn => console.log('connection successful'))
    .catch(err => { console.log(`Could not connect to ${url.replace(/:([^:@]{1,})@/, ':****@')}`, err); throw err; })
// connect to MongoDB database

createCollection("profilePics", dataToInsert);
// insert data
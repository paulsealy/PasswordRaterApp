//server
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const connect = require("./Connection");
const client = new MongoClient(connect.database.url, {useUnifiedTopology: true, useNewUrlParser: true});
const dbName = 'Username';
client.connect(function(err){
    assert.equal (null, err);
    console.log("Connected");
    client.close();
});

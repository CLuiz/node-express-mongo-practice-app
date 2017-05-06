const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

var db;
const mongoURL = 'mongodb://db_user:db_user_password@ds133241.mlab.com:33241/chris_test_db';

MongoClient.connect(mongoURL, (err, database) => {
    if (err) return console.log(err);
    db = database;
    app.listen(3000, function() {
        console.log('listening on 3000');
    });
});

app.get('/', (req, res) => {
    var cursor = db.collection('quotes').find().toArray(function(err, results){
        console.log(results)
    });
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/');
    });
    console.log(req.body);
});

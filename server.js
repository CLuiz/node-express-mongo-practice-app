const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

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
    db.collection('quotes').find().toArray(function(err, result){
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', {quotes: result})
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
/**
app.put('/quotes', (req, res) => {
    db.collections('quotes')
    .findOneAndUpdate({name: 'Yoda'}, {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
    }, {
        sort: {_id: -1},
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    });
});
**/
app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/quotes', (req, res) => {
    db.collections('quotes')
    .findOneAndDelete({name: req.body.name},
        (err, result) => {
            if (err) return res.send(500, err);
            res.send('A Darth Vader Quote was deleted');
        });
});

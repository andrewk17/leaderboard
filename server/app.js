require('./db.js');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
app.use(express.static(__dirname + '/../public'));

mongoose.connect('mongodb://localhost/test');

var Ranking = mongoose.model('Ranking');

app.get('/', function(req, res) {
  res.send('index');
});

app.post('/', function(req, res) {
  // Increment DB
  console.log('in post');
  Ranking.findOne({playerName: 'Andrew'}, function(err, ranking) {
    if (ranking) {
      ranking.wins++;
      ranking.save();
      console.log('doc in collection updated');
    } else {
      var ranking = new Ranking({playerName: 'Andrew', wins: 0});
      ranking.save();
      console.log('new entry into collection');
    }
    res.redirect('/');
  });
});

app.listen(8000, function() {
  console.log('server listening on port 8000');
});
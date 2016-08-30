require('./db.js');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test');

var Ranking = mongoose.model('Ranking');

app.get('/', function(req, res) {
  res.send('index');
});

app.get('/api/rankings', function(req, res) {
  Ranking.find({}, {}, {
    sort: {
      wins: -1
    }
  }, function(err, ranking) {
    if (ranking) {
      console.log('found something in DB');
      res.send(ranking);
      console.log(ranking);
    } else {
      console.log('nothing found in DB');
      res.send();
    }
  });
});

app.post('/api/rankings', function(req, res) {
  var playerName = req.body.data;
  Ranking.findOne({ playerName: playerName }, function(err, ranking) {
    if (ranking) {
      ranking.wins++;
      ranking.save();
      res.send([ranking]);
    } else {
      var ranking = new Ranking({ playerName: playerName, wins: 1 });
      ranking.save();
      res.send([ranking]);
    }
  });
});

app.listen(8000, function() {
  console.log('server listening on port 8000');
});

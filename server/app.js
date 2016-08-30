require('./db.js');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/test');

var Ranking = mongoose.model('Ranking');
var Message = mongoose.model('Message');

var logMessage = function(msgToLog) {
  var msg = new Message({message: msgToLog});
  msg.save();
};

app.get('/', function(req, res) {
  res.send('index');
});

app.get('/api/messages', function(req, res) {
  console.log('in messages get');
  Message.find({}, {}, {
    sort: {
      createdAt: -1
    },
    limit: 10
  }, function(err, messages) {
    if (messages) {
      res.send(messages);
    } else {
      console.log('error retrieving messages');
    }
  });
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
      logMessage(playerName + ' won a match!');
      res.send([ranking]);
    } else {
      // var ranking = new Ranking({ playerName: playerName, wins: 1 });
      // ranking.save();
      logMessage('Error! Player was not found in list of players');
      res.send([ranking]);
    }
  });
});

app.post('/api/players', function(req, res) {
  var playerName = req.body.data;
  Ranking.findOne({ playerName: playerName }, function(err, ranking) {
    if (ranking) {
      res.end();
    } else {
      var ranking = new Ranking({ playerName: playerName, wins: 0 });
      ranking.save();
      // res.send([ranking]);
      logMessage(playerName + ' was added to list of players');
      res.end();
    }
  });
});

app.listen(8000, function() {
  console.log('server listening on port 8000');
});

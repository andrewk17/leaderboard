var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('connection sucessful');
});

var rankingSchema = mongoose.Schema({
  playerName: String,
  wins: Number
});

var Ranking = mongoose.model('Ranking', rankingSchema);

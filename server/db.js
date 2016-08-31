var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var messageSchema = mongoose.Schema({
  message: String,
  rankingId: [{ type: Schema.Types.ObjectId, ref: 'Ranking' }]
}, {timestamps: true});

var Message = mongoose.model('Message', messageSchema);
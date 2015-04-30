// pg-code based on https://github.com/Gangles/every-game-bot/blob/master/everygamebot.js
var pg = require('pg');
var config = require('./config.js');
var _ = require('underscore');
_.mixin(require('underscore.deferred'));


var DB_CREATE = 'CREATE TABLE IF NOT EXISTS sequence '
      + '(currentIndex integer NOT NULL)';
var DB_QUERY = 'SELECT currentIndex FROM sequence';
var DB_INSERT = 'UPDATE sequence SET currentIndex = $1';

var sequencer = function() {

  var list = require('./packages.txt');
  var index = 0;
  var client = new pg.Client(config.database_url);

  var initDB = function() {
    console.log('initializing DB');
    try {
      // connect to postgres db
      client.connect(function(err) {
	// connected, make sure table exists
	if (err) return console.log('DB init error:', err);
	client.query(DB_CREATE, function(err) {
	  // table exists, start tweeting
	  if (err) return console.log('DB init error:', err);
	  console.log("Database initialized.");
	  // waitToBegin();
	});
      });
    } catch (e) {
      console.log("DB init error:", e.toString());
    }
  };


  // console.log('length: ' + list.length + ' ' + list[0]);

  // TODO: need to split the lines that are longer than 140 chars
  // TODO: the index-storage needs to be external

  this.next = function() {
    var dfd = new _.Deferred();
    // return list[index++];
    var sentence = list[index++];
    // console.log(sentence);
    dfd.resolve(sentence);
    return dfd.promise();
  };

  // tempt turn-off
  // initDB();

};

module.exports = sequencer;

// pg-code based on https://github.com/Gangles/every-game-bot/blob/master/everygamebot.js
var config = require('./config.js');
var pg = require('pg');
var query = require('pg-query');
var _ = require('underscore');
_.mixin(require('underscore.deferred'));

query.connectionParameters = config.database_url;

// NOTE: this does not initialize the table with the current index
// which is.... an issue.
var DB_CREATE = 'CREATE TABLE IF NOT EXISTS sequence '
      + '(currentIndex integer NOT NULL)';
var DB_QUERY = 'SELECT currentIndex FROM sequence';
var DB_UPDATE = 'UPDATE sequence SET currentIndex = currentIndex + 1';
var DB_INIT_RECORD = 'INSERT INTO sequence(currentIndex) values(-1)';

var sequencer = function() {

  var list = require('./packages.txt');
  var index = 0;
  var client = new pg.Client(config.database_url);

  var initDB = function() {
    console.log('initializing DB');
    try {
      query(DB_CREATE, function(err, rows, result) {
        if (err) return console.log('DB init error:', err);
        return console.log('Database initialized');
      });
      // // connect to postgres db
      // client.connect(function(err) {
      //   // connected, make sure table exists
      //   if (err) return console.log('DB init error:', err);
      //   client.query(DB_CREATE, function(err) {
      //     // table exists, start tweeting
      //     if (err) return console.log('DB init error (create):', err);
      //     console.log("Database initialized.");
      //     // waitToBegin();
      //   });
      // });
    } catch (e) {
      console.log("DB init error:", e.toString());
    }
  };


 this.next = function() {
    var dfd = new _.Deferred();

   query(DB_QUERY, function(err, rows, data) {
     if (err) return console.log('QUERY ERROR:', err);
     if (rows.length == 0) {
       query(DB_INIT_RECORD, function(err, rows, data) {
         // UGH WE R NESTING AGAIN
       });
     } else {
       var currentIndex = rows[0].currentindex + 1;
       // console.log('currentIndex: ', currentIndex);
       var sentence = list[currentIndex];
       dfd.resolve(sentence);
       query(DB_UPDATE, function(err) {
         if (err) return console.log(err);
       });
     }

   });

    return dfd.promise();

  };

  initDB();

};

module.exports = sequencer;

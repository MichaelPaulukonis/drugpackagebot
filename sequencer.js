// pg-code based on https://github.com/Gangles/every-game-bot/blob/master/everygamebot.js
var pg = require('pg');
var query = require('pg-query');
var config = require('./config.js');
var _ = require('underscore');
_.mixin(require('underscore.deferred'));


// NOTE: this does not initialize the table with the current index
// which is.... an issue.
var DB_CREATE = 'CREATE TABLE IF NOT EXISTS sequence '
      + '(currentIndex integer NOT NULL)';
var DB_QUERY = 'SELECT currentIndex FROM sequence';
var DB_UPDATE = 'UPDATE sequence SET currentIndex = $1';

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
	  if (err) return console.log('DB init error (create):', err);
	  console.log("Database initialized.");
	  // waitToBegin();
	});
      });
    } catch (e) {
      console.log("DB init error:", e.toString());
    }
  };


  // console.log('length: ' + list.length + ' ' + list[0]);
 this.next = function() {
    var dfd = new _.Deferred();

    // var DB_QUERY = 'SELECT currentIndex FROM sequence';
    // var DB_UPDATE = 'UPDATE sequence SET currentIndex = $1';

   client.query(DB_QUERY, {}, function(data) {
     // { [error: relation "sequence" does not exist]
     //   name: 'error',
     //   length: 99,
     //   severity: 'ERROR',
     //   code: '42P01',
     //   detail: undefined,
     //   hint: undefined,
     //   position: '26',
     //   internalPosition: undefined,
     //   internalQuery: undefined,
     //   where: undefined,
     //   schema: undefined,
     //   table: undefined,
     //   column: undefined,
     //   dataType: undefined,
     //   constraint: undefined,
     //   file: 'parse_relation.c',
     //   line: '986',
     //   routine: 'parserOpenTable' }
     console.log(data);
     dfd.resolve(data);
   });

    // var query = client.query(DB_QUERY);
    // query.on('row', function(row, result) {

    //   console.log(row);
    //   console.log(result);
    //   // return list[index++];
    //   var sentence = list[index++];
    //   // console.log(sentence);
    //   dfd.resolve(sentence);
    // });


    return dfd.promise();

  };

  // tempt turn-off
  initDB();

};

module.exports = sequencer;

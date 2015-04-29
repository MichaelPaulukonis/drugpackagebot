// ### Libraries and globals
var config = require('./config.js');
var Twit = require('twit');
var T = new Twit(config);
var sequencer = new (require('./sequencer.js'))();
var pg = require('pg');

// ### Utility Functions

var logger = function(msg) {
  // console.log('logging?: ' + config.log);
  if (config.log) console.log(msg);
};

var tweeter = function(texts) {

  var sentence = sequencer.next();
  console.log(sentence);

  return;

  if (newSentence.length === 0 || newSentence.length > 140) {
    tweeter();
  } else {
    if (config.tweet_on) {
      T.post('statuses/update', { status: newSentence }, function(err, reply) {
	if (err) {
	  console.log('error:', err);
	}
	else {
          // nothing on success
	}
      });
    }
  }

};


// Tweets ever n minutes
// set config.seconds to 60 for a complete minute
setInterval(function () {
  try {
    tweeter();
  }
  catch (e) {
    console.log(e);
  }
}, 1000 * config.minutes * config.seconds);

// Tweets once on initialization.
tweeter();

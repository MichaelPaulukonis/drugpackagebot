

var sequencer = function() {

  var list = require('./packages.txt');
  var index = 0;
  console.log('length: ' + list.length + ' ' + list[0]);

  // TODO: need to have this be a node.js module
  // TODO: need to split the lines that are longer than 140 chars
  // TODO: the index-storage needs to be external
  // but that can wait a bit

  this.next = function() {
    return list[index++];
  };

};

module.exports = sequencer;

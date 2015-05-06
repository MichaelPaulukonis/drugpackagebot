// target was https://github.com/dariusk/spewer/blob/master/lib/lexicon.js


// sample:
// '1 KIT in 1 KIT * .9 g in 1 PACKAGE * .8 mL in 1 PACKAGE * .5 mL in 1 PACKAGE * 2 TABLET in 1 PACKAGE * 2 TABLET in 1 PACKAGE * 2 TABLET in 1 PACKAGE'
var linesplitter = function(line){

  // TODO: find the last '*' BEFORE position 140

  var splits = [];
  var splitLoc;

  for (var i = 138; i > 0; i--) {
    if(line[i] == '*') {
      splitLoc = (i - 1);
      break;
    }
  }

  if (splitLoc) {
    splits[0] = line.substring(0,splitLoc) + '...';
    splits[1] = '...' + line.substring(splitLoc);

    console.log(splits);

    return splits;

  } else {
    return [line];
  }

};

var rewriter = function() {

  var oldlines = require('./lengthed.txt');

  var newLines = [];


  for (var i = 0; i < oldlines.length; i++) {
    var line = oldlines[i];
    if (line.length > 140) {
      // line = line.length + ' : TOO LONG! :: ' + line;
      var splits = linesplitter(line);
      console.log(splits);
      newLines = newLines.concat(splits);
      console.log('newlines length: ' + newLines.length);
    } else {
      newLines.push(line);
    }
  }

  require('fs').writeFile('lengthed.mod.02.txt', JSON.stringify(newLines, null, 2));
  // require('fs').writeFile('lengthed.mod.02.txt', newLines.join('\n'));

};



// rewriter();

var checker = function() {

  var lines = require('./packages.txt');

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.length > 140) {
      console.log(i + ' : ' + line);
    }
  }

}();

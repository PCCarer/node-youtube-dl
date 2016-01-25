var path = require('path');
var fs   = require('fs');
var ytdl = require('..');

var video = ytdl('https://www.youtube.com/playlist?list=PLEFA9E9D96CB7F807');

video.on('error', function error(err) {
  'use strict';
  console.log('error 2:', err);
});

var size = 0;
video.on('info', function(info) {
  'use strict';
  size = info.size;
  var output = path.join(__dirname + '/', size + '.mp4');
  video.pipe(fs.createWriteStream(output));
});

var pos = 0;
video.on('data', function data(chunk) {
  'use strict';
  pos += chunk.length;
  // `size` should not be 0 here.
  if (size) {
    var percent = (pos / size * 100).toFixed(2);
    process.stdout.cursorTo(0);
    process.stdout.clearLine(1);
    process.stdout.write(percent + '%');
  }
});
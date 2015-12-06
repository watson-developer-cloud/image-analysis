/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var path = require('path'),
  fs = require('fs'),
  mkdirp = require('mkdirp'),
  uuid = require('node-uuid'),
  sox = require('sox');

var dest = path.resolve('./transcode');
mkdirp(dest, function(err) {
  if (err) {
    throw err;
  }
});

var transcode = function(input, output, cb) {
  var job = sox.transcode(input, output, {
    format: 'wav',
  });
  job.on('error', function(err) {
    console.error(err);
  });
  job.on('progress', function(amountDone, amountTotal) {
    console.log('progress', amountDone, amountTotal);
  });
  job.on('end', function() {
    console.log('Transcoding finished.');
    cb();
  });
  job.start();
};

module.exports = {
  /**
   * Work around an iOS bug which prevents WAV files from playing if a valid
   * duration is not specified. This occurs when streaming an audio file
   * directly from the source.
   **/
  fixEncoding: function(stream, res) {
    var id = uuid.v4();
    var input = path.join(dest, 'in_' + id + '.wav');
    var writeStream = fs.createWriteStream(input);
    stream.pipe(writeStream);
    writeStream.on('finish', function() {
      var output = path.join(dest, 'out_' + id + '.wav');
      transcode(input, output, function() {
        res.sendFile(output, null, function() {
          fs.unlink(input);
          fs.unlink(output);
        });
      });
    });
  }
};

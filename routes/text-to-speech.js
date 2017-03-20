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

var watson = require('watson-developer-cloud'),
  util = require('../util');

var textToSpeech = watson.text_to_speech({
  version: 'v1',
// uncomment the lines below to specify username and password
//   username: process.env.TEXT_TO_SPEECH_USERNAME || '<username>',
//   password: process.env.TEXT_TO_SPEECH_PASSWORD || '<password>'
});

module.exports.voices = function(req, res, next) {
  textToSpeech.voices({}, function(error, result) {
    if (error)
      return next(error);
    else
      return res.json(result);
  });
};

module.exports.speak = function(req, res, next) {
  var params = {
    text: req.body.text,
    voice: req.body.voice || 'en-US_MichaelVoice',
    accept: 'audio/wav'
  };
  var stream = textToSpeech.synthesize(params);

  stream.on('error',next);

  var userAgent = req.headers['user-agent'];
  if (!/iPhone|iPad|iPod|Safari/i.test(userAgent)) {
    return stream.pipe(res);
  } else {
    return util.fixEncoding(stream, res);
  }
};

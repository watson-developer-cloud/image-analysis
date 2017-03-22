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

require('dotenv').config({ silent: true });

var express = require('express');
var app = express();
var visualRecognition = require('./routes/visual-recognition');
var textToSpeech = require('./routes/text-to-speech');

// Bootstrap application settings
require('./config/express')(app);

app.post('/recognize', app.upload.single('images_file'), visualRecognition.recognize);
app.get('/voices', textToSpeech.voices);
app.post('/speak', textToSpeech.speak);

//app.post('/translate', require('./routes/language-translator').translate);

// error-handler settings
require('./config/error-handler')(app);

var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port, function() {
  console.log('listening at:', port);
});

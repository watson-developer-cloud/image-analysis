/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
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

"use strict";

var path = require("path"),
	fs = require("fs"),
	extend = require("util")._extend,
	watson = require("watson-developer-cloud"),
	bluemix = require("../config/bluemix"),
	util = require("../util");

module.exports = function() {
	
	var textToSpeech = watson.text_to_speech(extend({
		version: "v1",
		username: "<<service_username>>",
		password: "<<service_password>>"
	}, bluemix.getServiceCreds("text_to_speech")));

	return {
		voices: function(req, res) {
			textToSpeech.voices({}, function(error, result) {
				if (error) {
					return res.status(error.error ? error.error.code || 500 : 500).json({ error: error });
				} else {
					return res.json(result);
				}
			});
		},

		speak: function(req, res) {

			var params = {
				text: req.body.text,
				voice: req.body.voice || "en-US_MichaelVoice",
				accept: "audio/wav"
			};

			var stream = textToSpeech.synthesize(params);

			var userAgent = req.headers["user-agent"];
			if (!/iPhone|iPad|iPod|Safari/i.test(userAgent)) {
				return stream.pipe(res);
			} else {
				return util.fixEncoding(stream, res);
			}
		}
	}
}();

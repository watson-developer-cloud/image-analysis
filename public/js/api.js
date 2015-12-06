/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* global $*/
'use strict';

$( document ).ready(function() {

  // Determine the base URI
  var baseURI = location.href;
  var hash = location.hash;
  if (hash && hash.length > 0) {
    baseURI = baseURI.substring(0, baseURI.lastIndexOf(hash));
  }
  if (baseURI.lastIndexOf('/') !== baseURI.length - 1) {
    baseURI += '/';
  }

  $.api = {

    recognize: function(file) {

      if (!file) {
        return false;
      }

      var formData = new FormData();
      formData.append('images_file', file);

      return $.ajax({
        url: baseURI + 'recognize',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json'
      });
    },

    speak: function(text, voice) {

      if (!text || text.length === 0) {
        return false;
      }
      if (!voice || voice.length === 0) {
        voice = 'en-US_MichaelVoice';
      }

      var def = $.Deferred();
      var url = baseURI + 'speak';
      var request = new XMLHttpRequest();
      request.open('POST', url, true);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.responseType = 'arraybuffer';
      request.onload = function() {
        def.resolve(request.response);
      };
      request.send('text=' + text + '&voice=' + voice);
      return def;
    },

    translate: function(text) {

      if (!text || text.length === 0) {
        return false;
      }

      return $.ajax({
        url: baseURI + 'translate',
        type: 'POST',
        data: 'text=' + text.toLowerCase(),
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json'
      });
    }
  };

});

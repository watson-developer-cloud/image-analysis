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
/* global $, AudioContext*/
'use strict';

$( document ).ready(function() {
  
  // By default iOS does not play audio until its unlocked by
  // a touch event.  This method will unlock the audio context
  // so our sounds will play
  function enableiOSAudio(ctx) {
    var unlock = function() {
      var buffer = ctx.createBuffer(1, 1, 22050);
      var source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      if (typeof source.start === 'undefined') {
        source.noteOn(0);
      } else {
        source.start(0);
      }
      setTimeout(function() {
        if ((source.playbackState === source.PLAYING_STATE ||
            source.playbackState === source.FINISHED_STATE)) {
          window.removeEventListener('touchstart', unlock, false);
        }
      }, 0);
    };
    window.addEventListener('touchstart', unlock, false);
  }

  var context = null;
  var buffer = null;
  var source = null;

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    if (context && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      enableiOSAudio(context);
    }
  } catch (e) {
    console.error('Web Audio API is not supported in this browser', e);
  }

  var player = {

    getSound: function() {
      return buffer;
    },

    setSound: function(sound, deferPlay) {
      var t = this;
      if (source !== null) {
        t.stop();
      }
      if (sound === null) {
        buffer = null;
      } else if (context) {
        context.decodeAudioData(sound, function(decoded) {
          buffer = decoded;
          if (!deferPlay) {
            t.play();
          }
        }, function(e) {
          console.error('Failed to decode audio buffer', e);
        });
      }
    },

    play: function() {
      if (source !== null) {
        this.stop();
      }
      if (context) {
        source = context.createBufferSource();
        source.connect(context.destination);
        source.buffer = buffer;
        if (typeof source.start === 'undefined') {
          source.noteOn(0);
        } else {
          source.start(0);
        }
      }
    },

    stop: function() {
      if (!source) {
        return;
      }
      if (context && (source.playbackState === source.PLAYING_STATE)) {
        if (typeof source.stop === 'undefined') {
          source.noteOff(0);
        } else {
          source.stop(0);
        }
      }
      source = null;
    }
  };

  $.AudioPlayer = function() {
    return player;
  };

});

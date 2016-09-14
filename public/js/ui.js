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
/* global $, Spinner*/
'use strict';

$(document).ready(function() {

  var opts = {
    lines: 13, // The number of lines to draw
    length: 20, // The length of each line
    width: 10, // The line thickness
    radius: 30, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#FFF', // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: true, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
  };

  var spinner = new Spinner(opts);
  var player = $.AudioPlayer();
  var type = 0; // 0: classify, 1: recognizetext
  var model_LT, model_STT = '';

  function switchLang() {
    var lang_selected = $('#lang').val()
    switch(lang_selected) {
        case 'pt':
            model_STT = 'pt-BR_IsabelaVoice'
            model_LT = 'en-pt'
            break;
        case 'fr':
            model_STT = 'fr-FR_ReneeVoice'
            model_LT = 'en-fr'
            break;
        case 'es':
            model_STT = 'es-ES_EnriqueVoice'
            model_LT = 'en-es'
            break;
    }
  }

  function toTitleCase(val) {
    if (val.length > 1) {
      val = val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
    }
    return val;
  }

  function selectImage() {
    switchLang()
    $('#picture-field').click();
  }

  function imageSelected(event) {
    clear();

    var target = event.target ? event.target : {},
      files = target.files ? target.files : [];

    if ((files.length === 1) && (files[0].type.indexOf('image/') === 0)) {
      var img = $(new Image()).attr('src', URL.createObjectURL(files[0]));
      $('#image-container').append(img);

      recognize(files[0]);

      setTimeout(function() {
        spinner.spin($('.content')[0]);
      }, 10);
    }
  }

  function speak() {
    var buffer = player.getSound();
    if (buffer !== null) {
      player.play();
    } else {
      var result = $('#image-result');
      var text = null;
      var voice = null;
      var translation = result.data('translation');
      if (translation && (translation.length > 0)) {
        text = result.data('translation');
        voice = model_STT;
      } else {
        text = result.data('text');
        voice = 'en-US_MichaelVoice';
      }
      if (text && text.length > 0) {
        var request = $.api.speak(text, voice);
        $.when(request).then(function(sound) {
          player.setSound(sound);
        });
      }
    }
  }

  function recognize(file) {
    if (type === 0) {
      var request = $.api.recognize(file);
      $.when(request).then(translate, onError);
    } else {
      var request = $.api.recognizeText(file);
      $.when(request).then(translateSign, onError);
    }

  }

    function translate(textObj) {
    var image = textObj.images ? textObj.images[0] : {},
      classifiers = image.classifiers || [],
      classifier = classifiers[0],
      text = classifier ? classifier.classes[0].class.replace(/_/gi, ' ') : 'The image could not be recognize';

    var request = $.api.translate(text, model_LT);
    $.when(request).then(function(translationObj) {
      onSuccess(text, translationObj);
    }, function() {
      onSuccess(text);
    });
  }

 /* function translateSign(textObj) {
    var text = textObj.images[0].text.replace(/_/gi, ' ') //: 'The image could not be recognize';
    var request = $.api.translate(text, model_LT);
    $.when(request).then(function(translationObj) {
      onSuccess(text, translationObj);
    }, function() {
      onSuccess(text);
    });
  } */

  function onSuccess(text, translationObj) {
    var translation = (translationObj && translationObj.translations && translationObj.translations.length > 0) ? translationObj.translations[0].translation : '';

    var result = $('#image-result');
    result.data('text', text);
    result.data('translation', translation);

    $('h2', result).html(toTitleCase(text));
    $('h3', result).html(translation);
    result.animate({
      'bottom': '+=85px'
    }, 'slow');
    spinner.stop();
  }

  function onError() {
    spinner.stop();
  }

  function clear() {
    player.setSound(null);

    $('#landing').css('display', 'none');
    $('#content').css('display', 'block');

    $('#image-container').empty();

    var result = $('#image-result');
    result.data('text', null);
    result.data('translation', null);
    if (result.css('bottom') !== '-85px') {
      result.animate({
        'bottom': '-=85px'
      }, 'fast');
    }
  }

  $('#capture-button-recognize').on('click', function() {
    type = 0;
    selectImage();
  })
/*  $('#capture-button-recognizetext').on('click', function() {
    type = 1;
    selectImage();
  }) */
  $('#picture-field').on('change', imageSelected);
  $('#play-sound').on('click', speak);

});
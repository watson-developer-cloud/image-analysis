'use strict';

var watson = require('watson-developer-cloud');
var config = require('../config');

var languageTranslation = watson.language_translator({
  version: config.watson.language_translation.version,
  username: process.env.USERNAME || config.watson.language_translation.username,
  password: process.env.PASSWORD || config.watson.language_translation.password
});

module.exports.translate = function(req, res, next) {
  var params = {
    text: req.body.text,
    model_id: 'en-es',
  };
  languageTranslation.translate(params, function(error, result) {
    if (error)
      return next(error);
    else
      return res.json(result);
  });
};
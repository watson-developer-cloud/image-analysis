'use strict';

var watson = require('watson-developer-cloud');

var languageTranslation = watson.language_translation({
  version: 'v2',
  username: 'USERNAME',
  password: 'PASSWORD'
});

module.exports.translate = function(req, res, next) {
  var params = {
    text: req.body.text,
    model_id: 'en-es',
  };
  languageTranslation.translate(params, function(error, result) {
    console.log('restult', result)
    if (error)
      return next(error);
    else
      return res.json(result);
  });
};
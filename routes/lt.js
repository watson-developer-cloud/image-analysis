'use strict';

var watson = require('watson-developer-cloud');

var languageTranslation = watson.language_translation({
  version: 'v2',
  username: '7197692f-0d88-471f-a28d-1801215d84d6',
  password: 'Z7xMjGjVynZK'
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
# Watson Hands On Labs - 📷 Image Analysis

The labs cover several [Watson Services][wdc_services] that are available on [IBM Bluemix][bluemix] to build a simple image analysis application. Throughout the workshop, we will navigate through Bluemix, Bluemix Devops Services, Github, and the source code of our application in order to demonstrate how apps can be created quickly and easily using the [IBM Bluemix][bluemix] platform, and the value of [Watson Services][wdc_services] and Cognitive capabilities through APIs.

So let’s get started. The first thing to do is to build out the shell of our application in Bluemix.

## Creating a [IBM Bluemix][bluemix] Account

  1. Go to [https://bluemix.net/](https://bluemix.net/)
  2. Create a Bluemix account if required.
  3. Log in with your IBM ID (the ID used to create your Bluemix account)

**Note:** The confirmation email from Bluemix mail may take up to 1 hour.

## Running  the application locally
  The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/) so you will have to download and install them as part of the steps below.

1. Install [Node.js](http://nodejs.org/)
2. Install the Bluemix CLI and the CF CLI -> Links
3. Run the following commands to connect to your Bluemix account:
    `bluemix api https://api.ng.bluemix.net/`
    `bluemix login`
4. List all the Bluemix services
    `cf marketplace`
5. From that list, create a Visual Recognition and a Text-to-Speech service:
    `cf cs watson_vision_combined free visual_recognition_name`
    `cf cs text_to_speech standard text_to_speech_name`
6. Create new credentials for each of those services, to do so:
    `cf create-service-key SERVICE_NAME KEY_NAME`
7. Retrieve those new credentials using the following command:
    `cf service-key SERVICE_NAME KEY_NAME`
7. Edit config.js to add the credentials previously retrieved
8. Go to the project folder in a terminal and run:
    `npm install`
5. Start the application
    `node app.js`
7. Go to `http://localhost:3000`

## Add additional functionality to the application: Ability to read signs

1. In app.js, uncomment line 28
`app.post('/recognizetext', app.upload.single('images_file'), vr.recognizeText);`
2. In routes/vr.js, uncomment from line 53 to the end
3. In public/js/ui.js, uncomment from line 143 to line 151
4. In public/index.html, uncomment the second part of the line 47
`OR <a id="capture-button-recognizetext">Recognize Text on an Image</a>`
5. In public/js/ui.js, uncomment from line 194 to line 197
6. Save the different files
7. Quit the process in the terminal (CTRL + C)
8. Restart the application
    `node app.js`

## Add additional services to the application

In this section we'll see how to add the possibility of translating the text recognized to an other language before it's spoken by the Text-to-Speech service

1. Create a language translation service
    `cf cs language_translation standard language_translation_name`
2. Create new credentials and retrieve them as seen in the first section
3. Edit the config.js file to add them, save the file
4. In app.js, uncomment lines 22 and 32
5. In public/index.html, uncomment from line 40 to 45
6. Create a new file `lt.js` in the `routes` folder and paste in the following:
```js
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
    model_id: req.body.model,
  };
  languageTranslation.translate(params, function(error, result) {
    if (error)
      return next(error);
    else
      return res.json(result);
  });
};
```

7. Save
8. Restart the app

# Congratulations
You have completed the Image Analysis Lab! :bowtie:

[bluemix]: https://console.ng.bluemix.net/
[wdc_services]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/services-catalog.html
[lt_service]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/language-translation.html

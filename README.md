# Image Analysis

  The Image Analysis app let you recognize items in images and speak the resulting description. It uses Visual Recognition to identify objects in images, Machine Translation to translate the description into another language, and Text to Speech to pronounce the resulting translation.

Give it a try! Click the button below to fork into IBM DevOps Services and deploy your own copy of this application on Bluemix.

Lab Instructions: [INSTRUCTIONS](INSTRUCTIONS.md)

Demo: [http://image-analysis.mybluemix.net/](http://image-analysis.mybluemix.net/)


[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/watson-developer-cloud/image-analysis)


## Running locally
  The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/) so you will have to download and install them as part of the steps below.

1. Copy the credentials from your [Visual Recognition][vr] and [Text to Speech][tts] service in Bluemix to `visual-recognition.js` and `text-to-speech.js`, you can see the credentials by going to bluemix.net.

2. Install [Node.js](http://nodejs.org/)
3. Go to the project folder in a terminal and run:
    `npm install`
4. Start the application
5.  `node app.js`
6. Go to `http://localhost:3000`


## License

  This sample code is licensed under Apache 2.0. Full license text is available in [COPYING](LICENSE).

## Contributing

  See [CONTRIBUTING](CONTRIBUTING.md).

## Open Source @ IBM
  Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

[tts]: http://www.ibm.com/watson/developercloud/text-to-speech.html
[vr]: http://www.ibm.com/watson/developercloud/visual-recognition.html
[cloud_foundry]: https://github.com/cloudfoundry/cli
[getting_started]: http://www.ibm.com/watson/developercloud/doc/getting_started/
[sign_up]: https://console.ng.bluemix.net/registration

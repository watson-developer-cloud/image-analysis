# Image Analysis

  The Image Analysis app let you recognize items in images and speak the resulting description. It uses Visual Recognition to identify objects in images, Machine Translation to translate the description into another language, and Text to Speech to pronounce the resulting translation.

Lab Instructions: [INSTRUCTIONS](INSTRUCTIONS.md)

Demo: [http://image-analysis.mybluemix.net/](http://image-analysis.mybluemix.net/)

## Running locally
  The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/) so you will have to download and install them as part of the steps below.

1. Copy the credentials from your `visual-recognition` and `text-to-speech` service in Bluemix to `vr.js` and `tts.js`, you can see the credentials by going to bluemix.net.

2. Install [Node.js](http://nodejs.org/)
3. Go to the project folder in a terminal and run:
    `npm install`
4. Start the application
5.  `node app.js`
6. Go to `http://localhost:3000`


## Troubleshooting

  Explain how to see the deploy logs in jazzhub

## License

  This sample code is licensed under Apache 2.0. Full license text is available in [COPYING](LICENSE).

## Contributing

  See [CONTRIBUTING](CONTRIBUTING.md).

## Open Source @ IBM
  Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

[service_url]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/concept-insights.html
[cloud_foundry]: https://github.com/cloudfoundry/cli
[getting_started]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/
[sign_up]: https://apps.admin.ibmcloud.com/manage/trial/bluemix.html?cm_mmc=WatsonDeveloperCloud-_-LandingSiteGetStarted-_-x-_-CreateAnAccountOnBluemixCLI

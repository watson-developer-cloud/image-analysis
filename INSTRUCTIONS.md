# Watson Hands On Labs - 📷 Image Analysis

This lab was originally created as a part of the World of Watson event in May 2015.

The labs cover several [Watson Services][wdc_services] that are available on [IBM Bluemix][bluemix] to build a simple travel advisor application. Throughout the workshop, we will navigate through Bluemix, Github, and the source code of our application in order to demonstrate how apps can be created quickly and easily using the [IBM Bluemix][bluemix] platform and the value of [Watson Services][wdc_services] and Cognitive capabilities through APIs.

So let’s get started. The first thing to do is to build out the shell of our application in Bluemix.

## Creating a [IBM Bluemix][bluemix] Account

  1. Go to [https://ace.ng.bluemix.net/](https://ace.ng.bluemix.net/)
  2. Create a Bluemix account if required.
  3. Log in with your IBM ID (the ID used to create your Bluemix account)

**Note:** The confirmation email from Bluemix mail take up to 1 hour.

## Deploy this sample application in Bluemix and Test it

  1. Click the button below to fork the project into IBM DevOps Services and deploy your own instance of this application on [IBM Bluemix][bluemix].

  [![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/watson-developer-cloud/image-analysis)

  2. From here you will be taken to a Bluemix page, where you will be prompted to name your app. A sample name is provided for you, but feel free to give your application any name you like (if the name is taken by another user you will be prompted to try another name).

  ![deploy](instructions/deploy.png)

  **Note:** Use the default settings for Region / Organization / Space on the Bluemix landing page.

  3. Once you have named your application, click the deploy button to begin the deploy process to Bluemix. During this process, Bluemix will automatically build and deploy our starter application based on the Github repository that we accessed at the start of the lab.

  4. Once the application has finished deploying, you will see a "Success!" message. At this point, scroll to the top of the page and select "Dashboard" from the header bar.

  ![deploy-success](instructions/deploy-success.png)

  5. Test Out the new app. Now that we have deployed our application to Bluemix, the next step is to test the application in it's current state.

  6. Click on the application icon to go into the dashboard for our Image Analysis app. Under the title of the application, you will see a link like "Routes: \<your-app-name\>.mybluemix.net". Click on the URL listed to navigate to your application.
  
  ![app-route](instructions/app-route.png)

  7. In the application, try selecting the upload button in the top right corner and uploading a picture. We have a provided a few pictures to test out the application in the repo at https://github.com/watson-developer-cloud/image-analysis/tree/master/public/images

  Simply download one of the pictures in the folder and upload it into the application to have Watson analyze the image.

  ![app-screenshot](instructions/app-screenshot.png)

  8. When the image has been recognized, click on the Speaker icon to hear the ID of the image.

## Add additional services to the application

  1. So far, we have deployed our pre built starter application to Bluemix. We are going to show how easy it is to add additional Watson services to our applications using Bluemix.

  On the Bluemix Dashboard, scroll down to find your Image Analysis application within the "Applications" section. From here, click on the application to open the application homepage.

  ![dashboard-app](instructions/dashboard-app.png)

  2. Within the application homepage, we are able to see what services we have already included. You will notice that we already have Text to Speech and Visual Recognition built into the application. We are now going to add a third service into the application.
To do this, click the "Add a Service or API" button on the homepage

  ![app-details](instructions/app-details.png)

  3. From the list of Watson services, select the Language Translation service and add it to your application. For the purposes of this lab, all of the default settings of the service will work, so when presented with the Language Translation details page, select the green "Create" button to proceed.

  ![add-service](instructions/add-service.png)

  **Note:** you may be prompted to restage your application at this point. This is required in order to rebuild the application with the new Language Translation service that we have added. Select "Restage" to proceed.

We are going to demonstrate how easy it is to use the Watson services on Bluemix to add functionality to existing applications. Our current application can identify images and read out that identification using audio. However let’s say that we wanted to be able to identify these images for a wider user base, which requires translation into other languages.

Luckily, we’ve already started the process to do this. To fully implement the ability to translate these descriptions in our application, we are going to edit our application code to add the Language Translation service that we added earlier.

## Modify the existing application

  1. Let’s edit our source code. Back on the application home page in Bluemix, you will see a link to the Jazz Hub repository, and a button to **Edit Code**.
  Click on **Edit Code.**

  2. Clicking on Edit Code will take you to the Jazz Hub repository, which will allow us to edit and push new versions of our code to the application.

  Within the Github repository, navigate to routes folder and select **File -> New -> File** and name the new file `lt.js`

  3. Open up `lt.js` and copy the code below:  

  ```js
  'use strict';

  var watson = require('watson-developer-cloud');

  var languageTranslation = watson.language_translation({
    version: 'v2',
    username: '<<service_username>>',
    password: '<<service_password>>'
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
  ```

  The code above will connect the app to the [Language Translation][lt_service] service.

  4. Click on File -> Save or press Crt+S.

  5. Open up your `app.js` and uncomment the line 31. That will add the support for translation with the newly created `routes/lt.js`.


  6. Click on File -> Save or press Crt+S.

## Deploy

  1. The last step in order to complete our application is to deploy our changes to Bluemix. To do this, we need to push our new code to the application. In the code editor screen, switch to the Git view, the 2nd icon in the left navigation bar.

  ![git](instructions/git.png)

  2. Locate your change to app.js file. Check it (select it), add a commit message, and click **Commit**.

  ![commit](instructions/commit.png)

  3. Click **Sync** to send your changes from this workspace to the main repository and trigger a deploy of your app.

  ![sync](instructions/sync.png)

  4. Finally, Click on **Build and Deploy** to see the deploy process.

  ![deploy-button](instructions/build-and-deploy.png)

**Note:** While this may show as overly complicated, we show it here to illustrate you can have exactly the same source management practices you could have your local environment connected to a Git repository, in the Bluemix DevOps environment.

## Test

To test out our application, navigate back to your application homepage on Bluemix. Select the URL next to "Route" in the same way that we launched our previously unfinished application before.
The new application will perform the same functions are our previous version, but this time you will see translation for the images as well.

# Congratulations
You have completed the Image Analysis Lab! :bowtie:

[bluemix]: https://console.ng.bluemix.net/
[wdc_services]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/services-catalog.html
[lt_service]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/language-translation.html

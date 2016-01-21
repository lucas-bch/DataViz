# DataViz
School data visualization project using a weather dataset
We are using the 5 day / 3 hour data from the openweathermap api (http://openweathermap.org/api). The format we are using is the bulk format.

The data are first treated with Hadoop, then we calculate some averages with Spark, and we send the modified data to mongo.

You can find the app running here : http://dataviz.eu-gb.mybluemix.net/


Install Meteor :

Linux : curl https://install.meteor.com/ | sh

Windows : go to www.meteor.com/install


To run the app : 
in folder /dataviz, run the app using the command 'meteor'

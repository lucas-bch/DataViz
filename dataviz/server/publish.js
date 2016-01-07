Weather = new Mongo.Collection("weather");

if (Meteor.isServer) {
	Meteor.publish('Weather', function(){
		console.log("Here is the server !");
		return Weather.find({"city.name": "Grenoble"});
	})
}
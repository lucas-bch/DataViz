if (Meteor.isServer) {
	Meteor.publish("weatherData", function(city) {
		console.log("Here is the server !");
		var weatherData = Weather.find({"city.name": city});
		if (weatherData) {
			return weatherData;
		}
		return this.ready();
	});
}
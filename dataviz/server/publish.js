if (Meteor.isServer) {
	Meteor.publish("weatherData", function(city) {
		var weatherData = Weather.find({"city.name": city});
		if (weatherData) {
			return weatherData;
		}
		return this.ready();
	});
}
if (Meteor.isServer) {
	Meteor.publish("weatherData", function(city) {
		var weatherData = Weather.find({"city.name": city});
		if (weatherData) {
			return weatherData;
		}
		return this.ready();
	});

	Meteor.publish("cities", function(search) {
		//City = new Mongo.Collection("city");
		search = search.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");


		var cities =City.find({name:{$regex: search, $options: "i"}}, {limit:6});
		console.log(cities);
		if(cities) {
			return cities;
		}
		return this.ready();
	});
}

//template subscribing
var now = new Date();

// As options we currently only set a static size of 300x200 px
var options = {
    height: '250px',
    low: 0,
    showArea: true
};


WeatherData = React.createClass({
    propTypes: {
        city: React.PropTypes.string.isRequired
    },

    getDataDay1 : function() {
        
        var serie = [3, 4, 4, 2, 3, 2, 1, 5];
        var labels = ['03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00','00:00'];

        if(this.state.list[1] != undefined) {
            var lab = parseInt(this.state.list[0].dt_txt.split(' ')[1].replace(":00:00", ""), 10);
            var hour;

            if(this.state.displayedData === "Temp") {
                for (var i = 0; i<8; i++){
                    serie[i] = this.state.list[i].main.temp;
                    hour = (3*i + lab) % 24;
                    if (hour < 10) {
                        labels[i] = ("0" + hour + ":00");
                    } else {
                        labels[i] = (hour + ":00");
                    }
                }
            } else if (this.state.displayedData === "Wind"){
                for (var i = 0; i<8; i++){
                    serie[i] = this.state.list[i].wind.speed;
                    hour = (3*i + lab) % 24;
                    if (hour < 10) {
                        labels[i] = ("0" + hour + ":00");
                    } else {
                        labels[i] = (hour + ":00");
                    }
                }
            } else if (this.state.displayedData === "Rain"){
                for (var i = 0; i<8; i++){
                    if (this.state.list[i].rain["3h"] != undefined) {
                        serie[i] = this.state.list[i].rain["3h"];
                    } else {
                        serie[i] = 0;
                    }
                    hour = (3*i + lab) % 24;
                    if (hour < 10) {
                        labels[i] = ("0" + hour + ":00");
                    } else {
                        labels[i] = (hour + ":00");
                    }
                }
            }
        }
        data = {
            // A labels array that can contain any sort of values
            labels : labels,
            // Our series array that contains series objects or in this case series data arrays
            series: [serie]
        }

        return data;
    },

    getData4Days : function() {
        
        var daysOfWeek = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
        var tomorrow = (now.getDay() + 1) % 7;

        //static serie data for the start of application. Should never be shown on screen.
        var morning = [3, 2, 3, 2];
        var afternoon = [12, 11, 13, 12]
        var labels = [];

        for (var i=0; i<4; i++) {
            labels[i] = (daysOfWeek[(tomorrow + i)%7] + "");
        }

        if(this.state.list[1] != undefined) {
            var hour = parseInt(this.state.list[0].dt_txt.split(' ')[1].replace(":00:00", ""), 10);
            var index = 0;
            while (hour != 9) {
                index ++;
                hour = (hour+3)%24;
            }
            // if hour < 12 then add 8 to get to the next day
            if (index < 4)
                index += 8;

            if(this.state.displayedData === "Temp") {
                for (var i=0; i<4; i++){
                    morning[i] = this.state.list[index + i*8].main.temp;
                    afternoon[i] = this.state.list[index + i*8 + 2].main.temp;
                }
            } else if (this.state.displayedData === "Wind") {
                for (var i=0; i<4; i++){
                    morning[i] = this.state.list[index + i*8].wind.speed;
                    afternoon[i] = this.state.list[index + i*8 + 2].wind.speed;
                }
            } else if (this.state.displayedData === "Rain") {
                for (var i=0; i<4; i++){
                    if (this.state.list[index +i*8].rain['3h'] != undefined){
                        morning[i] = this.state.list[index + i*8].rain['3h'];
                    } else {
                        morning[i] = 0;
                    }
                    if (this.state.list[index +i*8 + 2].rain['3h'] != undefined){
                        afternoon[i] = this.state.list[index + i*8 + 2].rain['3h'];
                    } else {
                        afternoon[i] = 0;
                    }
                }
            }

        }

        data = {
            // A labels array that can contain any sort of values
            labels: labels,
            // Our series array that contains series objects or in this case series data arrays
            series: [morning, afternoon]
        }
        return data;
    },

    getInitialState: function() {
        return {
            temperature: "",
            timeScale : 0,
            displayedData : "Temp",
            weather : {},
            list: [ {
                "dt":0,
                "main":{
                    "temp":0,
                    "temp_min":0,
                    "temp_max":0,
                    "pressure":0,
                    "sea_level":0,
                    "grnd_level":0,
                    "humidity":0,
                    "temp_kf":0
                },
                "weather":[
                    {
                        "id":0,
                        "main":"",
                        "description":"",
                        "icon":""
                    }
                ],
                "clouds":{
                    "all":0
                },
                "wind":{
                    "speed":0,
                    "deg":0
                },
                "sys":{
                    "pod":""
                },
                "dt_txt":""
            } ]
        };
    },

    set1day: function(e,option){
        //this.setState({data : getDataDay1()})
        this.state.weather.updateData(this.getDataDay1());
        this.setState({timeScale : 0});
    },

    set5days: function(e,option){
        //this.setState({data : getData4Days()})
        this.state.weather.updateData(this.getData4Days());
        this.setState({timeScale : 1});
    },

    setTemp : function(e, option) {
        this.setState({displayedData : "Temp"});
        this.componentDidUpdate();
    },

    setWind : function(e, option) {
        this.setState({displayedData : "Wind"});
        this.componentDidUpdate();
    },

    setRain : function(e, option) {
        this.setState({displayedData : "Rain"});
        this.componentDidUpdate();
    },

    componentDidMount : function(){
        this.state.weather = new WeatherGraph(".ct-chart",options, this.getDataDay1());
    },

    componentWillReceiveProps : function(nextProps) {
        // Maybe to be deleted. Maybe not.
        console.log(nextProps.city);
        console.log(Weather.find().fetch());
        var result = Weather.find({"city.name": nextProps.city}).fetch();
        console.log(result);
        result = result[0];
        if (this.isMounted()) {
            result.list.forEach(function(element, index){
                // convertion de température
                element.main.temp = (element.main.temp - 273).toFixed(1);
                element.wind.speed = (element.wind.speed * 3.6).toFixed(1);
            });
            this.setState({
                list: result.list
            });
        }
    },

    componentDidUpdate : function() {
        if (this.state.timeScale == 0){
            this.state.weather.updateData(this.getDataDay1());
        } else {
            this.state.weather.updateData(this.getData4Days());
        }
    },

    render : function(){
        return (
            <div className="row weather-body">
                <div className=" col m12 city-name-wrapper weather-intro">
                    <div  className="container">
                        <h1 id="city" > { this.props.city } <i className="wi wi-day-sunny"></i></h1>
                        <div className=" weather-temperature-wrapper">
                            <div  id="temperature">
                                <h1>
                                    { this.state.list[0].main.temp }°<small>C</small>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col m12 l12 weather-content-wrapper">
                    <div className="container weather-content ">

                        <div className="card white darken-1">
                            <div className="card-content white-text">
                                <div className="row">
                                    <div className="col m2 l2 weather-options">

                                        <a className="weather-option waves-effect waves-light btn-large" onClick={this.set1day}>Today</a>

                                        <a className="weather-option waves-effect waves-light btn-large" onClick={this.set5days}>5 days</a>

                                    </div>
                                    <div className="col m8 l8 weather-graph">
                                        <div className="ct-chart"></div>
                                    </div>
                                    <div className="col m2 l2 weather-types ">

                                        <a className="type-weather btn-floating btn-large waves-effect waves-light red" onClick={this.setTemp}><i className="wi wi-thermometer-exterior"></i></a>

                                        <a className="type-weather btn-floating btn-large waves-effect waves-light green" onClick={this.setWind}><i className="wi wi-strong-wind"></i></a>

                                        <a className="type-weather btn-floating btn-large waves-effect waves-light blue" onClick={this.setRain}><i className="wi wi-rain"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

// My Chart
var WeatherGraph = (function(){


    function WeatherGraph (selector, options, data){
        this.selector = selector;
        this.data = data ;
        this.options = options;
        this.chart = new Chartist.Line(this.selector, data, options);

        // Let's put a sequence number aside so we can use it in the event callbacks
        this.seq = 0;

// Once the chart is fully created we reset the sequence
        (this.chart).on('created', function() {
            this.seq = 0;
        });


        (this.chart).on('draw', function(data) {
            if(data.type === 'point') {
                // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
                data.element.animate({
                    opacity: {
                        // The delay when we like to start the animation
                        begin: (this.seq)++ * 80,
                        // Duration of the animation
                        dur: 500,
                        // The value where the animation should start
                        from: 0,
                        // The value where it should end
                        to: 1
                    }

                });
            }
            if(data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    opacity: {
                        begin: 1000,
                        dur: 2000,
                        from: 0,
                        to: 1,
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            }
        });

    }

    WeatherGraph.prototype.updateData = function(data){
        var self = this;
        if(undefined !== data){
            self.data = data;
            self.chart.update(self.data);
        }
        return this;
    }

    return WeatherGraph;
})();

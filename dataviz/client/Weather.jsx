var data = {
    // A labels array that can contain any sort of values
    labels: ['6:00', '9:00', '12:00', '15:00', '18:00',"21:0","00:00"],
    // Our series array that contains series objects or in this case series data arrays
    series: [
        [5, 2, 4, 2, 0,2,1 ]
    ]
};

var data2 = {
    // A labels array that can contain any sort of values
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri',"Sat","Sun"],
    // Our series array that contains series objects or in this case series data arrays
    series: [
        [3, 4, 4, 2,3,2,1 ]
    ]
};

// As options we currently only set a static size of 300x200 px
var options = {
    height: '250px',
    low: 0,
    showArea: true
};


Weather = React.createClass({
    propTypes: {
        city: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
            temperature: 24,
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

    changeScale: function(e,option){
        var dataSet;
        switch (option){
            case "hourly" :
                dataSet = data;
                break;
            case"daily":
                dataSet = data2;
                break;
            case "weekly" :
                dataSet = data;
                break;
            default :
                dataSet = data;
        }

        this.state.weather.updateData(dataSet);
    },

    componentDidMount : function(){
        this.state.weather = new WeatherGraph(".ct-chart",options,data);

        $.get('/json/toulouse-5days.json', function(result) {
            if (this.isMounted()) {
                result.list.forEach(function(element, index){
                    element.main.temp = (element.main.temp - 273).toFixed(1);
                });
                this.setState({
                    list: result.list
                });
            }
        }.bind(this));

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

                                        <a className="weather-option waves-effect waves-light btn-large" onClick={this.changeScale}>Hourly</a>

                                        <a className="weather-option waves-effect waves-light btn-large" onClick={this.changeScale}>Daily</a>

                                        <a className="weather-option waves-effect waves-light btn-large" onClick={this.changeScale}>Weekly</a>

                                    </div>
                                    <div className="col m8 l8 weather-graph">
                                        <div className="ct-chart"></div>
                                    </div>
                                    <div className="col m2 l2 weather-types ">

                                        <a className="type-weather btn-floating btn-large waves-effect waves-light red"><i className="wi wi-thermometer-exterior"></i></a>

                                        <a className="type-weather btn-floating btn-large waves-effect waves-light green"><i className="wi wi-strong-wind"></i></a>

                                        <a className="type-weather btn-floating btn-large waves-effect waves-light blue"><i className="wi wi-rain"></i></a>
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


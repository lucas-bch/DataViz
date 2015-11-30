var data = {
    // A labels array that can contain any sort of values
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
        [5, 2, 4, 2, 0,2,1,3,4  ]
    ]
};

var data2 = {
    // A labels array that can contain any sort of values
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
        [3, 4, 4, 2,3,2,1,1,4 ]
    ]
};

// As options we currently only set a static size of 300x200 px
var options = {
    height: '250px',
    low: 0,
   Area: true
};


Weather = React.createClass({
    propTypes: {
        key: React.PropTypes.number.isRequired
    },
    getInitialState: function() {

        return {
            temperature: 24,
            name:  "Toulouse",
            weather : {}
        };
    },

    changeScale: function(e){
        e.preventDefault();
        console.log("lama")
        this.state.weather.updateData(data2);
    },

    componentDidMount : function(){
        this.state.weather = new WeatherGraph(".ct-chart",options,data);
    },

    render: function() {
        return (
            <div className="row weather-body">
                <div className=" col m12 city-name-wrapper weather-intro">
                    <div className="container">
                        <h1> {this.state.name} <i className="wi wi-day-sunny"></i></h1>
                        <div className=" weather-temperature-wrapper">
                            <div  id="temperature">
                                <h1>
                                    {this.state.temperature}°<small>C</small>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col m12 l12 weather-content">
                    <div className="container ">

                        <div className="card white darken-1">
                            <div className="card-content white-text">
                                <div className="row">
                                    <div className="col m2 l2 weather-options">

                                        <a className="weather-option waves-effect waves-light btn-large" onClick={ this.changeScale }>Hourly</a>

                                        <a className="weather-option waves-effect waves-light btn-large">Daily</a>

                                        <a className="weather-option waves-effect waves-light btn-large">Weekly</a>

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





Weather = React.createClass({
    propTypes: {
        city: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
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
    componentWillMount: function() {
        console.log(this.state.list[0]);
    },
    componentDidMount: function() {
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
    render: function() {
        return (
            <div className="row weather-body">
                <div className=" col m12 city-name-wrapper weather-intro">
                    <div className="container">
                        <h1> { this.props.city } <i className="wi wi-day-sunny"></i></h1>
                        <div className=" weather-temperature-wrapper">
                            <div  id="temperature">
                                <h1>
                                    { this.state.list[0].main.temp }°<small>C</small>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col m12 l12 cyan weather-content">
                    <div className="container ">

                        <div className="card white darken-1">
                            <div className="card-content white-text">
                                <div className="row">
                                    <div className="col m2 l2 weather-options">

                                        <a className="weather-option waves-effect waves-light btn-large">Hourly</a>

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


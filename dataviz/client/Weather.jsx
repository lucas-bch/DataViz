


Weather = React.createClass({
    propTypes: {
        key: React.PropTypes.number.isRequired
    },
    getInitialState: function() {

        return {
            temperature: 24,
            name:  "Toulouse"
        };
    },
    componentDidMount: function() {
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


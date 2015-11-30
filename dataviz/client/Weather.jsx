


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
            <div className="row">

                <nav className= "side-nav fixed">
                    <ul className=" hide-on-med-and-down">
                        <li>
                            <a href="#!">
                                Lien
                            </a>
                        </li>
                        <li>
                            <a href="#!">
                                Lien
                            </a>
                        </li>
                    </ul>
                </nav>
                <div  className="row">
                    <div className="col m12 weather-body">
                        <div className="col m12 city-name-wrapper weather-intro">
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
                </div>



                    <div className="col m10 l10">

                        <div className="card cyan darken-1">

                            <div className="card-content white-text">
                                <div>
                                    <canvas className="valign "id="myChart" ></canvas>
                                </div>
                            </div>

                            <div className="card-action">
                                Température
                            </div>
                        </div>
                    </div>
                    <div className="col m2 l2">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-title">Options</div>
                                <div className="btn-group-vertical" role="group">
                                    <a className="btn-floating btn-large waves-effect waves-light red"><i className="wi wi-raindrop"></i></a>
                                    <a className="btn-floating btn-large waves-effect waves-light red"><i className="wi wi-raindrop"></i></a>
                                    <a className="btn-floating btn-large waves-effect waves-light red"><i className="wi wi-raindrop"></i></a>
                                    <a className="btn-floating btn-large waves-effect waves-light red"><i className="wi wi-raindrop"></i></a>
                                </div>
                            </div>
                            <div className="card-action">
                                Lama
                            </div>
                        </div>

                    </div>
                    <div className="col m3 l3">
                        <div className="card">
                            <div className="card-content">
                                <a href="#!">
                                    <h2><i className="wi wi-day-sunny"></i></h2>

                                </a>
                            </div>
                            <div className="card-action">
                                <span>22/03</span>
                            </div>
                        </div>
                    </div>
                    <div className="col m3 l3">
                        <div className="card">
                            <div className="card-content">
                                <a href="#!">
                                    <h2><i className="wi wi-day-sunny"></i></h2>

                                </a>
                            </div>
                            <div className="card-action">
                                <span>22/03</span>
                            </div>
                        </div>
                    </div>
                    <div className="col m3 l3">
                        <div className="card">
                            <div className="card-content">
                                <a href="#!">
                                    <h2><i className="wi wi-day-sunny"></i></h2>

                                </a>
                            </div>
                            <div className="card-action">
                                <span>Lundi 22 Novembre</span>
                            </div>
                        </div>
                    </div>
                    <div className="col m3 l3">
                        <div className="card">
                            <div className="card-content activator" >
                                <a href="#!">
                                    <h2 ><i className="wi wi-cloudy"></i> {this.state.temperature}°<small>C</small></h2>
                                </a>
                            </div>
                            <div className="card-action">
                                <a href="#!">
                                    <span>Mardi 23 Novembre</span>
                                </a>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">Plus infos<i className="material-icons right">close</i></span>
                                <p><strong>Précipitation</strong> : 18%</p>
                                <p><strong>Vent</strong> : 18%</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
});


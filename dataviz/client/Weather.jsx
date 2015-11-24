Weather = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    weather: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <div className="row">
        <div id="mode-weather">
          <button className="btn btn default">Hourly</button>
          <button className="btn btn default">Daily</button>
        </div>
        <div className="days col-md-3">
            <ul className="list-group">
                <li className="list-group-item">Lundi</li>
                <li className="list-group-item">Mardi</li>
                <li className="list-group-item">Mercredi</li>
                <li className="list-group-item">Jeudi</li>
                <li className="list-group-item">Vendredi</li>
                <li className="list-group-item">Samedi</li>
                <li className="list-group-item">Dimanche</li>
            </ul>
        </div>
        <div className="col-md-6">
            <h1>{this.props.weather.temperature}&#186;C</h1>
        </div>
        <div className="days col-md-3" >
            <div className="btn-group-vertical" role="group">
                <button type="button" className="btn btn-default"><i className="wi wi-thermometer"></i></button>
                <button type="button" className="btn btn-default"><i className="wi wi-thermometer"></i></button>
                <button type="button" className="btn btn-default"><i className="wi wi-thermometer"></i></button>
                <button type="button" className="btn btn-default"><i className="wi wi-thermometer"></i></button>
            </div>
        </div>
        <div id="graphique-weather"></div>
      </div>
    );
  }
});


Weather = React.createClass({
  propTypes: {
    key: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      temperature: 24
    };
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <div className="row">
        <div id="mode-weather">
          <button className="btn btn default">Hourly</button>
          <button className="btn btn default">Daily</button>
        </div>
        <div className="col-md-6">
            <h1>{this.state.temperature}&#186;C</h1>
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


App = React.createClass({
  getWeathers: function() {
    return [
      { _id: 1, text: "This is weather 1" },
      { _id: 2, text: "This is weather 2" },
      { _id: 3, text: "This is weather 3" }
    ];
  },
  renderWeathers: function() {
    return this.getWeathers().map((weather) => {
      return <Weather key={weather._id} weather={weather} />;
    });

  },
  render: function() {
    return (
        <div className="weather-cover">
            <Header />
            <div className="weather-wrapper">
                <div className="container">
                    <div className="row">
                      <ul>
                        { this.renderWeathers() }
                      </ul>
                    </div>
                </div>
            </div>
            <div className="puncline-wrapper">
                <div className="container">
                    <div className="row">
                        <Punchline />
                    </div>
                </div>
            </div>
        </div>
    );

  }
});
App = React.createClass({
  getWeathers: function() {
    return [
      { _id: 1, temperature: "23" },
      { _id: 2, temperature: "24" },
      { _id: 3, temperature: "25" }
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
                    { this.renderWeathers() }
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
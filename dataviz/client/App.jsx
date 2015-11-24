App = React.createClass({
  render: function() {
    return (
        <div className="weather-cover">
            <Header />
            <div className="weather-wrapper">
                <div className="container">
                    <Weather key="1" />;
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
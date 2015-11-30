App = React.createClass({
  render: function() {
    return (
        <div className="weather-cover">
            <main>
                <Header />
                <div className="weather-wrapper">
                    <Weather key="1" />
                </div>
            </main>
        </div>
    );
  }
});
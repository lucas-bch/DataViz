App = React.createClass({
  render: function() {
    return (

        <div className="weather-cover">
            <OrganicSearch />
            <main>
                <div className=" weather-wrapper">
                    <Weather key="1" />
                </div>
            </main>
        </div>
    );
  }
});
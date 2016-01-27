var dataSub;

City = new Mongo.Collection("city");
Weather = new Mongo.Collection("weather");

App = React.createClass({
    search: function(e,searchedCity) {
        e.preventDefault();

        if (dataSub && (searchedCity != this.state.city)){
            dataSub.stop();
        }
        dataSub = Meteor.subscribe("weatherData", searchedCity);

        this.setState({city: searchedCity, loaderState: 'open'});

        (function(self) {
            setTimeout(function(){
                self.setState({scenarioState: '', loaderState: 'closing'});
            }, 3000);
        })(this);
    },

    getInitialState: function() {
        return {
            city: '',
            scenarioState: 'start',
            loaderState: 'closed',
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    },

    handleResize: function(e) {
        this.setState({windowWidth: window.innerWidth,windowHeight: window.innerHeight});
    },

    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },

    render: function() {
        return (
            <div className="weather-cover">
                <Loader state={this.state.loaderState}/>

                <OrganicSearch searchHandler={ this.search } scenarioState={ this.state.scenarioState } />
                <main className={ this.state.scenarioState }>
                    <div style={{height: this.state.windowHeight+ 'px',width: this.state.windowWidth+ 'px'}} className=" weather-wrapper">
                        <WeatherData city={ this.state.city} />
                    </div>
                    <div className="historic-wrapper">
                        <Historic city={this.state.city} />
                    </div>
                </main>
            </div>
        );
    }
});

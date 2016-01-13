App = React.createClass({
    search: function(e,seachedCity) {
        e.preventDefault();
        this.setState({city: seachedCity, scenarioState: ''});
    },

    getInitialState: function() {
        return {
            city: 'Toulouse',
            scenarioState: 'start',
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    },
    /*componentWillMount: function(){
        Meteor.subscribe("weatherData", "Grenoble", {
            onReady: function(){

            }
        });
        console.log("we subscribed to weatherData Grenoble :)");
        console.log(Meteor.subscribe("weatherData", "Grenoble").ready());
    },*/
    
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
        console.log("hey, we are rending app.jsx");
        //console.log(Weather);
        Meteor.subscribe("weatherData", "Grenoble", {
            onReady: function(){
                console.log("we subscribed to weatherData Grenoble :)");
            }
        });
        return (
            <div className="weather-cover">
                <OrganicSearch searchHandler={ this.search } scenarioState={ this.state.scenarioState } />
                <main className={ this.state.scenarioState }>
                    <div style={{height: this.state.windowHeight+ 'px',width: this.state.windowWidth+ 'px'}} className=" weather-wrapper">
                        <WeatherData city={ this.state.city } />
                    </div>
                    <div className="historic-wrapper">
                        <Historic />
                    </div>
                </main>
            </div>

        );
    }
});
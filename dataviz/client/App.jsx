App = React.createClass({
    search: function(e,searchedCity) {
        e.preventDefault();
        //get the previous city researched to remove subscription if it is a different one, or do nothing in minimongo if it is the same
        var previousCity = this.state.city;

        this.setState({city: searchedCity, scenarioState: ''});

        if(previousCity != searchedCity){
            console.log(previousCity);
            Meteor.subscribe("weatherData", previousCity, {
                onStop: function(){
                    console.log("we unsubscribed from weatherData " + previousCity + ":) ");
                }
            }).stop();
            Meteor.subscribe("weatherData", searchedCity, {
                onReady: function(){
                    console.log("we subscribed to weatherData " + searchedCity + " :) ");
                }
            });
        } else {
            console.log("Same city");
        }
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
        console.log("hey, we are rendering app.jsx");
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
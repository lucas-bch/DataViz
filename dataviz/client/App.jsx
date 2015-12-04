App = React.createClass({
    search: function(seachedCity) {
        this.setState({city: seachedCity, scenarioState: ''});
    },

    getInitialState: function() {
        return {
            city: 'Toulouse',
            scenarioState: 'start'
        };
    },

    render: function() {
        return (
            <div className="weather-cover">
                <OrganicSearch searchHandler={ this.search } scenarioState={ this.state.scenarioState } />
                <main className={ this.state.scenarioState }>
                    <div className=" weather-wrapper">
                        <Weather city={ this.state.city } />
                    </div>
                </main>
            </div>
        );
    }
});
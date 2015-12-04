App = React.createClass({
    search: function(seachedCity) {
        this.setState({city: seachedCity});
    },

    getInitialState: function() {
        return {
            city: 'Toulouse'
        };
    },

    render: function() {
        return (

            <div className="weather-cover">
                <OrganicSearch searchHandler={ this.search }/>
                <main>
                    <div className=" weather-wrapper">
                        <Weather city={ this.state.city } />
                    </div>
                </main>
            </div>
        );
    }
});
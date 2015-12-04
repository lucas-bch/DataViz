OrganicSearch = React.createClass({

    getInitialState: function() {
        var scenarioState = this.props.scenarioState;
        return {
            openClass: scenarioState,
            buttonName: 'search',
            isOpened: false
        };
    },

    search: function(e) {
        e.preventDefault();
        var cityName = e.target.firstChild.value;
        this.props.searchHandler(cityName);
        this.setState({openClass: '', buttonName: 'search', isOpened: false});
    },

    handleControl: function(e) {
        e.preventDefault();
        if(this.state.openClass != 'start') {
            if(this.state.isOpened)
                this.setState({openClass: '', buttonName: 'search', isOpened: false});
            else
                this.setState({openClass: 'open', buttonName: 'close', isOpened: true});
        }
    },

    render: function() {
        return (
            <div className={'organic_search ' + this.state.openClass}>
                <a href="#" className="organic_search_control btn-floating btn-large" onClick={ this.handleControl }>
                    <i className="small material-icons">{ this.state.buttonName }</i>
                </a>
                <form className="organic_search_form" onSubmit={ this.search }>
                    <input className="organic_search_form_input" placeholder="Search ..."></input>
                </form>
            </div>
        );
  }
});
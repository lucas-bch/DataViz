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
                <div className="container">
                    <form className="organic_search_form" onSubmit={ this.search }>
                        <input className="organic_search_form_input" placeholder="Search ..."></input>
                    </form>
                    <div className="organic_search_content">
                        <div className="row">
                            <div className="col s12 m6 l6 ">
                                <div className="card-panel grey lighten-5 z-depth-1">
                                    <div className="valign-wrapper">
                                        <div className="col s2">
                                            <img src="/images/city.jpg" className="circle responsive-img"/>
                                        </div>
                                        <div className="col s10">
                                            <div className="city"><strong>Paris</strong> (FR)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
  }
});
OrganicSearch = React.createClass({

    getInitialState: function() {
        return {
            openClass: '',
            buttonName: 'search',
            isOpened: false
        };
    },

    search: function(e) {
        e.preventDefault();
        var cityName = e.target.firstChild.value;
        console.log(cityName);
        this.props.searchHandler(cityName);
    },

    handleControl: function(e) {
        e.preventDefault();
        if(this.state.isOpened) {
            this.setState({openClass: '', buttonName: 'search', isOpened: false});
        } else {
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
                    <input className="organic_search_input" placeholder="Search ..."></input>
                </form>
            </div>
        );
  }
});
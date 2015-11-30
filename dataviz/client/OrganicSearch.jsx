OrganicSearch = React.createClass({

    getInitialState: function() {
        return {
            openClass: '',
            buttonName: 'search',
            isOpened: false
        };
    },

    handleControl: function(e) {
        e.preventDefault();
        if(this.state.isOpened) {
            this.setState({openClass: '', buttonName: 'search', isOpened: false});
        } else {
            this.setState({openClass: 'open', buttonName: 'call_made', isOpened: true});
        }
    },

    render: function() {
        return (
            <div className={'organic_search ' + this.state.openClass}>
                <a href="#" className="organic_search_control deep-orange" onClick={ this.handleControl }>
                    <i className="small material-icons">{ this.state.buttonName }</i>
                </a>
                <form className="organic_search_form">
                    <input className="organic_search_input" placeholder="Search ..." ></input>
                </form>
            </div>
        );
  }
});
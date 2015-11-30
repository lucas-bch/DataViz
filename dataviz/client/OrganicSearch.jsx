OrganicSearch = React.createClass({

    getInitialState: function() {
        return {
            openClass: ""
        };
    },

    handleOpening: function() {
        this.setState({openClass: "open"});
    },

      render: function() {
              return (
                  <div className={'organic_search ' + this.state.openClass}>
                      <form className="organic_search_form">
                      <input className="organic_search_input" placeholder="Search ..." onClick={this.handleOpening} ></input></form>
                  </div>
              );
  }
});
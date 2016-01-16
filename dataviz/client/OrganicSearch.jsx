var citiesSub;
OrganicSearch = React.createClass({

    getInitialState: function() {
        var scenarioState = this.props.scenarioState;
        return {
            openClass: scenarioState,
            buttonName: 'search',
            isOpened: false,
            cities: []
        };
    },

    searchHandler: function(e) {
        var cityName = e.target.firstChild.value;
        this.search(e,cityName);
    },

    search: function(e,name) {
        this.props.searchHandler(e,name);
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

    handleKeyPress: function(e) {
        var inputString = e.target.value.toLowerCase();

        if (inputString.length>0){
            if (citiesSub) {
                citiesSub.stop();
            }

            citiesSub = Meteor.subscribe("cities", inputString, {
                onReady: function(){
                    console.log("we subscribed to cities " + inputString + " :) ");
                    //that.props.cities= City.find().fetch();
                }
            });
            console.log(City.find().fetch());

            /*$.get('/json/liste_villes.json', function(result) {
                if (this.isMounted()) {

                    var currentSearch = result.villes.filter(function(x) {
                        return x.toLowerCase().indexOf(inputString)>-1;
                    });

                    currentSearch.sort(
                        function compare(a, b) {
                            var indexeA = a.toLowerCase().indexOf(inputString);
                            var indexeB = b.toLowerCase().indexOf(inputString);

                            if (indexeA>indexeB){
                                return -1;
                            }

                            if (indexeA<indexeB){
                                return 1;
                            }
                            return 0;
                        }
                    );

                    currentSearch.splice(0,currentSearch.length-6);

                    this.setState({
                        cities: currentSearch
                    });
                }
            }.bind(this));*/
        }

    },

    render: function() {
        return (
            <div className={'organic_search ' + this.state.openClass}>
                <a href="#" className="organic_search_control red lighten-1 btn-floating btn-large" onClick={ this.handleControl }>
                    <i className=" material-icons">{ this.state.buttonName }</i>
                </a>
                <div className="container">
                    <form className="organic_search_form" onSubmit={ this.searchHandler }>
                        <input className="organic_search_form_input" placeholder="Search ..." onChange={this.handleKeyPress}></input>
                    </form>
                    <div className="row">
                        <div className="organic_search_content">
                            <TemplateCities close={this.search} cities={this.state.cities} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

TemplateCities = React.createClass({
    render: function() {

        var rows = [];
        var root = this ;
        // iterate cities and build liste of jsx city
        if(this.props.cities.length == 0){
            rows.push(<TemplateCity img="warning.png" close={root.props.close} name="Aucun résultat"/>);
        }else{
            this.props.cities.forEach(function(element, index){
                rows.push(<TemplateCity img="city.jpg" key={index} close={root.props.close} name={element}/>);
            });
        }
        return (
            <div key={rows}>{rows}</div>
        );

    }
});

TemplateCity = React.createClass({

    handleSelectCity: function(e){
        this.props.close(e,this.props.name);
    },

    render: function() {
        return (
            <div className="col s12 m6 l6 ">
                <div className="card-panel  red lighten-1  z-depth-1">
                    <div className="valign-wrapper">
                        <div className="col s2">
                            <img src={"/images/" + this.props.img} className="circle responsive-img"/>
                        </div>
                        <div className="col s10">
                            <div onClick={ this.handleSelectCity } data="" className="city"><strong>{this.props.name}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

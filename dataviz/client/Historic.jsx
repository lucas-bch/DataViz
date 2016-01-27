

Historic = React.createClass({

    getInitialState: function() {
        return {
            avg: {
                "temp": 0, 
                "wind": 0, 
                "rain": 0
            },
            max: {
                "temp": 0, 
                "wind": 0,
                "rain": 0
            },
            min: {
                "temp": 0,
                "wind": 0,
                "rain": 0
            }
        };

    },

    componentWillReceiveProps : function(nextProps) {
        console.log(nextProps);
        var result = Weather.find({"city.name": nextProps.city}).fetch();
        console.log(result);
        this.setState({
                avg: {"temp": 5, "wind": 6, "rain": 7},
                max: {"temp": 8, "wind": 9, "rain": 10},
                min: {"temp": 11, "wind": 12, "rain": 13}
        });

        /*var result = Weather.find({"city.name": nextProps.city}).fetch();
        result = result[0];
        if (this.isMounted() && result != undefined) {
            result.list.forEach(function(element, index){
                // convertion de température
                element.main.temp = (element.main.temp - 273).toFixed(1);
                element.wind.speed = (element.wind.speed * 3.6).toFixed(1);
            });
            this.setState({
                avg: {temp: 5, wind: 6, rain: 7},
                max: {temp: 8, wind: 9, rain: 10},
                min: {temp: 11, wind: 12, rain: 13}
            });
        }*/
    },

    render: function(){
        return (
            <div className="historic-body">
                <div className="container center-align">
                    <h2 id="statistiques">Statistiques</h2>
                    <div className="row">

                        <div className="col s12 m6 offset-m3 offset-l3">
                            <ul  className="tabs">
                                <li  className="tab col s6">
                                    <a className="active" href="#moyennes">Moyennes
                                    </a>
                                </li>
                                <li  className="tab col s6">
                                    <a className="" href="#records">Records</a>
                                </li>
                                <div className="indicator"></div>
                            </ul>
                        </div>

                        <div id="moyennes" className="col s12">
                            <div className="row">
                                <div className="col m4">
                                    <BasicCard  color={"red"} unit = {"°C"} value = { this.state.avg.temp } title = {"Températures"}/>
                                </div>
                                <div className="col m4">
                                    <BasicCard  color={"green"} unit = {"km/h"} value = { this.state.avg.wind } title = {"Vent"}/>
                                </div>
                                <div className="col m4">
                                    <BasicCard  color={"blue"} unit = {"mm"} value = { this.state.avg.rain } title = {"Précipitations"}/>
                                </div>
                            </div>
                        </div>
                        <div id="records" className="col s12">
                            <div className="row">
                                <div className="col m4">
                                    <MaxMinCard color={"red"} unit = {"°C"} max = { this.state.max.temp } min={ this.state.min.temp } title = {"Températures"}/>
                                </div>
                                <div className="col m4">
                                    <MaxMinCard color={"green"} unit = {"km/h"} max = { this.state.max.wind } min={ this.state.min.wind } title = {"Vent"}/>
                                </div>
                                <div className="col m4">
                                    <MaxMinCard color={"blue"} unit = {"mm"} max = { this.state.max.rain } min={ this.state.min.rain } title = {"Précipitations"}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
});

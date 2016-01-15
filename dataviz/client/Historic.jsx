

Historic = React.createClass({
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
                                    <BasicCard  color={"red"} unit = {"°C"} value = {"25"} title = {"Températures"}/>
                                </div>
                                <div className="col m4">
                                    <BasicCard  color={"green"} unit = {"km/h"} value = {"25"} title = {"Vent"}/>
                                </div>
                                <div className="col m4">
                                    <BasicCard  color={"blue"} unit = {"mm"} value = {"25"} title = {"Précipitations"}/>
                                </div>
                            </div>
                        </div>
                        <div id="records" className="col s12">
                            <div className="row">
                                <div className="col m4">
                                    <MaxMinCard color={"blue"} unit = {"mm"} max = {"25"} min={"6"} title = {"Précipitations"}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
});

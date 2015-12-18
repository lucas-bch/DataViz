Historic = React.createClass({


    render: function(){
        return (
            <div className="historic-body">
                <div className="container center-align">
                    <a className="btn-floating center red  btn-large waves-effect waves-light z-depth-0" href="#statistiques"><i className="fa fa-chevron-down"></i></a>
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
                                    <div className="card red white-text">
                                            <span className="card-title">Températures</span>
                                        <div className="card-content">
                                            <h4>25°C</h4>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div id="records" className="col s12">
                            <div className="row">
                                <div className="col m4">
                                    <h4>Plus haute températures</h4>
                                    <p>25°C</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
        }

        });

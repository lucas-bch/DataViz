Header = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">My Weather</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li>
                        <form className="navbar-form navbar-left" role="search">
                            <button className="btn btn-default" >
                                <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                            </button>
                        </form>
                    </li>
                    <li><a href="#">12:25</a></li>
                </ul>

                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <form className="navbar-form navbar-left" role="search">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="location ?" />
                            </div>
                            <button type="submit" className="btn btn-default">
                                <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                            </button>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
  }
});
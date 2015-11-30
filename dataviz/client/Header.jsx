Header = React.createClass({
  render: function() {
    return (

        <nav className="cyan">
          <div className="nav-wrapper">
            <div className= "container">
              <a href="#" className="brand-logo">MyWeather</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><i className="small material-icons">search</i></li>

              </ul>
            </div>
          </div>
        </nav>
    );
  }
});
Header = React.createClass({
  render: function() {
    return (

        <nav>
          <div className="nav-wrapper">
            <div className= "container">
              <a href="#" className="brand-logo">MyWeather</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><i className="small material-icons">search</i></li>
                <li> <div className="input-field">
                  <input id="last_name" placeholder="Location "  type="text"></input>
                </div></li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
});
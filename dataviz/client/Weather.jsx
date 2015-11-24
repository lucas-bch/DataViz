Weather = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    weather: React.PropTypes.object.isRequired
  },
  render: function() {
    return (
      <li>{this.props.weather.text}</li>
    );
  }
});


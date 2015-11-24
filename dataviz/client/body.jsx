if (Meteor.isClient) {
  Meteor.startup(function () {
  	React.render(<App />, document.getElementById("body-wrapper"));
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}

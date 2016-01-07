
//*******************************
//              MAIN
//*******************************

if (Meteor.isClient) {
  Meteor.startup(function () {
    //React.render(<Loader />, document.getElementById("loadscreen-wrapper"));
    React.render(<App />, document.getElementById("body-wrapper"));

  });

}

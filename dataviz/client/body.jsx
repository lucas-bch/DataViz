
//*******************************
//              MAIN
//*******************************

if (Meteor.isClient) {
  Meteor.startup(function () {
    React.render(<App />, document.getElementById("body-wrapper"));
  });

  $(document).ready(function(){
    // Initialize collapse button
    $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    //$('.collapsible').collapsible();

  })

}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}






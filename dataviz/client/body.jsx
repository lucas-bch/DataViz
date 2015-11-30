

var data = {
    // A labels array that can contain any sort of values
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
        [5, 2, 4, 2, 0,2,1,3,4  ]
    ]
};

// As options we currently only set a static size of 300x200 px
var options = {
    height: '250px',
    low: 0,
    showArea: true
};


//*******************************
//              MAIN
//*******************************

if (Meteor.isClient) {
  Meteor.startup(function () {
    React.render(<App />, document.getElementById("body-wrapper"));
  });

  $(document).ready(function(){
    drawChart();
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

// Resize chart




// Draw chart
function drawChart() {

    // In the global name space Chartist we call the Line function to initialize a line chart. As a first parameter we pass in a selector where we would like to get our chart created. Second parameter is the actual data object and as a third parameter we pass in our options
    new Chartist.Line('.ct-chart', data, options);
}

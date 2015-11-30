var data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      fillColor: "rgba(151,187,205,0.5)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      data: [28, 48, 40, 19, 96, 27, 100]
    }
  ]
}


var options = {

  scaleFontColor: "#122b40",

  ///Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines : false,

  //Number - Width of the grid lines
    scaleGridLineWidth : 0,

  //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

  //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

  //Boolean - Whether the line is curved between points
    bezierCurve : false,

  //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

  //Boolean - Whether to show a dot for each point
    pointDot : true,

  //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

  //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

  //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

  //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

  //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

  //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,


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

  $(document).onresize(function(){

  })

}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}

// Resize chart




// Draw chart
function drawChart() {

  Chart.defaults.global.responsive = false;

  //Get context with jQuery - using jQuery's .get() method.
  var ctx = $("#myChart").get(0).getContext("2d");
  //This will get the first returned node in the jQuery collection.
  var myNewChart = new Chart(ctx);

  new Chart(ctx).Line(data,options);
}

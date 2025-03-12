'use strict'

google.charts.load('current', {
  'packages':['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  let data = google.visualization.arrayToDataTable([
    ['Country', 'color'],

    ['Germany', 900],
    ['United States', 850],
    ['Greece', 600],
    ['China', 500],
    ["Hong Kong",650],  
    ['Australia', 800],
    ['United Kingdom', 750],
    ['Japan', 700],
    ['Malaysia', 650],
    ['South Korea', 650],
    ['Singapore', 600],
    ['Switzerland', 1000],
    ['Thailand', 600],
    ['RU', 680],

  ]);

  let options = {
    colors: ['#BAA9F9','#FDA9AE'],
    backgroundColor: '#A9C9FD',
    magnifyingGlass: {enable: true, zoomFactor: 7.5},
    tooltip: {textStyle: {color: '#FE95C9'}, showColorCode: false},
  };

  var chart = new google.visualization.GeoChart(document.getElementById('myMap_div'));

  chart.draw(data, options);
}
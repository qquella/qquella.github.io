'use strict'

// Load Google Charts and draw the initial Geochart
google.charts.load('current', {
    'packages': ['geochart'],
  });
  google.charts.setOnLoadCallback(initializeMap);
  
  function initializeMap() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
  
    var options = {
      backgroundColor: '#A9C9FD',
      magnifyingGlass: { enable: true, zoomFactor: 7.5 },
      tooltip: { textStyle: { color: '#FE95C9' }, showColorCode: true },
    };
  
    var chart = new google.visualization.GeoChart(document.getElementById('countriesMap_div'));
    chart.draw(data, options);
  
    // Click event handler for country list items
    var countryList = document.getElementById('country-list');
    var countries = countryList.getElementsByTagName('li');
    for (var i = 0; i < countries.length; i++) {
      countries[i].addEventListener('click', function () {
        var countryCode = this.getAttribute('data-country');
        var selectedCountries = data.getNumberOfRows();
  
        if (selectedCountries === 0) {
          data.addRow([countryCode]);
        } else {
          for (var j = 0; j < selectedCountries; j++) {
            if (data.getValue(j, 0) === countryCode) {
              data.removeRow(j);
              break;
            } else if (j === selectedCountries - 1) {
              data.addRow([countryCode]);
            }
          }
        }
  
        // Draw the updated Geochart
        options.defaultColor = getRandomColor();
        chart.draw(data, options);
      });
    }
  }
  
  function getRandomColor() {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
  }
  

  //county mapping
  // Define continent-to-countries mapping
var continents = {
    Europe: ["Germany", "France", "Spain", /* Add European countries */],
    "North America": ["United States", "Canada", /* Add North American countries */],
    "South America": ["Brazil", "Argentina", /* Add South American countries */],
    Asia: ["China", "India", "Japan", /* Add Asian countries */],
    Africa: ["Nigeria", "Egypt", "South Africa", /* Add African countries */],
    Australia: ["Australia", "New Zealand", /* Add Australian countries */],
  };
  
  // Load Google Charts and draw the initial Geochart
  google.charts.load('current', {
    'packages': ['geochart'],
  });
  google.charts.setOnLoadCallback(initializeMap);
  
  function initializeMap() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
  
    var options = {
      backgroundColor: '#A9C9FD',
      magnifyingGlass: { enable: true, zoomFactor: 7.5 },
      tooltip: { textStyle: { color: '#FE95C9' }, showColorCode: true },
    };
  
    var chart = new google.visualization.GeoChart(document.getElementById('countriesMap_div'));
    chart.draw(data, options);
  
    // Click event handler for continent buttons
    var continentButtons = document.querySelectorAll('#continent-buttons button');
    continentButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var selectedContinent = this.getAttribute('data-continent');
        var countriesForContinent = continents[selectedContinent];
        populateCountryList(countriesForContinent);
      });
    });
  }
  
  function populateCountryList(countries) {
    var countryList = document.getElementById('country-list');
    countryList.innerHTML = '';
  
    countries.forEach(function (country) {
      var li = document.createElement('li');
      li.setAttribute('data-country', country);
      li.textContent = country;
      countryList.appendChild(li);
    });
  }
  
'use strict'

const continents = {
    Europe: [
        "Albania",
        "Andorra",
        "Armenia",
        "Austria",
        "Azerbaijan",
        "Belarus",
        "Belgium",
        "Bosnia and Herzegovina",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Georgia (country)",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Kazakhstan",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Malta",
        "Moldova",
        "Monaco",
        "Montenegro",
        "Netherlands",
        "North Macedonia",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United Kingdom",
        "Vatican City"
      ],
    "North America": [
        "United States",
        "Mexico",
        "Canada",
        "Guatemala",
        "Haiti",
        "Dominican Republic",
        "Cuba",
        "Honduras",
        "Nicaragua",
        "El Salvador",
        "Costa Rica",
        "Panama",
        "Jamaica",
        "Trinidad and Tobago",
        "Bahamas",
        "Belize",
        "Barbados",
        "Saint Lucia",
        "Grenada",
        "Saint Vincent and the Grenadines",
        "Antigua and Barbuda",
        "Dominica",
        "Saint Kitts and Nevis",
      ],
    "South America": [ 
    "Brazil",
    "Colombia",
    "Argentina",
    "Peru",
    "Venezuela",
    "Chile",
    "Ecuador",
    "Bolivia",
    "Paraguay",
    "Uruguay",
    "Guyana",
    "Suriname"],
    Asia: [
        "Afghanistan",
        "Armenia",
        "Azerbaijan",
        "Bahrain",
        "Bangladesh",
        "Bhutan",
        "Brunei",
        "Cambodia",
        "China",
        "Cyprus",
        "Georgia",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Israel",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Lebanon",
        "Malaysia",
        "Maldives",
        "Mongolia",
        "Myanmar",
        "Nepal",
        "North Korea",
        "Oman",
        "Pakistan",
        "Palestine",
        "Philippines",
        "Qatar",
        "Largest part of Russia",
        "Saudi Arabia",
        "Singapore",
        "South Korea",
        "Sri Lanka",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Thailand",
        "Timor-Leste",
        "Largest part of Turkey",
        "Turkmenistan",
        "United Arab Emirates",
        "Uzbekistan",
        "Vietnam",
        "Yemen"
      ],
    Africa: [
        "Algeria",
        "Egypt",
        "Ethiopia",
        "Guinea",
        "Liberia",
        "Morocco",
        "Senegal",
        "Togo",
        "Tunisia",
        "Zambia",
        "Angola",
        "Benin",
        "Botswana",
        "Burkina Faso",
        "Burundi",
        "Cameroon",
        "Cabo Verde",
        "Central African Republic",
        "Chad",
        "Comoros",
        "Cote d’Ivoire",
        "Republic of the Congo",
        "Djibouti",
        "Equatorial Guinea",
        "Eritrea",
        "Eswatini",
        "Gabon",
        "Gambia",
        "Ghana",
        "Guinea Bissau",
        "Kenya",
        "Lesotho",
        "Libya",
        "Madagascar",
        "Malawi",
        "Mali",
        "Mauritania",
        "Mauritius",
        "Mozambique",
        "Namibia",
        "Niger",
        "Nigeria",
        "DR Congo",
        "Rwanda",
        "Sao Tome and Principe",
        "Seychelles",
        "Sierra Leone",
        "South Africa",
        "South Sudan",
        "Sudan",
        "Tanzania",
        "Uganda",
        "Zimbabwe"
      ],
    Oceania: [
        "Australia",
        "Papua New Guinea",
        "New Zealand",
        "Fiji",
        "Solomon Islands",
        "Vanuatu",
        "Samoa",
        "Kiribati",
        "Federated States of Micronesia",
        "Tonga",
        "Marshall Islands",
        "Palau",
        "Nauru",
        "Tuvalu"
      ],
    Antarctica: ["Antarctica"]
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

    // Click event handler for country list items
    var countryList = document.querySelector('#country-list');
countryList.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    var countryCode = event.target.getAttribute('data-country');
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
    }
        // Draw the updated Geochart
        options.defaultColor = getRandomColor();
        chart.draw(data, options);
    });
        
  }

  function populateCountryList(countries) {
  var countryList = document.getElementById('country-list');
  countryList.innerHTML = '';

  requestAnimationFrame(function () {
    countries.forEach(function (country) {
      var li = document.createElement('li');
      li.setAttribute('data-country', country);
      li.textContent = country;
      countryList.appendChild(li);
    });
  });
}
  

  function getRandomColor() {
    return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
  }
  

  //share button function!
  document.getElementById("shareButton").addEventListener("click", function(event) {
    const shareOptions = document.getElementById("shareOptions");
    shareOptions.style.display = shareOptions.style.display === "block" ? "none" : "block";
  });

  document.getElementById("shareOptions").addEventListener("click", function(event) {
    const selectedOption = event.target.getAttribute("data-option");
    if (selectedOption) {
      const urlToShare = window.location.href;
      const shareUrls = {
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(urlToShare)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}`,
        instagram: `https://www.instagram.com/send?text=${encodeURIComponent(urlToShare)}`,
        mail: `mailto:?body=${encodeURIComponent(urlToShare)}`,
        snapchat: `https://www.snapchat.com/share?url=${encodeURIComponent(urlToShare)}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(urlToShare)}`,
        clipboard: urlToShare,
      };
      if (shareUrls[selectedOption]) {
        window.open(shareUrls[selectedOption], '_blank');
      } else if (selectedOption === 'clipboard') {
        const tempInput = document.createElement("input");
        tempInput.value = shareUrls[selectedOption];
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("Link copied to clipboard");
      } else {
        alert("Invalid selection");
      }
    }
    shareOptions.style.display = "none";
  });

  // Close the pop-up menu if user clicks outside of it
  document.addEventListener("click", function(event) {
    if (event.target !== document.getElementById("shareButton")) {
      document.getElementById("shareOptions").style.display = "none";
    }
  });

  document.getElementById("printButton").addEventListener("click", function() {
    window.print();
  });
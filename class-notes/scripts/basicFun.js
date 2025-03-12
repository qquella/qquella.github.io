function setDetails(open) {
  var i,
    a = document.getElementsByTagName("details");
  for (i in a) {
    a[i].open = open;
  }
}

var contents = "<nav>In Open Sections:";
betweenH1 = /<h1.*?(?=<h1|$)/gs;
anyHeaderID = /(?<=<h[1-3][^>]*id=").*?(?=")/gs;
anyHeaderText = /(?<=<h[123][^>]*>).*?(?=<\/h[123])/gs;
var newHTML, curIDs, curHeaders;

allCollapseableSections = document.getElementsByClassName("cnote");

for (var curBlock = 0; curBlock < allCollapseableSections.length; curBlock++) {
  // Onetime:
  //Create sections which are defined as area between two h1's
  var doc = allCollapseableSections[curBlock].innerHTML;
  var sectionsBody = doc.match(betweenH1);

  allCollapseableSections[curBlock].innerHTML = "";
  for (var i = 0; i < sectionsBody.length; i++) {
    //contents
    curHeaders = sectionsBody[i].match(anyHeaderText);
    curIDs = sectionsBody[i].match(anyHeaderID);
    contents += "<div data-id='" + curIDs[0] + "' hidden>";

    for (var j = 0; j < curHeaders.length; j++) {
      contents +=
        "<a href='#" + curIDs[j] + "'>" + curHeaders[j] + "</a><br />";
    }
    contents += "</div>";

    // Body
    allCollapseableSections[curBlock].innerHTML +=
      "<details id='" +
      curIDs[0] +
      "'><summary>" +
      sectionsBody[i].match(anyHeaderText)[0] +
      "</summary>" +
      sectionsBody[i] +
      "</details>";
  }
}
contents += "</nav";
document.getElementsByClassName("contents")[0].innerHTML = contents;

// Auto showing of sub-sections
function showSubsections(e) {
  const item = document.querySelector(`[data-id='${e.target.id}']`);
  item.toggleAttribute("hidden");
}

const sections = document.querySelectorAll("details");
sections.forEach((section) => {
  section.addEventListener("toggle", showSubsections);
});

// open close all sections
$("[href^='#']").on("click", function () {
  var $targetDIV = $(this.getAttribute("href"));
  if ($targetDIV.is(":hidden")) {
    $targetDIV.closest("details").prop("open", true);
  }
});

function toggleDetails() {
  var details = document.getElementsByTagName("details");
  var open = details[0] && !details[0].open; // Check the state of the first detail to decide the toggle state
  for (var i = 0; i < details.length; i++) {
    details[i].open = open;
  }
  // Update the button text based on the new state
  document.getElementById("toggleButton").textContent = open
    ? "Close all sections"
    : "Open all sections";
}

//scroll
document.addEventListener("DOMContentLoaded", function(event) { 
  var scrollpos = localStorage.getItem('scrollpos');
  if (scrollpos) window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function(e) {
  localStorage.setItem('scrollpos', window.scrollY);
};

// chang theme highligh
function toggleTheme() {
  const themeStylesheet = document.getElementById('theme-stylesheet');
  const themeToggleBtn = document.querySelectorAll('.theme-toggle');
  if (themeStylesheet.getAttribute('href') === 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/srcery.css') {
      themeStylesheet.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-light.css');
      themeToggleBtn.forEach((e) => e.textContent = 'Go Dark!');
      //themeToggleBtn.textContent = 'Go Dark!';
  } else {
      themeStylesheet.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/srcery.css');
      themeToggleBtn.forEach((e) => e.textContent = 'Switch to Light Mode');
      //themeToggleBtn.textContent = 'Switch to Light Mode';
  }
}
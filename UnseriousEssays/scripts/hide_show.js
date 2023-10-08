'use strict'

function showContent(contentId) {
  // Hide all content divs
  const contentDivs = document.getElementsByClassName('content');
  for (let i = 0; i < contentDivs.length; i++) {
    contentDivs[i].classList.add('hidden');
  }
  
  // Show the selected content div
  const selectedContentDiv = document.getElementById('content' + contentId);
  selectedContentDiv.classList.remove('hidden');
}

function toggleText(textId) {
  var expandedText = document.getElementById(textId);

  if (expandedText.style.display === "none") {
    expandedText.style.display = "block";
  } else {
    expandedText.style.display = "none";
  }
}

function saveFeedback() {
  var feedback = document.getElementById('feedback').value;
  localStorage.setItem('userFeedback', feedback);
}

function displayFeedback() {
  var savedFeedback = localStorage.getItem('userFeedback');
  if (savedFeedback) {
    document.getElementById('savedFeedback').textContent = savedFeedback;
  }
}

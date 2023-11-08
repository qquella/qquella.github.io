
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

  //detail pop-up for attrations
  // Reusable function to open and close pop-ups
function togglePopup(popupId) {
  var popup = document.getElementById(popupId);
  if (popup.style.display === 'block') {
    popup.style.display = 'none';
  } else {
    popup.style.display = 'block';
  }
}
// Close the pop-up when clicking the background overlay
function closePopupOnOverlayClick() {
  var popups = document.querySelectorAll('.popup');
  popups.forEach(function (popup) {
    popup.addEventListener('click', function (e) {
      if (e.target === this) {
        this.style.display = 'none';
      }
    });
  });
}
// Attach the function to all elements with class 'popup-trigger'
var popupTriggers = document.querySelectorAll('.popup-trigger');
popupTriggers.forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    var popupId = this.getAttribute('data-popup');
    togglePopup(popupId);
    closePopupOnOverlayClick()
  });
});

// Close the pop-up when clicking the close button
var closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener('click', function () {
    var popupId = this.getAttribute('data-popup');
    togglePopup(popupId);
  });
});
  

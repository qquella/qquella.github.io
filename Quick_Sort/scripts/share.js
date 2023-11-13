

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
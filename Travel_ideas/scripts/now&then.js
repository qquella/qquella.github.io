'use strict';

const images = {
  'now': ['../img/n-t/wt-n.jpeg', '../img/n-t/wt-n2.jpeg', '../img/n-t/wt-n3.jpeg', '../img/n-t/wt-n4.jpeg', '../img/n-t/ga-n.jpeg', '../img/n-t/ga-n2.jpeg',
  '../img/n-t/Agia-Sofia-Square/n1.jpeg', '../img/n-t/Agia-Sofia-Square/n2.jpeg', '../img/n-t/Agia-Sofia-Square/n3.jpeg', '../img/n-t/Aristotelous-n.png', '../img/n-t/Aristotelous-n2.png', '../img/n-t/Boardwalk-n.png', '../img/n-t/Boardwalk-n2.png', '../img/n-t/Yeni-Tzami-n.png', '../img/n1-t/Jewish-Primary-School-n.jpeg', '../img/n-t/Jewish-Primary-School-n.jpeg'
],
  'then': ['../img/n-t/wt-p.jpeg', '../img/n-t/wt-p2.jpeg', '../img/n-t/ga-p.jpeg', '../img/n-t/ga-p2.jpeg',
  '../img/n-t/Agia-Sofia-Square/p.jpeg', '../img/n-t/Aristotelous-p.png', '../img/n-t/Boardwalk-p.png', '../img/n-t/Yeni-Tzami-p.png', '../img/n-t/Jewish-Primary-School-p.jpeg'
]
};

const descriptions = {
  'now': ['Our journey begins with the iconic White Tower, a symbol synonymous with Thessaloniki. Originally constructed during the Ottoman period, the White Tower has stood as a silent witness to centuries of history. The juxtaposition of archival images capturing its original splendor and present-day photographs evokes a profound sense of time travel. As you delve into the images, you will witness the subtle changes in the Tower\'s surroundings, from the bustling markets of the past to the modern cityscape that now envelops this historic monument.', 'White Tower', 'White Tower', 'White Tower', 'Arch of Galerius', 'Arch of Galerius', 'Pictured is Agia Sofia Square, which is a small square right in front of one of Thessaloniki’s oldest churches, church of Agia Sofia (Holy Wisdom). The church was constructed in the 8th century AD with an architectural design similar to the Church of Hagia Sofia in present day Istanbul, Constantinople. (Evangelidis, 2014) Inside the cathedral, it contains beautiful Byzantine frescoes and mosaics.', 'Agia Sofia Square', 'Agia Sofia Square', '	The main city square of Thessaloniki is Aristotelous Square, and it is located in the center of the city. Although many of the buildings surrounding the square have been renovated and restored, Enerest Hébrard was the French architect who designed this famous square in 1918. Additionally, the architectural style of Aristotelous Square includes a mixture of Byzantine and Western European elements. (Evangelidis, 2014)', 'Aristotelous Square', 'One of the most iconic parts of Thessaloniki is the boardwalk also known as the promenade. This pathway along the waterfront takes you directly to the downtown of Thessaloniki, and many tourists as well as locals walk on it daily. The two parts of this boardwalk are the Old Promenade (Palia Paralia) and the New Promenade (Nea Paralia), and it spans across five kilometers. As you walk along the boardwalk, you will be able to see many historical sites and monuments, such as the White Tower, the statue of Alexander the Great, and the Umbrellas. There is also a designated pathway for scooters and bicyclists to ride on since it is very easy to rent and use by downloading the app. This is a wonderful place to hang out with your friends. For example, I have done a yoga class with a couple students on the boardwalk, and it is also one of the best places to watch the sunrise and sunset.', 'Boardwalk', 'The Yeni Tzami, in Thessaloniki was built in 1902 by the Doenme, Islamized Jews, and inspired by the commander Mehmet Hairi Pasha. (Horne, 2020) It was designed by the Italian architect Vitaliano Poselli in an eclectic style that combines Islamic and Western elements. The mosque reflects the wealth and prestige of the Doenme community and their cosmopolitan spirit. After the Treaty of Lausanne and the population exchange, the Doenme had to leave Thessaloniki and the mosque was used as a temporary refugee camp. (Horne, 2020) From 1925 to 1963, it housed the Archaeological Museum of Thessaloniki. (Samaras 2009) In 1986, it became a cultural center of the Municipality of Thessaloniki. Today, it hosts cultural activities and has a rich collection of marble sculptures from the Roman and pre-Christian times.', 'Many Thessalonians, regardless of their religion, always sent their children to a Jewish school for better education. (GAVRA, 2017) This tradition was abruptly interrupted with the outbreak of World War II when the Nazi\'s took over the city. The purge of 96% of the Jewish population of the city instantly destroyed the Jewish community and the network of twenty-eight Jewish schools. After the War, only few Jews returned to the city, however an effort to reconstitute the community of the city provided many post-war children with education. (GAVRA, 2017) The building of this Jewish elementary school was originally used to provide food to orphans and other poor kids. The Jewish school went into operation in 1979 as an elementary school with 2 classes of primary and kindergarten. Till date, the Jewish school offers children aged 3-12 a high level of education and also a Jewish education. It remains the only Jewish school in the city.'],
  
  'then': ['Moving on to the Arch of Galerius, another architectural gem that has weathered the ages, we explore the juxtaposition of images capturing its grandeur in different eras. Originally built to commemorate the Roman Emperor Galerius\' victory, the arch\'s majestic reliefs and intricate details come to life as we compare historical images with their contemporary counterparts. The Arch of Galerius serves as a living testament to the city\'s layered past, where ancient triumphs coexist with the vibrant pulse of the present.', 'White Tower', 'Arch of Galerius', 'Arch of Galerius', 'Pictured is Agia Sofia Square, which is a small square right in front of one of Thessaloniki’s oldest churches, church of Agia Sofia (Holy Wisdom). The church was constructed in the 8th century AD with an architectural design similar to the Church of Hagia Sofia in present day Istanbul, Constantinople. Inside the cathedral, it contains beautiful Byzantine frescoes and mosaics.', '	The main city square of Thessaloniki is Aristotelous Square, and it is located in the center of the city. Although many of the buildings surrounding the square have been renovated and restored, Enerest Hébrard was the French architect who designed this famous square in 1918. Additionally, the architectural style of Aristotelous Square includes a mixture of Byzantine and Western European elements.', 'One of the most iconic parts of Thessaloniki is the boardwalk also known as the promenade. This pathway along the waterfront takes you directly to the downtown of Thessaloniki, and many tourists as well as locals walk on it daily. The two parts of this boardwalk are the Old Promenade (Palia Paralia) and the New Promenade (Nea Paralia), and it spans across five kilometers. As you walk along the boardwalk, you will be able to see many historical sites and monuments, such as the White Tower, the statue of Alexander the Great, and the Umbrellas. There is also a designated pathway for scooters and bicyclists to ride on since it is very easy to rent and use by downloading the app. This is a wonderful place to hang out with your friends. For example, I have done a yoga class with a couple students on the boardwalk, and it is also one of the best places to watch the sunrise and sunset.', 'The Yeni Tzami, in Thessaloniki was built in 1902 by the Doenme, Islamized Jews, and inspired by the commander Mehmet Hairi Pasha. It was designed by the Italian architect Vitaliano Poselli in an eclectic style that combines Islamic and Western elements. The mosque reflects the wealth and prestige of the Doenme community and their cosmopolitan spirit. After the Treaty of Lausanne and the population exchange, the Doenme had to leave Thessaloniki and the mosque was used as a temporary refugee camp. From 1925 to 1963, it housed the Archaeological Museum of Thessaloniki. In 1986, it became a cultural center of the Municipality of Thessaloniki. (Horne, 2020) Today, it hosts cultural activities and has a rich collection of marble sculptures from the Roman and pre-Christian times.', 'Many Thessalonians, regardless of their religion, always sent their children to a Jewish school for better education. This tradition was abruptly interrupted with the outbreak of World War II when the Nazi\'s took over the city. The purge of 96% of the Jewish population of the city instantly destroyed the Jewish community and the network of twenty-eight Jewish schools. After the War, only few Jews returned to the city, however an effort to reconstitute the community of the city provided many post-war children with education. The building of this Jewish elementary school was originally used to provide food to orphans and other poor kids. The Jewish school went into operation in 1979 as an elementary school with 2 classes of primary and kindergarten. Till date, the Jewish school offers children aged 3-12 a high level of education and also a Jewish education. It remains the only Jewish school in the city.']
};

function changeImage(imageId, album, direction, descriptionId) {
  const imageElement = document.getElementById(imageId);
  const descriptionElement = document.getElementById(descriptionId);

  // Retrieve the current index from the data attribute or set it to 0 if not present
  let currentIndex = parseInt(imageElement.getAttribute('data-index')) || 0;

  // Calculate the new index
  let newIndex = (currentIndex + direction + images[album].length) % images[album].length;
  if (newIndex < 0) {
    newIndex = images[album].length - 1; // Wrap around to the last image
  }

  // Set the new index as a data attribute
  imageElement.setAttribute('data-index', newIndex);

  // Update the image source and description
  imageElement.src = images[album][newIndex];
  descriptionElement.textContent = descriptions[album][newIndex];
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
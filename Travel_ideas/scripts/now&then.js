'use strict';

const images = {
  'now': ['../img/n-t/wt-n.jpeg', '../img/n-t/wt-n2.jpeg', '../img/n-t/wt-n3.jpeg', '../img/n-t/wt-n4.jpeg', '../img/n-t/ga-n.jpeg', '../img/n-t/ga-n2.jpeg'],
  'then': ['../img/n-t/wt-p.jpeg', '../img/n-t/wt-p2.jpeg', '../img/n-t/ga-p.jpeg', '../img/n-t/ga-p2.jpeg']
};

const descriptions = {
  'now': ['Our journey begins with the iconic White Tower, a symbol synonymous with Thessaloniki. Originally constructed during the Ottoman period, the White Tower has stood as a silent witness to centuries of history. The juxtaposition of archival images capturing its original splendor and present-day photographs evokes a profound sense of time travel. As you delve into the images, you will witness the subtle changes in the Tower\'s surroundings, from the bustling markets of the past to the modern cityscape that now envelops this historic monument.', 'White Tower', 'White Tower', 'White Tower', 'Arch of Galerius'],
  'then': ['Moving on to the Arch of Galerius, another architectural gem that has weathered the ages, we explore the juxtaposition of images capturing its grandeur in different eras. Originally built to commemorate the Roman Emperor Galerius\' victory, the arch\'s majestic reliefs and intricate details come to life as we compare historical images with their contemporary counterparts. The Arch of Galerius serves as a living testament to the city\'s layered past, where ancient triumphs coexist with the vibrant pulse of the present.', 'White Tower', 'Arch of Galerius', 'Arch of Galerius']
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

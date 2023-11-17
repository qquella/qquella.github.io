'use strict';

const images = {
  'now': ['../img/n-t/wt-n.jpeg', '../img/n-t/wt-n2.jpeg', '../img/n-t/wt-n3.jpeg', '../img/n-t/wt-n4.jpeg', '../img/n-t/ga-n.jpeg', '../img/n-t/ga-n2.jpeg'],
  'then': ['../img/n-t/wt-p.jpeg', '../img/n-t/wt-p2.jpeg', '../img/n-t/ga-p.jpeg', '../img/n-t/ga-p2.jpeg']
};

const descriptions = {
  'now': ['Description 1', 'Description 2', 'Description 3', 'Description 4', 'Description 5'],
  'then': ['Description A', 'Description B', 'Description C', 'Description D']
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

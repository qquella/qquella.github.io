'use strict'

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let textIndex = 0;

function showSlide(n) {
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active-slide');
    }
    slides[currentSlide].classList.add('active-slide');

    // Store the current slide index in localStorage
    localStorage.setItem('currentSlide', currentSlide);

    // Hide all text elements when switching slides
    const hiddenTextElements = document.querySelectorAll('.hidden-text');
    for (let i = 0; i < hiddenTextElements.length; i++) {
        hiddenTextElements[i].style.display = 'none';
    }

    textIndex = 0
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function toggleText() {
  // Toggle the visibility of all text elements
  const hiddenTextElements = document.querySelectorAll(`#slide${currentSlide+1} .hidden-text`);
  
      hiddenTextElements[textIndex].style.display = hiddenTextElements[textIndex].style.display === 'none' ? 'block' : 'none';

      textIndex ++;
  }


// Initial setup
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the last saved slide index from localStorage
    const savedSlide = localStorage.getItem('currentSlide');

    // Set the current slide to the saved slide index or 0 if not found
    currentSlide = savedSlide !== null ? parseInt(savedSlide) : 0;

    showSlide(currentSlide);
});

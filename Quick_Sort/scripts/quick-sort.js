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

  // Toggle the font size when clicking on .shrink
  const toShrink1 = Array.from(document.querySelectorAll('.shrink'));
  const toShrink2 = Array.from(document.querySelectorAll('.shrink span'));
  toShrink1.forEach(ele => {
      ele.addEventListener('click', () => {
          ele.style.fontSize = '1em';
      });
  });
  toShrink2.forEach(ele => {
    ele.addEventListener('click', () => {
        ele.style.fontSize = '2em';
    });
  });

// Initial setup
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the last saved slide index from localStorage
    const savedSlide = localStorage.getItem('currentSlide');

    // Set the current slide to the saved slide index or 0 if not found
    currentSlide = savedSlide !== null ? parseInt(savedSlide) : 0;

    showSlide(currentSlide);
});

//For Math display
// Function to calculate k based on the initial input
function calculateK() {
  // Get the values of n and t from the input fields
  const n = parseFloat(document.getElementById('input-n').value);
  const t = parseFloat(document.getElementById('input-t').value);

  // Calculate k using the formula k = t / n^2
  const k = t / (n * n);

  // Display the calculated k value in MathJax format
  document.getElementById('result-k').textContent = `\\(${k}\\)`;
  // Render MathJax
  MathJax.typeset();
}

// Function to calculate t based on subsequent input
function calculateT() {
  // Get the values of n from the input field
  const n2 = parseFloat(document.getElementById('input-n2').value);

  // Get the previously calculated value of k
  const k = parseFloat(document.getElementById('result-k').textContent);

  // Calculate t using the formula t = k * n^2
  const t2 = k * (n2 * n2);

 // Display the calculated t value in MathJax format
 document.getElementById('result-t2').textContent = `\\(${t2}\\)`;
 // Render MathJax
 MathJax.typeset();
}
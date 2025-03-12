'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const savedTextSet = localStorage.getItem('currentTextSet');
    toggleTextSet(savedTextSet || 'textSet1');
});

function toggleText(id) {
    var hiddenText = document.getElementById(id);
    hiddenText.style.display = (hiddenText.style.display === "" || hiddenText.style.display === "block") ? "none" : "block";
}

function toggleTextSet(id) {
    const textSet1 = document.getElementById('textSet1');
    const textSet2 = document.getElementById('textSet2');
    const textSet3 = document.getElementById('textSet3');

    if (id === 'textSet1') {
        textSet1.style.display = 'block';
        textSet2.style.display = 'none';
        textSet3.style.display = 'none';
    } else if (id === 'textSet2') {
        textSet2.style.display = 'block';
        textSet1.style.display = 'none';
        textSet3.style.display = 'none';
    } else {
        textSet1.style.display = 'none';
        textSet2.style.display = 'none';
        textSet3.style.display = 'block';
    }

    // Save the current text set to localStorage
    localStorage.setItem('currentTextSet', id);
}

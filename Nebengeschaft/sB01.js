//js 
// Countdown 
    const countdownElement = document.getElementById('countdown');
    let count = 3;
    const countdownInterval = setInterval(() => {
      count--;
      countdownElement.textContent = count;
      if (count === 0) {
        clearInterval(countdownInterval);
        showGraffiti();
        showFireworks();
        showImg();
      }
    }, 1000);

    // Graffiti 
    const graffitiElement = document.getElementById('graffiti');
    
    function showGraffiti() {
      countdownElement.style.display = 'none';
      graffitiElement.style.display = 'block';
    }
    // Img
    const imgElements = document.querySelectorAll('.aImg');
    function showImg() {
      imgElements.forEach(img => {
        img.style.display = 'block';
      })
    }

    // Fireworks functionality
    const fireworksContainer = document.getElementById('fireworks');

    function showFireworks() {
      const fireworksCount = 50;
      const containerWidth = fireworksContainer.offsetWidth;
      const containerHeight = fireworksContainer.offsetHeight;

      for (let i = 0; i < fireworksCount; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${getRandomNumber(0, containerWidth)}px`;
        firework.style.top = `${getRandomNumber(0, containerHeight)}px`;
        firework.style.animationDelay = `${getRandomNumber(0, 2000)}ms`;

        //ran color
        const randomColor = getRandomColor();
        firework.style.backgroundColor = randomColor;

        //ran shape
        const randomSize = getRandomNumber(5, 30);
        const randomShape = getRandomShape();

        firework.style.width = `${randomSize}px`;
        firework.style.height = `${randomSize}px`;        
    
        //display
        fireworksContainer.appendChild(firework);
      }
    }

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomColor() {
      const r = getRandomNumber(0, 255);
      const g = getRandomNumber(0, 255);
      const b = getRandomNumber(0, 255);
      return `rgb(${r}, ${g}, ${b})`;
    }

    function getRandomShape() {
      const shapes = ['circle', 'heart', 'star'];
      const randomIndex = Math.floor(Math.random() * shapes.length);
      return shapes[randomIndex];
    }
    
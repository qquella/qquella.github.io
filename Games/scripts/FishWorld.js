let playerFish;
let fishes = [];
let snacks = [];
let width = 1200;
let height = 800;
let highestScore = 0;
let backgroundImg;
let gameEnded = false;
let gameStarted = false;

let fishImages = [];
let playerFishRightImg;
let playerFishLeftImg;
let speedSnackImg;
let sizeSnackImg;
let frozenSnackImg;
let evilImg;
let fireImg;
let winImg;
let ggImg;
let startImages = [];
let startButton;


function preload() {
  backgroundImg = loadImage("img/background.png");
  fishImages = [
    loadImage("img/FishRight2.png"),
    loadImage("img/FishRight1.png"),
    loadImage("img/FishRight3.png"),
    loadImage("img/FishLeft1.png"),
    loadImage("img/FishLeft2.png"),
    loadImage("img/FishLeft3.png"),
  ];
  playerFishRightImg = loadImage("img/FishRight.png");
  playerFishLeftImg = loadImage("img/FishLeft.png");
  speedSnackImg = loadImage("img/speedSnack.png");
  sizeSnackImg = loadImage("img/sizeSnack.png");
  frozenSnackImg = loadImage("img/frozenSnack.png");
  evilImg = loadImage("img/evil.png");
  fireImg = loadImage("img/fire.png");
  winImg = loadImage("img/win.png");
  ggImg = loadImage("img/GG.png");
  startImages[0] = loadImage('img/start1.png');
  startImages[1] = loadImage('img/start2.png');
}

// function setup() {
//   createCanvas(width, height);
//   playerFish = new PlayerFish(width / 2, height / 2, 50, 3); // Adjusted size for better visibility
//   for (let i = 0; i < 10; i++) {
//     fishes.push(
//       new BackgroundFish(
//         random(width),
//         random(height),
//         random(50, 100),
//         random(2, 12),
//         random() > 0.5
//       )
//     );
//   }
// }

// function draw() {
//   background(backgroundImg); // Draw background image

//   handleMovement();

//   playerFish.update();
//   playerFish.display();

//   for (let fish of fishes) {
//     fish.update();
//     fish.display();
//   }

//   for (let snack of snacks) {
//     snack.display();
//   }

//   fill(255);
//   textSize(24);
//   text("Score: " + playerFish.score, 100, 30);
//   text("Player Size: " + playerFish.size, 100, 60);
//   text("Bigger Fish: " + countLargerFish(playerFish), 100, 90);
//   text("Highest Score: " + highestScore, 100, 120);
//   text("Lives: " + playerFish.lives, 100, 150);

//   handleCollisions();

//   checkWinCondition();
// }


function setup() {
  createCanvas(width, height);
  noLoop();
  showStartScreen();
}

function showStartScreen() {
  let randomStartImage = random(startImages);
  background(randomStartImage);

  startButton = createButton('Start Game');
  startButton.position(windowWidth / 2.14 , windowHeight / .8);
  startButton.size(120, 60);
  startButton.style('font-size', '20px');
  startButton.style('font-family', 'Courier New')
  startButton.style('background-color', 'rgb(249, 158, 211)')
  startButton.style('font-size', '20px');

  startButton.mousePressed(startGame);
}

function startGame() {
  //enterFullScreen();
  startButton.hide();
  startNewGame();
  gameStarted = true;
  loop(); // Start the game loop
}

function startNewGame() {
  gameEnded = false;
  playerFish = new PlayerFish(width / 2, height / 2, 50, 3); // Adjusted size for better visibility
  fishes = [];
  snacks = [];
  for (let i = 0; i < 10; i++) {
    fishes.push(new BackgroundFish(random(width), random(height), random(30, 100), random(2, 12), random() > 0.5));
  }
  loop();
}

function draw() {

  if (!gameStarted) {
    return;
  }

  background(backgroundImg); // Draw background image

  if (gameEnded) {
    return;
  }

  handleMovement();

  playerFish.update();
  playerFish.display();

  for (let fish of fishes) {
    fish.update();
    fish.display();
  }

  for (let snack of snacks) {
    snack.display();
  }

  fill(255);
  textSize(24);
  text('Score: ' +  Math.floor(playerFish.score), 100, 30);
  text('Player Size: ' + playerFish.size, 100, 60);
  text('Bigger Fish: ' + countLargerFish(playerFish), 100, 90);
  text('Highest Score: ' +  Math.floor(highestScore), 100, 120);
  text('Lives: ' + playerFish.lives, 100, 150);

  handleCollisions();

  checkWinCondition();
}


function handleMovement() {
  if (!playerFish.isFrozen()) {
    playerFish.moveTowards(mouseX, mouseY);
  }
}

function handleCollisions() {
  for (let i = fishes.length - 1; i >= 0; i--) {
    if (playerFish.collidesWith(fishes[i])) {
      if (playerFish.canEat(fishes[i])) {
        playerFish.grow(fishes[i].size / 5);
        playerFish.score += fishes[i].size / 6;
        fishes.splice(i, 1);
      } else if (playerFish.size < fishes[i].size) {
        playerFish.loseLife();
        playerFish.setOnFire(true);
        playerFish.setFireEndTime(millis() + 1000);
        if (playerFish.lives <= 0) {
          if (playerFish.score > highestScore) {
            highestScore = playerFish.score;
          }
          if (playerFish.lives <= 0) {
            endGame(false); // Player lost
          }
        }
      }
    }
  }

  for (let i = snacks.length - 1; i >= 0; i--) {
    if (snacks[i].collidesWith(playerFish)) {
      snacks[i].collideAndDo(playerFish);
      snacks.splice(i, 1);
    }
  }

  if (frameCount % 50 === 0) {
    fishes.push(
      new BackgroundFish(
        random(width),
        random(height),
        random(16, 100),
        random(1, 12),
        random() > 0.5
      )
    );
  }
  if (frameCount % 120 === 0) {
    snacks.push(new SpeedSnack(random(width), random(height), 5, 200));
    snacks.push(new SizeSnack(random(width), random(height), 2));
  }
  if (frameCount % 220 === 0) {
    snacks.push(new FrozenSnack(random(width), random(height), 30));
  }
}

function countLargerFish(player) {
  let count = 0;
  for (let fish of fishes) {
    if (fish.size > player.size) {
      count++;
    }
  }
  return count;
}

function checkWinCondition() {
  if (countLargerFish(playerFish) === 0) {
    endGame(true); // Player won
  }
}

function endGame(didWin) {
  noLoop();
  gameEnded = true;
  gameStarted = false;
  if (playerFish.score > highestScore) {
    highestScore = playerFish.score;
  }
  displayEndScreen(didWin);
}

function displayEndScreen(didWin) {
  let endImage = didWin ? winImg : ggImg;
  image(endImage, width / 2 - endImage.width / 2, height / 2 - endImage.height / 2);
  fill(255);
  textSize(28);
  textAlign(CENTER);
  text('Score: ' +  Math.floor(playerFish.score), width / 2, height / 2.8 + endImage.height / 2.8 );
  text('Highest Score: ' +  Math.floor(highestScore), width / 2, height / 4 + endImage.height / 2);
  textSize(24);

  //text('Click to Restart', width / 2, height / 3 + endImage.height / 2 + 40);
  startButton = createButton('Start Game');
  startButton.position(windowWidth / 2.15 , windowHeight / .8);
  startButton.size(120, 60);
  startButton.style('font-size', '20px');
  startButton.style('font-family', 'Courier New')
  startButton.style('background-color', 'rgb(249, 158, 211)')
  startButton.style('font-size', '20px');

  startButton.mousePressed(startGame);
}


function mousePressed() {
  if (!gameStarted) {
    startNewGame();
  } else if (gameEnded) {
    startNewGame();
  }
}

class AFish {
  constructor(x, y, size, speed, movingRight, imgPath) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.movingRight = movingRight;
    this.imgPath = imgPath;
  }

  update() {
    if (this.movingRight) {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }
    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
  }

  display() {
    image(this.imgPath, this.x, this.y, this.size + 100, this.size + 100);

    //image(this.imgPath, this.x, this.y, this.size, this.size);
  }

  collidesWith(other) {
    let distance = dist(this.x, this.y, other.x, other.y);
    return distance < this.size / 2 + other.size / 2;
  }

  canEat(other) {
    return this.size > other.size;
  }
}

class PlayerFish extends AFish {
  constructor(x, y, size, speed) {
    super(x, y, size, speed, true, playerFishRightImg);
    this.score = 0;
    this.lives = 3;
    this.collisionCooldown = 0;
    this.speedBoostDuration = 0;
    this.frozenDuration = 0;
    this.onFire = false;
    this.fireEndTime = 0;
  }

  moveTowards(targetX, targetY) {
    let deltaX = targetX - this.x;
    let deltaY = targetY - this.y;
    this.x += deltaX * 0.05; // Adjust 0.05 to change the speed of following
    this.y += deltaY * 0.05; // Adjust 0.05 to change the speed of following

    this.movingRight = deltaX > 0;
    this.imgPath = this.movingRight ? playerFishRightImg : playerFishLeftImg;
  }

  loseLife() {
    if (this.collisionCooldown === 0) {
      this.lives -= 1;
      this.collisionCooldown = 90;
    }
  }

  grow(amount) {
    this.size += amount;
  }

  boostSpeed(boostAmount, boostDuration) {
    this.speed += boostAmount;
    this.speedBoostDuration = boostDuration;
  }

  updateSpeedBoost() {
    if (this.speedBoostDuration > 0) {
      this.speedBoostDuration -= 1;
      if (this.speedBoostDuration === 0) {
        this.speed -= 2;
      }
    }
  }

  freeze(duration) {
    this.frozenDuration = duration;
  }

  updateFrozen() {
    if (this.frozenDuration > 0) {
      this.frozenDuration -= 1;
    }
  }

  isFrozen() {
    return this.frozenDuration > 0;
  }

  display() {
    super.display();
    if (this.isFrozen()) {
      image(frozenSnackImg, this.x, this.y, 50 + this.size, 50 + this.size);
    }
    if (this.onFire) {
      image(fireImg, this.x + 2, this.y + 3, this.size * 2, this.size * 2);
    }
  }
  setOnFire(state) {
    this.onFire = state;
  }

  setFireEndTime(time) {
    this.fireEndTime = time;
  }

  update() {
    super.update();
    if (this.collisionCooldown > 0) {
      this.collisionCooldown -= 1;
    }
    if (this.onFire && millis() > this.fireEndTime) {
      this.setOnFire(false);
    }
    this.updateFrozen();
  }
}

class BackgroundFish extends AFish {
  constructor(x, y, size, speed, movingRight) {
    let imgPath = movingRight
      ? randomItem([fishImages[0], fishImages[1], fishImages[2]])
      : randomItem([fishImages[3], fishImages[4], fishImages[5]]);
    super(x, y, size, speed, movingRight, imgPath);
  }

  display() {
    if (this.size > playerFish.size) {
      image(evilImg, this.x, this.y, this.size + 50, this.size + 50);
    }
    super.display();
  }
}

class AThing {
  constructor(x, y, imgPath) {
    this.x = x;
    this.y = y;
    this.imgPath = imgPath;
  }

  display() {
    image(this.imgPath, this.x, this.y, 100, 100); // Adjusted size for better visibility
  }

  collidesWith(player) {
    let distance = dist(this.x, this.y, player.x, player.y);
    return distance < player.size / 2 + 20; // Adjusted collision distance
  }

  collideAndDo(player) {}
}

class SpeedSnack extends AThing {
  constructor(x, y, boostAmount, boostDuration) {
    super(x, y, speedSnackImg);
    this.boostAmount = boostAmount;
    this.boostDuration = boostDuration;
  }

  collideAndDo(player) {
    player.boostSpeed(this.boostAmount, this.boostDuration);
  }
}

class SizeSnack extends AThing {
  constructor(x, y, sizeIncrease) {
    super(x, y, sizeSnackImg);
    this.sizeIncrease = sizeIncrease;
  }

  collideAndDo(player) {
    player.grow(this.sizeIncrease);
  }
}

class FrozenSnack extends AThing {
  constructor(x, y, freezeDuration) {
    super(x, y, frozenSnackImg);
    this.freezeDuration = freezeDuration;
  }

  collideAndDo(player) {
    player.freeze(this.freezeDuration);
  }
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

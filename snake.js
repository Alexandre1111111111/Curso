//Variáveis e Constantes
    
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.width;
const boardBackground = "rgb(250, 223, 182)";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
const rst = document.querySelector("#resetBtn");
const volumeBtn = document.querySelector("#volumeBtn");
const musicBtn = document.querySelector("#musicBtn");
const settingsBtn = document.querySelector("#settingsBtn");
const tBar = document.querySelector("#tBar");
const timer = document.querySelector("#timer");

let startTime = 0;
let elapsedTime = 0;
let mins = 0;
let secs = 0;
let paused = true;
let intervalid;
let running = false;
let bgstyle;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let setValue = 1;
let snake = [
  {x:unitSize * 4, y:0},
  {x:unitSize * 3, y:0},
  {x:unitSize * 2, y:0},
  {x:unitSize, y:0},
  {x:0, y:0}
];

//Constantes de Audio

const eatAudio = new Audio('eatAudio.mp3');
const gameOverAudio = new Audio('gameOverSk.wav');

const backgroundMusic1 = new Audio('backgroundMusic.mp3');
const backgroundMusic2 = new Audio('backgroundMusic2.mp3');
const backgroundMusic3 = new Audio('backgroundMusic3.mp3');
const backgroundMusic4 = new Audio('backgroundMusic4.mp3');

//Sets de Audio

eatAudio.volume = 0.8;

backgroundMusic1.volume = 0.6;
backgroundMusic2.volume = 0.6;
backgroundMusic3.volume = 0.6;
backgroundMusic4.volume = 0.6;

gameOverAudio.volume = 0.7;

//Eventos de Botões

volumeBtn.addEventListener("click", () => {
  if (volumeBtn.src == "https://cdn-icons-png.flaticon.com/512/6996/6996058.png") {
    volumeBtn.src = "https://cdn-icons-png.flaticon.com/512/727/727240.png";
    volumeBtn.style.marginLeft = "6px";
    volumeBtn.style.marginRight = "6px";
    if (gameOverAudio.play) {
      gameOverAudio.pause();
    }
    if (eatAudio.play) {
      eatAudio.pause();
    }
    volumeBtn.style.height = "40px";
    volumeBtn.style.top = "5px";
  }
  else {
    volumeBtn.src = "https://cdn-icons-png.flaticon.com/512/6996/6996058.png"
    volumeBtn.style.height = "50px";
    volumeBtn.style.top = "0px";
    volumeBtn.style.marginLeft = "0px";
    volumeBtn.style.marginRight = "0px";
  }

});

musicBtn.addEventListener("click", () => {
  if (musicBtn.src == "https://cdn-icons-png.flaticon.com/512/122/122320.png") {
    musicBtn.src = "https://cdn-icons-png.flaticon.com/512/9702/9702929.png";
  }
  else {
    musicBtn.src = "https://cdn-icons-png.flaticon.com/512/122/122320.png"
  }
});

settingsBtn.addEventListener("click", () => {
  if (settingsBtn.style.rotate == "90deg") {
    settingsBtn.style.rotate = "0deg";
  }
  else {
    settingsBtn.style.rotate = "90deg";
  }
});

rst.addEventListener("mouseover", () => {
  rst.style.border = "4px solid #996600";
  rst.style.width = "120px";
});

rst.addEventListener("mouseout", () => {
  rst.style.border = bgstyle;
  rst.style.width = "115px";
});

window.addEventListener("keydown", changeDirection);
window.addEventListener("keyup", resetKey);

gameStart ? resetBtn.addEventListener("click", resetGame) : resetBtn.addEventListener("click", gameStart);

//Funções do Jogo

function gameStart(){
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
  gameOverAudio.pause();
  randomMusic();
  if (resetBtn.innerHTML == "Começar") {
    resetBtn.innerHTML = "Resetar";
  }
  if(paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalid = setInterval(updateTime, 1000);
  }
};

function nextTick(){
  if(running) {
    setTimeout(() =>{
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
      replaySong();
    }, 75)
  }
  else {
    displayGameOver();
    pauseTimer();
  }
  if (running && musicBtn.src == "https://cdn-icons-png.flaticon.com/512/122/122320.png") {
    backgroundMusic1.muted = false;
    backgroundMusic2.muted = false;
    backgroundMusic3.muted = false;
    backgroundMusic4.muted = false;
  }
  else {
    backgroundMusic1.muted = true;
    backgroundMusic2.muted = true;
    backgroundMusic3.muted = true;
    backgroundMusic4.muted = true;
  }
};

function clearBoard(){
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight)
};

function createFood(){
  function randomFood(min, max){
    const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
};

function drawFood(){
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
};

function moveSnake(){
  const head = {x: snake[0].x + xVelocity, 
                y: snake[0].y + yVelocity};
  snake.unshift(head);
  if(snake[0].x == foodX && snake[0].y == foodY) {
    score+=1;
    scoreText.textContent = score;
    createFood();
    if (volumeBtn.src == "https://cdn-icons-png.flaticon.com/512/6996/6996058.png") {
      eatAudio.currentTime = 0;
      eatAudio.play();
    }
    else {
      eatAudio.pause();
    }
  }
  else {
    snake.pop();
  }
};

function drawSnake(){
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  })
};

function changeDirection(event){

  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
  const A = 65;
  const D = 68;
  const S = 83;
  const W = 87;


  const goingUp = (yVelocity == -unitSize);
  const goingDown = (yVelocity == unitSize);
  const goingRight = (xVelocity == unitSize);
  const goingLeft = (xVelocity == -unitSize);
setTimeout(() =>{
  switch(true) {
    case(keyPressed == LEFT && !goingRight):
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
      case(keyPressed == UP && !goingDown):
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
      case(keyPressed == RIGHT && !goingLeft):
      xVelocity = unitSize;
      yVelocity = 0;
      break;
      case(keyPressed == DOWN && !goingUp):
      xVelocity = 0;
      yVelocity = unitSize;
      break;
      case(keyPressed == A && !goingRight):
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
      case(keyPressed == W && !goingDown):
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
      case(keyPressed == D && !goingLeft):
      xVelocity = unitSize;
      yVelocity = 0;
      break;
      case(keyPressed == S && !goingUp):
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}, 75)
};

function checkGameOver(){
  switch(true) {
    case (snake[0].x < 0):
      setValue = 1;
      running = false;
      break;
    case (snake[0].x >= gameWidth):
      setValue = 1;
      running = false;
    break;
    case (snake[0].y < 0):
      setValue = 1;
      running = false;
    break;
    case (snake[0].y >= gameWidth):
      setValue = 1;
      running = false;
    break;
  }
  for(let i = 1; i < snake.length; i+=1) {
    if(snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      setValue = 1;  
      running = false;
    }
  }
  if (!running) {
    backgroundMusic1.currentTime = 0;
    backgroundMusic2.currentTime = 0;
    backgroundMusic3.currentTime = 0;
    backgroundMusic4.currentTime = 0;
    backgroundMusic1.pause();
    backgroundMusic2.pause();
    backgroundMusic3.pause();
    backgroundMusic4.pause();
  }
};

function displayGameOver(){
  ctx.font = "50px Roboto";
  ctx.fillStyle = "#cc3300";
  ctx.textAlign = "center";
  if (setValue == 0) {
    ctx.fillText("", gameWidth / 2, gameHeight / 2); 
  }
  else if (setValue == 1) {
    ctx.fillText("FIM DE JOGO!", gameWidth / 2, gameHeight / 2);
    ctx.font = "35px Roboto";
    ctx.fillStyle = "#bf7021";
    if(score == 1) {
      ctx.fillText(`Você marcou ${score} ponto`, gameWidth / 2, 300);
    }
    else{
      ctx.fillText(`Você marcou ${score} pontos`, gameWidth / 2, 300);
    }
  }

  running = false;
  if (!running) {
    if (volumeBtn.src == "https://cdn-icons-png.flaticon.com/512/6996/6996058.png") {
      gameOverAudio.currentTime = 0;
      gameOverAudio.play();
    }
  }
  else {
    gameOverAudio.pause();
  }
};

function resetGame(){
    running = false;
    gameOverAudio.pause();
    resetTimer();
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0},
        ];
        setTimeout(() => {
            if(!running) {
                gameStart();
                setValue = 0;
            }
        }, 100);
};

function resetKey(event) {
  const keyPressed = event.keyCode;
  const R = 82;
  if(keyPressed == R && resetBtn.innerHTML != "Começar"){
  resetGame();
  }
  
};

//Funções de Música

function randomMusic() {
  const randomNum = Math.round(Math.random() * 3 + 1);
  switch(randomNum) {
    case 1:
      bg1Style();
      backgroundMusic1.play();
    break;
    case 2: 
      bg2Style();
      setTimeout(() => {
      backgroundMusic2.play();
      }, 300);
    break;
    case 3:
      bg3Style();
      setTimeout(() => {
      backgroundMusic3.play();
      }, 300);
    break;
    case 4:
      bg4Style();
      setTimeout(() => {
      backgroundMusic4.play();
      }, 300);
    break;
  }
};

function replaySong() {
    setTimeout(() => {
  switch(true) {
    case backgroundMusic1.currentTime == backgroundMusic1.duration:
      backgroundMusic1.pause();
      backgroundMusic1.currentTime = 0;
      randomMusic();
    break;
    case backgroundMusic2.currentTime == backgroundMusic2.duration:
      backgroundMusic2.pause();
      backgroundMusic2.currentTime = 0;
      randomMusic();
    break;
    case backgroundMusic3.currentTime == backgroundMusic3.duration:
      backgroundMusic3.pause();
      backgroundMusic3.currentTime = 0;
      randomMusic();
    break;
    case backgroundMusic4.currentTime == backgroundMusic4.duration:
      backgroundMusic4.pause();
      backgroundMusic4.currentTime = 0;
      randomMusic();
    break;
  }
}, 1000);
};

//Funções de Estilo

function bg1Style() {
  bgstyle = "5px solid #cf5408";
  gameBoard.style.border = "5px solid #cf5408";
  gameBoard.style.boxShadow = "3px 3px 3px #cf5408";
  resetBtn.style.border = bgstyle;
  resetBtn.style.boxShadow = "3px 3px 3px #cf5408";
};

function bg2Style() {
  bgstyle = "5px solid #edda7b";
  gameBoard.style.border = "5px solid #edda7b";
  gameBoard.style.boxShadow = "3px 3px 3px #edda7b";
  resetBtn.style.border = bgstyle;
  resetBtn.style.boxShadow = "3px 3px 3px #edda7b";
};

function bg3Style() {
  bgstyle = "5px solid #4ecfde";
  gameBoard.style.border = "5px solid #4ecfde";
  gameBoard.style.boxShadow = "3px 3px 3px #4ecfde";
  resetBtn.style.border = bgstyle;
  resetBtn.style.boxShadow = "3px 3px 3px #4ecfde";
};

function bg4Style() {
  bgstyle = "5px solid #b373d9";
  gameBoard.style.border = "5px solid #b373d9";
  gameBoard.style.boxShadow = "3px 3px 3px #b373d9";
  resetBtn.style.border = bgstyle;
  resetBtn.style.boxShadow = "3px 3px 3px #b373d9";
};

function updateTime() {
  elapsedTime = Date.now() - startTime;

  secs = Math.floor((elapsedTime / 1000) % 60);

  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);

  secs = pad(secs);
  mins = pad(mins);

  timer.textContent = `${mins}:${secs}`;

  function pad(unit) {
    return (("0") + unit).length > 2 ? unit : "0" + unit;
  }
}

function pauseTimer() {
  paused = true;
  elapsedTime = Date.now() - startTime;
  clearInterval(intervalid);
}

function resetTimer() {
  clearInterval(intervalid);
  startTime = 0;
  elapsedTime = 0;
  mins = 0;
  secs = 0;
  timer.textContent = "00:00";
}
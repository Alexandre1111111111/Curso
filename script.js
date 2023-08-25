const dropBox = document.querySelector("#Mainbtn");
dropBox.addEventListener("click", () => {
    document.getElementById("Box").classList.toggle("show");
  });
    window.onclick = function(event) {
    if (!event.target.matches('.Eng img')) {
      var dropdowns = document.getElementsByClassName("drop");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
try{
const topico = document.getElementById("Top");
topico.style.transitionDuration = "0.3s";
topico.style.position = "relative";
topico.addEventListener("mouseover", () =>{
  topico.style.right = "3px";
});
topico.addEventListener("mouseout", () =>{
  topico.style.right = "0px";
});
const cobraImg = document.getElementById("Snk");
const textImg = document.getElementById("Sn");
cobraImg.style.transitionDuration = "0.2s";
cobraImg.addEventListener("mouseover", () => {
  cobraImg.style.borderColor = "#d99f21";
  cobraImg.style.height = "155px";
  textImg.style.color = "#f5bd45";
});
cobraImg.addEventListener("mouseout", () => {
  cobraImg.style.borderColor = "#c8cf45";
  cobraImg.style.height = "150px";
  textImg.style.color = "#c8cf45";
});
  }
catch {
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
const eatAudio = new Audio('eatAudio.mp3');
const gameOverAudio = new Audio('gameOverSk.wav');
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  {x:unitSize * 4, y:0},
  {x:unitSize * 3, y:0},
  {x:unitSize * 2, y:0},
  {x:unitSize, y:0},
  {x:0, y:0}
];

const volumeBtn = document.querySelector("#volumeBtn");
volumeBtn.addEventListener("click", () => {
  if (volumeBtn.src == "https://cdn-icons-png.flaticon.com/512/6996/6996058.png") {
    volumeBtn.src = "https://cdn-icons-png.flaticon.com/512/727/727240.png";
    volumeBtn.style.height = "40px";
    volumeBtn.style.top = "5px";
  }
  else {
    volumeBtn.src = "https://cdn-icons-png.flaticon.com/512/6996/6996058.png"
    volumeBtn.style.height = "50px";
    volumeBtn.style.top = "0px";
  }
});

window.addEventListener("keydown", changeDirection);
if (gameStart) {
  resetBtn.addEventListener("click", resetGame);
}
else {
  resetBtn.addEventListener("click", gameStart);
}

function gameStart(){
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
  gameOverAudio.pause();
  if (resetBtn.innerHTML == "Começar") {
    resetBtn.innerHTML = "Resetar";
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
    }, 75)
  }
  else {
    displayGameOver();
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

  const goingUp = (yVelocity == -unitSize);
  const goingDown = (yVelocity == unitSize);
  const goingRight = (xVelocity == unitSize);
  const goingLeft = (xVelocity == -unitSize);

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
  }
};
function checkGameOver(){
  switch(true) {
    case (snake[0].x < 0):
      running = false;
      break;
    case (snake[0].x >= gameWidth):
      running = false;
    break;
    case (snake[0].y < 0):
      running = false;
    break;
    case (snake[0].y >= gameWidth):
      running = false;
    break;
  }
  for(let i = 1; i < snake.length; i+=1) {
    if(snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
};
function displayGameOver(){
  ctx.font = "50px Roboto";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("FIM DE JOGO!", gameWidth / 2, gameHeight / 2);
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
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
  ];
  gameStart();
};
const rst = document.querySelector("#resetBtn");
rst.addEventListener("mouseover", () => {
  rst.style.border = "4px solid #996600";
  rst.style.width = "120px";
});
rst.addEventListener("mouseout", () => {
  rst.style.border = "4px solid #f1c343";
  rst.style.width = "115px";
});
}
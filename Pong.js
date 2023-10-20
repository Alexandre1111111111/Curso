//Variáveis e Constantes

const pongBoard = document.querySelector("#pongBoard");
const pongScore = document.querySelector("#pongScore");
const resetPong = document.querySelector("#resetPong");
const computerScore = document.querySelector("#computerScore");
const ctxPong = pongBoard.getContext("2d");
const unitSize = 25;
const gameWidth = pongBoard.width;
const gameHeight = pongBoard.width;
const boardBackground = "black";
const ballColor = "white";

let running = false;
let pontoJ = 0;
let pontoC = 0;
let padVelocity = 0;
let xVelocity = 0;
let yVelocity = 0;
let bally = 0;
let ballx = 0;
let randomBall;

resetPong.addEventListener("click", () => {
    resetGame();
    random();
})
function random() {
    randomBall = Math.round(Math.random() * 4);
    switch(randomBall) {
        case 1 :
            xVelocity = unitSize;
            yVelocity = -unitSize;
        break;
        case 2 :
            xVelocity = -unitSize;
            yVelocity = -unitSize;
        break;
        case 3 :
            xVelocity = -unitSize;
            yVelocity = unitSize;
        break;
        case 4 :
            xVelocity = unitSize;
            yVelocity = unitSize;
        break;
    }
}

function nextTick() {
    if(running) {
        setTimeout(() => {
            clearBoard();
            drawBall();
            moveBall();
            drawPad();
            checkpoints();
            nextTick();
        },75)
    }
}

function gameStart() {
    running = true;
    random();
    drawBall();
    nextTick();
    pongScore.textContent = pontoJ;
    computerScore.textContent = pontoC;
}

function clearBoard(){
    ctxPong.fillStyle = boardBackground;
};

function drawBall() {
    ctxPong.fillStyle = ballColor;
    ctxPong.arc(ballx, bally, 360)
}

function drawPad() {

}

function moveBall() {

}

function checkpoints() {

}

function resetGame() {
    running = false;
    pontoC = 0;
    pontoJ = 0;
    gameStart();
}
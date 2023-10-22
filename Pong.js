//Variáveis e Constantes

const pongBoard = document.querySelector("#pongBoard");
const pongScore = document.querySelector("#pongScore");
const resetPong = document.querySelector("#resetPong");
const computerScore = document.querySelector("#computerScore");
const ctxPong = pongBoard.getContext("2d");
const gameWidth = pongBoard.width;
const gameHeight = pongBoard.height;
const boardBackground = "black";
const ballColor = "white";

let ballVel = 5;
let running = false;
let pontoJ = 0;
let pontoC = 0;
let xVelocity;
let yVelocity;
let bally = gameHeight / 2;
let ballx = gameWidth / 2;
let randomBall;
let padJ = {
    width: 10,
    height: 75,
    x: 20,
    y: gameHeight / 2 - 30
}
let padC = {
    width: 10,
    height: 75,
    x: gameWidth - 30,
    y: gameHeight / 2 - 30
}

window.addEventListener("keydown", movePad);

resetPong.addEventListener("click", resetGame);

function random() {
    randomBall = Math.floor((Math.random() * 4) + 1);
    switch(randomBall) {
        case 1 :
            xVelocity = 1;
            yVelocity = -1;
        break;
        case 2 :
            xVelocity = -1;
            yVelocity = -1;
        break;
        case 3 :
            xVelocity = -1;
            yVelocity = 1;
        break;
        case 4 :
            xVelocity = 1;
            yVelocity = 1;
        break;
    }
    bally = gameHeight / 2;
    ballx = gameWidth / 2;
    drawBall(ballx, bally);
}

function nextTick() {
    if(running) {
        setTimeout(() => {
            clearBoard();
            drawBall();
            moveBall();
            drawPad();
            checkcollision();
            moveCpad();
            nextTick();
        },25)
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
    ctxPong.fillRect(0, 0, gameWidth, gameHeight)
};

function drawBall() {
    ctxPong.fillStyle = ballColor;
    ctxPong.beginPath();
    ctxPong.arc(ballx, bally, 10, 0, 2 * Math.PI)
    ctxPong.stroke();
    ctxPong.fill();
}

function drawPad() {
    ctxPong.fillRect(padJ.x, padJ.y, padJ.width, padJ.height);
    ctxPong.strokeStyle = "white";
    ctxPong.fillRect(padC.x, padC.y, padC.width, padC.height);
    ctxPong.strokeStyle = "white";
}

function movePad(event) {
    const keyPressed = event.keyCode;
    const W = 87;
    const S = 83;
    switch (keyPressed) {
        case (W):
            if(padJ.y > 5) {
                padJ.y -= 15;
            }
        break;
        case (S):
            if(padJ.y < gameHeight - padJ.height - 3) {
                padJ.y += 15;
            }
        break;
    }
}

function moveCpad() {

}

function moveBall() {
    ballx += (ballVel * xVelocity);
    bally += (ballVel * yVelocity);
}

function checkcollision() {
    if(bally <= 0 + 10) {
        yVelocity *= -1;
    }
    if (bally >= gameHeight - 10) {
        yVelocity *= -1;
    }
    if (ballx <= 0) {
        pontoC+=1;
        updateScore();
        random();
        return;
    }
    if (ballx >= gameWidth) {
        pontoJ+=1;
        updateScore();
        random();
        return;
    }
    if (ballx <= (padJ.x + padJ.width + 10)) {
        if(bally > padJ.y && bally < padJ.y + padJ.height) {
            ballx = (padJ.x + padJ.width) + 10;
            xVelocity *= -1;
            ballVel += 1;
        }
    }
    if (ballx >= (padC.x - 10)) {
        if(bally > padC.y && bally < padC.y + padC.height) {
            ballx = (padC.x + padC.width) - 10;
            xVelocity *= -1;
            ballVel += 1;
        }
    }
}

function updateScore() {
    pongScore.textContent = `${pontoJ}`;
    computerScore.textContent = `${pontoC}`;
}

function resetGame() {
    running = false;
    pontoC = 0;
    pontoJ = 0;
    padJ = {
        width: 10,
        height: 75,
        x: 20,
        y: gameHeight / 2 - 30
    }
    padC = {
        width: 10,
        height: 75,
        x: gameWidth - 30,
        y: gameHeight / 2 - 30
    }
    xVelocity = 0;
    yVelocity = 0;
    ballVel = 5;
    updateScore();
    gameStart();
}
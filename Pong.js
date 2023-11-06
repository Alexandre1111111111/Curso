//Variáveis e Constantes

const pongBoard = document.querySelector("#pongBoard");
const pongScore = document.querySelector("#pongScore");
const resetPong = document.querySelector("#resetPong");
const checkP = document.querySelector("#twop");
const computerScore = document.querySelector("#computerScore");
const ctxPong = pongBoard.getContext("2d");
const gameWidth = pongBoard.width;
const gameHeight = pongBoard.height;
const boardBackground = "black";
const ballColor = "white";

let vel = 3.5;
let borderBall = "white";
let CpadVel = 3.5;
let ballVel = vel;
let shadowBall = "white";
let running = false;
let campCol1 = "rgba(0, 0, 255, 0.3)";
let campCol2 = "rgba(255, 0, 0, 0.3)";
let pontoJ = 0;
let pontoC = 0;
let xVelocity;
let yVelocity;
let bally = gameHeight / 2;
let ballx = gameWidth / 2;
let randomBall;
let counter = 3;
let padJ = {
    width: 10,
    height: 100,
    x: 20,
    y: gameHeight / 2 + 20
}
let padC = {
    width: 10,
    height: 100,
    x: gameWidth - 30,
    y: gameHeight / 2 + 20
}

//Eventos

window.addEventListener("keydown", movePad);

resetPong.addEventListener("click", resetGame);

//Funções do Jogo

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
            drawCamp();
            drawBall();
            moveBall();
            drawPad();
            checkcollision();
            if (checkP.checked) {
                window.addEventListener("keydown", secondP);
            }
            else {
                window.removeEventListener("keydown", secondP);
                moveCpad();
            }
            nextTick();
        }, 10)
    }
}

function gameStart() {
    ctxPong.font = "100px sans-serif";
    ctxPong.fillStyle = "#09b1db";
    ctxPong.textAlign = "center";
    ctxPong.shadowBlur = 10;
    ctxPong.shadowColor = "#ff0000";
    ctxPong.fillText(`${counter}`, gameWidth / 2, gameHeight / 2 + 20);
    counter--;
    const intersec = setInterval(() => {
        if(counter > -1) {
        clearBoard();
        ctxPong.font = "100px sans-serif";
        ctxPong.fillStyle = "#09b1db";
        ctxPong.textAlign = "center";
        ctxPong.shadowBlur = 10;
        ctxPong.shadowColor = "#ff0000";
        if(counter != 0) {
            ctxPong.fillText(`${counter}`, gameWidth / 2, gameHeight / 2 + 20);
        }
        else {
            ctxPong.fillText(`VAI!`, gameWidth / 2, gameHeight / 2 + 20);
        }
        counter--;
        }
        else {
            clearInterval(intersec);
        }
    }, 1000)
    setTimeout(() => { 
    running = true;
    random();
    nextTick();
    resetPong.style.pointerEvents = "all";
    pongScore.textContent = pontoJ;
    computerScore.textContent = pontoC;
    }, 4000)
}

function clearBoard(){
    ctxPong.fillStyle = boardBackground;
    ctxPong.fillRect(0, 0, gameWidth, gameHeight)
};

function drawCamp() {
    if(xVelocity == 1) {
        campCol1 = "rgba(0, 0, 255, 0.3)";
        campCol2 = "rgba(255, 0, 0, 0.7)";
    }
    else {
        campCol1 = "rgba(0, 0, 255, 0.7)";
        campCol2 = "rgba(255, 0, 0, 0.3)";
    }
    ctxPong.shadowBlur = 0;
    ctxPong.strokeStyle = "blue";
    ctxPong.lineWidth = 1;
    ctxPong.beginPath();
    ctxPong.moveTo(gameWidth / 2 - 1, 0);
    ctxPong.lineTo(gameWidth / 2 - 1, gameHeight);
    ctxPong.stroke();
    ctxPong.strokeStyle = "red";
    ctxPong.beginPath();
    ctxPong.moveTo(gameWidth / 2 + 1, 0);
    ctxPong.lineTo(gameWidth / 2 + 1, gameHeight);
    ctxPong.stroke();

    ctxPong.strokeStyle = campCol1;
    ctxPong.shadowBlur = 10;
    ctxPong.shadowColor = "white";
    ctxPong.lineWidth = 10;

    ctxPong.beginPath();
    ctxPong.moveTo(gameWidth / 2 - 150, gameHeight / 2 - 60);
    ctxPong.lineTo(gameWidth / 2 - 90, gameHeight / 2);
    ctxPong.lineTo(gameWidth / 2 - 150, gameHeight / 2 + 60);
    ctxPong.stroke();
    ctxPong.beginPath();
    ctxPong.moveTo(150, gameHeight / 2 - 30);
    ctxPong.lineTo(180, gameHeight / 2);
    ctxPong.lineTo(150, gameHeight / 2 + 30);
    ctxPong.stroke();

    ctxPong.strokeStyle = campCol2;
    ctxPong.shadowBlur = 10;
    ctxPong.shadowColor = "white";
    ctxPong.lineWidth = 10;

    ctxPong.beginPath();
    ctxPong.moveTo(gameWidth / 2 + 150, gameHeight / 2 - 60);
    ctxPong.lineTo(gameWidth / 2 + 90, gameHeight / 2);
    ctxPong.lineTo(gameWidth / 2 + 150, gameHeight / 2 + 60);
    ctxPong.stroke();
    ctxPong.beginPath();
    ctxPong.moveTo(gameWidth - 150, gameHeight / 2 - 30);
    ctxPong.lineTo(gameWidth - 180, gameHeight / 2);
    ctxPong.lineTo(gameWidth - 150, gameHeight / 2 + 30);
    ctxPong.stroke();
}

function drawBall() {
    ctxPong.shadowBlur = 20;
    ctxPong.shadowColor = shadowBall;
    ctxPong.fillStyle = ballColor;
    ctxPong.strokeStyle = borderBall;
    ctxPong.lineWidth = 2;
    ctxPong.beginPath();
    ctxPong.arc(ballx, bally, 10, 0, 2 * Math.PI)
    ctxPong.stroke();
    ctxPong.fill();
}

function drawPad() {
    ctxPong.shadowBlur = 0;
    ctxPong.lineWidth = 5;
    ctxPong.strokeStyle = "white";
    ctxPong.fillRect(padJ.x, padJ.y, padJ.width, padJ.height);
    ctxPong.strokeStyle = "white";
    ctxPong.fillRect(padC.x, padC.y, padC.width, padC.height);
    ctxPong.strokeStyle = "blue";
    ctxPong.strokeRect(padJ.x, padJ.y, padJ.width, padJ.height);
    ctxPong.strokeStyle = "red";
    ctxPong.strokeRect(padC.x, padC.y, padC.width, padC.height);
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
    if(xVelocity > 0) {
        if(padC.y > 0) {
        if(padC.y != bally) {
        if(yVelocity == -1 && ballx < gameWidth - 60) {
            padC.y -= CpadVel;
        }
        else if(padC.y > gameHeight - padC.height) {
            if(bally < 25) {
                    setTimeout(() => {
                padC.y = bally;
                    }, 30)
            }
        }
        else if(ballx < gameWidth - 60) {
            padC.y += CpadVel; 
        }
    }
    }
    else {
        if(bally < 25) {
            setTimeout(() => {
            padC.y = bally;
            }, 30)
        }
    }
    }
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
        ballVel = vel;
        CpadVel = 3.5;
        borderBall = "white";
        shadowBall = "white";
        return;
    }
    if (ballx >= gameWidth) {
        pontoJ+=1;
        updateScore();
        random();
        ballVel = vel;
        CpadVel = 3.5;
        borderBall = "white";
        shadowBall = "white";
        return;
    }
    if (ballx <= (padJ.x + padJ.width + 10)) {
        if(bally > padJ.y && bally < padJ.y + padJ.height) {
            ballx = (padJ.x + padJ.width) + 10;
            xVelocity *= -1;
            ballVel += 0.25;
            borderBall = "blue";
            CpadVel += 0.15;
            shadowBall = "blue";
        }
    }
    if (ballx >= (padC.x - 10)) {
        if(bally > padC.y && bally < padC.y + padC.height) {
            ballx = (padC.x + padC.width) - 20;
            xVelocity *= -1;
            ballVel += 0.25;
            borderBall = "red";
            CpadVel += 0.15;
            shadowBall = "red";
        }
    }
}

function updateScore() {
    pongScore.textContent = `${pontoJ}`;
    computerScore.textContent = `${pontoC}`;
}

function secondP(event) {
    const keyPressed = event.keyCode;
    const UP = 38;
    const DOWN = 40;
    switch (keyPressed) {
        case (UP):
            if(padC.y > 18) {
                padC.y -= 15;
            }
        break;
        case (DOWN):
            if(padC.y < gameHeight - padC.height - 3) {
                padC.y += 15;
            }
        break;
    }
}

function resetGame() {
    if(resetPong.innerHTML == "Começar") {
        resetPong.innerHTML = "Resetar";
    }
    const interid = setInterval(() => {
        clearBoard();
    }, 20)
    resetPong.style.pointerEvents = "none";
    running = false;
    pontoC = 0;
    pontoJ = 0;
    padJ = {
        width: 10,
        height: 100,
        x: 20,
        y: gameHeight / 2 - 30
    }
    padC = {
        width: 10,
        height: 100,
        x: gameWidth - 30,
        y: gameHeight / 2 - 30
    }
    xVelocity = 0;
    yVelocity = 0;
    ballVel = vel;
    CpadVel = 3.5;
    counter = 3;
    updateScore();
    setTimeout(() => {
        clearInterval(interid);
    gameStart();
    }, 100)
}
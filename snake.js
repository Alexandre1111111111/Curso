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

    let running = false;
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

    //Sets de Audio

    eatAudio.volume = 0.8;

    gameOverAudio.volume = 0.7;

    backgroundMusic1.currentTime = 1;
    backgroundMusic1.loop = true;

    //Eventos de Botões

    volumeBtn.addEventListener("click", () => {
      if (volumeBtn.src == "https://cdn-icons-png.flaticon.com/512/6996/6996058.png") {
        volumeBtn.src = "https://cdn-icons-png.flaticon.com/512/727/727240.png";
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
      rst.style.border = "4px solid #f1c343";
      rst.style.width = "115px";
    });
    
    window.addEventListener("keydown", changeDirection);
    window.addEventListener("keyup", resetKey);
    
    if (gameStart) {
      resetBtn.addEventListener("click", resetGame);
    }

    else {
      resetBtn.addEventListener("click", gameStart);
    }

    //Funções do Jogo
    
    function gameStart(){
      running = true;
      scoreText.textContent = score;
      createFood();
      drawFood();
      nextTick();
      gameOverAudio.pause();
      backgroundMusic1.play();
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
      if (running && musicBtn.src == "https://cdn-icons-png.flaticon.com/512/122/122320.png") {
        backgroundMusic1.volume = 0.6;
      }
      else {
        backgroundMusic1.volume = 0;
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
        backgroundMusic1.currentTime = 1;
        backgroundMusic1.pause();
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

let canvas = document.getElementById('wallCanvas');
let ctx = canvas.getContext('2d');



//This loop creates the wall with the number of bricks per line and the number of layers set at the beginning
//that later will be dynamic depending on the levels reached by the player
function drawBricks(){
    let numberOfBrickLayers = 3;
    let numberOfBricksInLine = 5;
    let brickWidth = 165;
    let brickHeight = 25;
    let spaceBetweenBricks = 25;

    ctx.fillStyle = "green";
    for(let i=0; i < numberOfBrickLayers; i++){
        for(let j=0; j<numberOfBricksInLine; j++){
            ctx.fillRect(brickWidth*j + spaceBetweenBricks*(j+1),
                brickHeight*i + spaceBetweenBricks*(i+1),
                brickWidth,
                brickHeight);
        }
    }
}

//Paddle shape
let paddleHeight = 25;
let paddleWidth = 165;
let paddleX = (canvas.width-paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
function drawPaddle() {
    ctx.beginPath();
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
drawPaddle();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//Ball shape and movement
let x = canvas.width/2;
let y = canvas.height-25;
let dx = 2;
let dy = -2;
let ballRadius = 10;
// let snd = new Audio('108737__branrainey__boing.wav');
// function playAudio() { 
//   snd.play(); 
// } 

function drawBall() { 
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
      
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        playAudio();
    }
    if(y + dy < ballRadius) {
        dy = -dy;
        playAudio();
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            if(y= y-paddleHeight){
                dy = -dy;
            }
            playAudio();
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
            
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
}
let interval = setInterval(draw, 10);


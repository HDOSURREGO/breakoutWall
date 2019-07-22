let canvas = document.getElementById('wallCanvas');
let ctx = canvas.getContext('2d');
let score = 0;
let ballSpeed =5;

class Brick {
    constructor(x,y, color){
        this.x = x;
        this.y = y;
        this.width = 165;
        this.height = 25;
        this.isHit = false;
        this.color = color;
    }
    drawBrick(){
        if(!this.isHit){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width, this.height);
        }
    }   
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if(color == '#000000' || color == '#FFFFFF'){
        color = 'blue';
    }
    return color;
  }
  


let brickArray = [];

for(let i = 0; i < 3; i++){
    for(let j = 0; j < 5; j++){
        brickArray.push(new Brick( (j * 185) + (12 * (j+1)), (i * `25`) + (12 * (i + 1)), getRandomColor()));
    }
}  
function drawBricks(){
    for(let count = 0; count < brickArray.length; count++){
        brickArray[count].drawBrick();
    }   
}
 
class Paddle {
    constructor(){
    this.paddleHeight = 25;
    this.paddleWidth = 165;
    this.paddleX = (canvas.width-this.paddleWidth) / 2;
    this.rightPressed = false;
    this.leftPressed = false;
    }
    drawPaddle() {
        ctx.beginPath();
        ctx.fillRect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }
}

let raqueta = new Paddle();
raqueta.drawPaddle();

class Ball {
    constructor(){
    this.x = canvas.width/2;
    this.y = canvas.height-250;
    this.dx = Math.floor((Math.random()*3)+2);
    this.dy = -2;
    this.ballRadius = 10;
    this.snd = new Audio('108737__branrainey__boing.wav');
    }
    playAudio() { 
      this.snd.play(); 
    } 
    drawBall() { 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }
}

let bola = new Ball();
bola.drawBall();


function collisionDetectionBricksAndBall() {
    for(let i=0; i<brickArray.length; i++) {
         if(bola.x < brickArray[i].x + brickArray[i].width &&
            bola.x + bola.ballRadius > brickArray[i].x &&
            bola.y < brickArray[i].y + brickArray[i].height &&
            bola.y + bola.ballRadius > brickArray[i].y){
            bola.dy = -bola.dy
            bola.dx = Math.floor((Math.random()*2)+2);
            brickArray.splice(brickArray.indexOf(brickArray[i]),1);
            bola.playAudio();
            score += 5;
            ballSpeed -= 1;
            console.log(ballSpeed);
            if(brickArray.length === 0){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setTimeout( () => {
                    alert("You beat this level!");
                    document.location.reload();
                    clearInterval(interval);
                },1000);//This 1000 milisecondos allow the last brick to be erased from the canvas before the Alert pause everything.
            }
        }

    }
}




document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        raqueta.rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        raqueta.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        raqueta.rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        raqueta.leftPressed = false;
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ladrillo.drawBrick();
    drawBricks();
    bola.drawBall();
    raqueta.drawPaddle();
    collisionDetectionBricksAndBall();
    
    //this conditional will change the direction of the ball if it goes further than left and right edges of the canvas
    if(bola.x + bola.dx > canvas.width-bola.ballRadius || bola.x + bola.dx < bola.ballRadius) {
        bola.dx = -bola.dx;
        bola.playAudio();
    }
    //this conditional will change the direction of the ball if it goes further than top edge of the canvas.
    if(bola.y + bola.dy < bola.ballRadius) {
        bola.dy = -bola.dy;
        bola.playAudio();
     //this conditional will do the collision between Ball and Paddle objects.
    } else if(bola.y + bola.dy > canvas.height-raqueta.paddleHeight){
        if(bola.x > raqueta.paddleX && bola.x < raqueta.paddleX + raqueta.paddleWidth) {
            bola.dy = -Math.floor((Math.random()*2)+2);
            bola.playAudio();
        }else {
            alert("GAME OVER MY FRIEND!");
            document.location.reload();
            clearInterval(interval);
        }
    
    }  



    if(raqueta.rightPressed && raqueta.paddleX < canvas.width - raqueta.paddleWidth) {
        raqueta.paddleX += 4;
    }
    else if(raqueta.leftPressed && raqueta.paddleX > 0) {
        raqueta.paddleX -= 4;
    }
    bola.x += bola.dx;
    bola.y += bola.dy;

    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText(`Score ${score}`, 100, 700);
}

let interval = setInterval(draw, ballSpeed);


//------------------- START GAME --------------------//

//initialize bricks








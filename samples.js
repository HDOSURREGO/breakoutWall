let canvas = document.getElementById('wallCanvas');
let ctx = canvas.getContext('2d');

class Brick {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 165;
        this.height = 25;
        this.spaceBetweenBricks = 25;
        this.isHit = false;
        this.color = "green";
    }

    drawBricks(numberOfBrickLayers, numberOfBricksInLine){
        ctx.fillStyle = "green";
        for(let i=0; i < numberOfBrickLayers; i++){
            for(let j=0; j<numberOfBricksInLine; j++){
                this.x = this.width*j + this.spaceBetweenBricks*(j+1);
                this.y = this.height*i + this.spaceBetweenBricks*(i+1);
                ctx.fillRect(this.x,this.y,this.width, this.height);
            }   
        }
    }

}

let ladrillo = new Brick();
ladrillo.drawBricks(3,5); 

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
    this.dx = 2;
    this.dy = -2;
    this.ballRadius = 10;
    this.snd = new Audio('108737__branrainey__boing.wav');
    }
    playAudio() { 
      snd.play(); 
    } 
    drawBall() { 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
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

let bola = new Ball();
bola.drawBall();

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ladrillo.drawBricks(3,5);
    bola.drawBall();
    raqueta.drawPaddle();
    
    //this conditional will change the direction of the ball if it goes further than left and right edges of the canvas
    if(bola.x + bola.dx > canvas.width-bola.ballRadius || bola.x + bola.dx < bola.ballRadius) {
        bola.dx = -bola.dx;
        // bola.playAudio();
    }
    //this conditional will change the direction of the ball if it goes further than top edge of the canvas.
    if(bola.y + bola.dy < bola.ballRadius) {
        bola.dy = -bola.dy;
        // bola.playAudio();
     //this conditional will do the collision between Ball and Paddle objects.
    } else if(bola.y + bola.dy > canvas.height-raqueta.paddleHeight){
        if(bola.x > raqueta.paddleX && bola.x < raqueta.paddleX + raqueta.paddleWidth) {
                bola.dy = -bola.dy;
        }else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    
    }      
    if(raqueta.rightPressed && raqueta.paddleX < canvas.width - raqueta.paddleWidth) {
        raqueta.paddleX += 7;
    }
    else if(raqueta.leftPressed && raqueta.paddleX > 0) {
        raqueta.paddleX -= 7;
    }
    bola.x += bola.dx;
    bola.y += bola.dy;
    }

let interval = setInterval(draw, 10);





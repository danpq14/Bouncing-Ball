
const cvs = document.getElementById('game');
const ctx = cvs.getContext('2d');

//tạo border cho Canvas
cvs.style.border = '1px solid grey';

//game variable and Constants

const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 30;
const PADDLE_MARGIN_BOTTOM = 50;
const BALL_RADIUS = 10;
let leftArrow = false;
let rightArrow = true;
let score =0;
let life =3;



//tạo thanh Paddle
const paddle = {
    x : cvs.width/2 - PADDLE_WIDTH/2,
    y : cvs.height - PADDLE_HEIGHT - PADDLE_MARGIN_BOTTOM,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx : 5
};


//Control the Paddle
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        leftArrow = true;
    } else if (event.keyCode == 39) {
        rightArrow = true;
    }
})
document.addEventListener('keyup', function (event) {
    if (event.keyCode == 37) {
        leftArrow = false;
    } else if (event.keyCode == 39) {
        rightArrow = false;
    }
})


//Move the Paddle
function movePaddle() {
    if(leftArrow && paddle.x >0 ) {
        paddle.x -= paddle.dx;
    }
    else if (rightArrow && paddle.x + paddle.width < cvs.width) {
        paddle.x += paddle.dx;
    }
}



//Draw the Paddle
function drawPaddle() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}



//Tạo ra Ball
const ball = {
    x: paddle.x,
    y: paddle.y - BALL_RADIUS,
    radius: BALL_RADIUS,
    speed: 5,
    dx: 3,
    dy: -3,
};

function resetBall() {
    ball.x = paddle.x;
    ball.y = paddle.y - BALL_RADIUS;
    ball.radius = BALL_RADIUS;
    ball.speed = 5;
    ball.dx = Math.random()*2 + 2;
    ball.dy = -(Math.random()*2 + 2);
}


//Draw Ball
function drawBall() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(ball.x,ball.y,BALL_RADIUS,0,Math.PI*2);
    ctx.fill();
}



//Move the Ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}


//Ball va chạm vào tường
function ballWallCollision() {
    if (ball.x + ball.radius > cvs.width) { //tường phải
        ball.dx = -ball.dx;
    }
    if (ball.y <= 0) { //tường trên
        ball.dy = -ball.dy
    }
    if (ball.x <= 0) { //tường trái
        ball.dx = -ball.dx
    }
}


//Ball va chạm vào Paddle\
function ballPaddleCollision() {
    if(ball.x > paddle.x && ball.x < paddle.x + paddle.width && ball.y < paddle.y + paddle.height && ball.y >paddle.y) {
        let collidePoint = ball.x - (paddle.x + paddle.width/2); //nếu bên trái Paddle thì ra số âm, bên phải thì ra số dương
        collidePoint = collidePoint / (paddle.width/2); //đoạn này thì chịu, check trên mạng @@
        let angle = collidePoint * Math.PI/3;
        ball.dy = -ball.speed*Math.cos(angle);
        ball.dx = ball.speed*Math.sin(angle);
        console.log('dx ' + ball.dx);
        console.log('dy ' +ball.dy);
        ball.speed ++;
        score ++;
    }
    if (ball.y > paddle.y + paddle.height) {
        life --;
        resetBall();
    }
}



//Draw function
function draw() {
    drawPaddle();
    drawBall();
    ballWallCollision();
    ballPaddleCollision();
    drawScore();
    drawLife();
}

function drawScore() {
    ctx.font = '10px Arial';
    ctx.fillText('Score :'+ score,cvs.width - 60, 20 )
};
function drawLife() {
    ctx.font = '10px Arial';
    ctx.fillText('Life :'+ life,cvs.width - 60, 40 )
}


//Update Function
function update() {
    movePaddle();
    moveBall();
}


//Game loop
function loop() {
    ctx.clearRect(0,0,cvs.width, cvs.height);
    draw();
    update();
    endGame();
    requestAnimationFrame(loop);
}
loop();


function endGame() {
    if (life == 0) {
        alert('Your Score is : ' + score)
    }
}
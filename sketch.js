var direction = 0;
var lives = 3;
var player,
	ball,
	obstacles,
	obstacleWidth,
	obstacleHeight,
	canvas,
	livesIndicator;

function setup(){
	canvas = createCanvas(1000, 600);
	// Setup Game Objects
	player = new Player();
	ball = new Ball(player);
	obstacleWidth = 100; obstacleHeight=25;
	obstacles=[];
	for(var i = 0; i < width; i+=obstacleWidth){
		for(var j = 0; j < height/4; j+= obstacleHeight){
			obstacles.push(new Obstacle(i, j, obstacleWidth, obstacleHeight));
		}
	}
	// Display Player Lives
	livesIndicator = new LivesIndicator(lives);
}

function draw(){
	background(51);
	if(obstacles.length == 0){
		dispMsg("You Win!", createVector(0, 255, 0));
		noLoop();
	}
	if (ball.collided(player)){
		ball.vel.y *= -1;
		if(ball.y + ball.height > player.y){
			ball.vel.x *= -1;	// Collide with side of the player
		}
	}
	for(var i = obstacles.length-1; i >=0; i--){
		if(ball.collided(obstacles[i])){
			obstacles.splice(i,1);
			ball.vel.y *=-1;
		}
	}
	player.move(direction);
	ball.move(player, obstacles);
	player.show();
	ball.show();
	obstacles.forEach(function(obstacle){
		obstacle.show()
	});
	if(ball.y > height){
		lives--;
		livesIndicator.decAndRefresh();
		if(lives > 0){
			ball.respawn();
		} else {
			dispMsg("You Lose!", createVector(255,0,0));
			noLoop();
		}
	}
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    direction = -1;
  } else if (keyCode == RIGHT_ARROW) {
    direction = 1;
  }
}

function keyReleased() {
	if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW){
		direction = 0;
	}
}

function dispMsg(msg, col){
	background(51);
	textSize(42);
	textAlign("center");
	fill(col.x, col.y, col.z);
	text(msg, width/2, height/2);
}


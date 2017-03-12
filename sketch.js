var direction = 0;
var player,
	ball,
	obstacles,
	obstacleWidth,
	obstacleHeight;

function setup(){
	obstacleWidth = 100; obstacleHeight=25;
	createCanvas(1000, 600);
	player = new Player();
	ball = new Ball(player);
	obstacles=[]
	for(var i = 0; i < width; i+=obstacleWidth){
		for(var j = 0; j < height/2; j+= obstacleHeight){
			obstacles.push(new Obstacle(i, j, obstacleWidth, obstacleHeight));
		}
	}
}

function draw(){
	background(51);
	player.move(direction);
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
	ball.move(player, obstacles);
	player.show();
	ball.show();
	obstacles.forEach(function(obstacle){
		obstacle.show()
	});
	if(ball.y > height){
		ball.respawn();
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

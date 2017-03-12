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
	ball.move();
	player.show();
	ball.show();
	obstacles.forEach(function(obstacle){
		obstacle.show()
	});
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

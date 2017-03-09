var direction = 0;
var player,
	ball,
	obstacle;

function setup(){
	createCanvas(800, 500);
	player = new Player();
	ball = new Ball(player);
	obstacle = new Obstacle(width/2, height/2);
}

function draw(){
	background(51);
	player.move(direction);
	ball.move();
	player.show();
	ball.show();
	obstacle.show();
	console.log(ball.collided(player));
}

function Player(){
	this.width = 200;
	this.height=25;
	this.x = width/3;
	this.y = height-this.height*2;
	this.step = 15;
}

Player.prototype.show = function(){
	push();
	fill(255);
	rect(this.x, this.y, this.width, this.height);
	pop();
}

Player.prototype.move = function(dir){
	this.x += this.step*dir;
	if (this.x < 0){
		this.x = 0;
	} else if (this.x + this.width > width){
		this.x = width - this.width;
	}
}

function Ball(){
	this.width = 15;
	this.height = 15;
	this.x = 0 + this.width;
	this.y = height - this.height;
	this.vel = createVector(2,-1);
	this.step = 5;
}

Ball.prototype.show = function(){
	push();
	fill(255);
	rect(this.x, this.y, this.width, this.height);
	pop();
}

Ball.prototype.move = function(){
	this.x += this.vel.x * this.step;
	this.y += this.vel.y * this.step;
	// Function
	if(this.x < 0){
		this.x = 0;
		this.vel.x *= -1;
	} else if (this.x + this.width > width){
		this.x = width - this.width;
		this.vel.x *= -1;
	}
	// Function
	if (this.y < 0){
		this.y = 0;
		this.vel.y *= -1; 
	}
	if (this.collided(player) || this.collided(obstacle)){
		this.vel.x *= -1;
		this.vel.y *= -1;
	}
}

// TODO: Write this function once we have obstacles
Ball.prototype.collided = function(entity){
	if(
		(this.x + this.width) < entity.x
		|| this.x > (entity.x + entity.width)
		|| (this.y + this.height) < entity.y
		|| this.y > (entity.y + entity.height)
	){
		return false;
	}
	return true;
}

function Obstacle(x, y){
	this.x = x;
	this.y = y;
	this.width = 200;
	this.height = 25;
	this.col = createVector(random(255), random(255), random(255)); 
}

Obstacle.prototype.show = function(){
	push();
	fill(this.col.x, this.col.y, this.col.z);
	rect(this.x, this.y, this.width, this.height);
	pop();
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
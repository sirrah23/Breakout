function Ball(){
	this.width = 15;
	this.height = 15;	
	this.step = 5;
	this.respawn();
}

Ball.prototype.show = function(){
	push();
	fill(255);
	rect(this.x, this.y, this.width, this.height);
	pop();
}

//TODO: This method does too much...
Ball.prototype.move = function(){
	this.wallCollide();

	if (this.collided(player)){
		this.vel.y *= -1;
		if(this.y + this.height > player.y){
			this.vel.x *= -1;	// Collide with side of the player
		}
	}

	for(var i = obstacles.length-1; i >=0; i--){
		if(this.collided(obstacles[i])){
			obstacles.splice(i,1);
			this.vel.y *=-1;
		}
	}

	this.x += this.vel.x * this.step;
	this.y += this.vel.y * this.step;
}

Ball.prototype.wallCollide = function(){
	if(this.x < 0){ // Left Wall
		this.x = 0;
		this.vel.x *= -1;
	} else if (this.x + this.width > width){ // Right Wall
		this.x = width - this.width;
		this.vel.x *= -1;
	}
	if (this.y < 0){ // Top Wall
		this.y = 0;
		this.vel.y *= -1; 
	}
}

Ball.prototype.collided = function(entity){
	if(
		(this.x + this.width) < entity.x
		|| this.x > (entity.x + entity.width)
		|| (this.y + this.height) < entity.y
		|| this.y > (entity.y + entity.height)
	){
		return false;
	}else{
		return true;
	}
}

Ball.prototype.spawnLeft = function(){
	this.x = 0 + this.width;
	this.y = height - this.height; 
	this.vel = createVector(2,-1);
}

Ball.prototype.spawnRight = function(){
	this.x = width - this.width;
	this.y = height - this.height; 
	this.vel = createVector(-2, -1);	
}

Ball.prototype.respawn = function(){
	var chance = random();
	if (chance <= 0.5){
		this.spawnLeft();
	} else {
		this.spawnRight();
	}
}
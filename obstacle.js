function Obstacle(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width; //200
	this.height = height; //25
	this.col = createVector(random(255), random(255), random(255)); 
}

Obstacle.prototype.show = function(){
	push();
	fill(this.col.x, this.col.y, this.col.z);
	rect(this.x, this.y, this.width, this.height);
	pop();
}
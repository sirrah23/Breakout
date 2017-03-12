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
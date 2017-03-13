function LivesIndicator(lives){
	this.lives = lives;
	this.livesDiv = createElement("div");
	this.livesDisp = createElement("p", parseInt(this.lives));
	this.livesDiv.child(this.livesDisp);
}

LivesIndicator.prototype.decrement = function(){
	this.lives -= 1;
}

LivesIndicator.prototype.refresh = function(){
	this.livesDisp.remove();
	this.livesDisp = createElement("p", parseInt(this.lives));
	this.livesDiv.child(this.livesDisp);	
}

LivesIndicator.prototype.decAndRefresh = function(){
	this.decrement();
	this.refresh();
}
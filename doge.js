Doge = function(x, y, upright){
	this.x = x;
	this.y = y;
	this.upright = upright;
	this.moving = false;
	
	
	this.image = new createjs.Bitmap(queue.getResult("Doge"));
	this.image.x = this.x*(100/2); this.image.y = this.y*88;
	console.log("Created Doge");
}

Doge.prototype.move = function(direction){

	if (!this.moving) {
		
		this.moving = true;
	
	var _this = this;
	function handleComplete() {
		//console.log("this " + this);  this refers to this.image from above
		_this.moving = false;
		ai();
	}
	
	if (direction == "left") { this.x--;
		if(this.upright){
			createjs.Tween.get(this.image, {loop:false, override:true}).to({x:this.x*(100/2), y:(this.y)*88}, 500).call(handleComplete);
			this.upright = false;
		}
		else{
			createjs.Tween.get(this.image, {loop:false, override:true}).to({x:this.x*(100/2), y:(this.y)*88}, 500).call(handleComplete);
			this.upright = true;
		}
	}
	else if (direction == "right") { this.x++;
		if(this.upright){
			createjs.Tween.get(this.image, {loop:false, override:true}).to({x:this.x*(100/2), y:(this.y)*88}, 500).call(handleComplete);
			this.upright = false;
		}
		else{
			createjs.Tween.get(this.image, {loop:false, override:true}).to({x:this.x*(100/2), y:(this.y)*88}, 500).call(handleComplete);
			this.upright = true;
		}
	}
	else if (direction == "up") { this.y--;
		if(this.upright){
			//No movement allowed
			this.y++;
			this.moving = false;
		}
		else{
			createjs.Tween.get(this.image, {loop:false, override:true}).to({y:(this.y)*88}, 500).call(handleComplete);
			this.upright = true;
		}
		
	}
	else if (direction == "down") { this.y++;
		if(this.upright){
			createjs.Tween.get(this.image, {loop:false, override:true}).to({y:(this.y)*88}, 500).call(handleComplete);
			this.upright = false;
		}
		else{
			//No movement allowed
			//createjs.Tween.get(this.image, {loop:false, override:true}).to({y:this.image.y}, 0).call(handleComplete);
			//this.upright = true;
			this.y--;
			this.moving = false;
		}
	}
	
	}


}
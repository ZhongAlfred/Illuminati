
Enemy = function(imagein, yPos, xPos, special, upright){
	this.x = xPos;
	this.y = yPos;
	this.upright = upright;
	
	////console.log("New enemy");
	this.image = new createjs.Bitmap(queue.getResult(imagein));
	this.image.x = this.x*(100/2); this.image.y = this.y*88;
	this.ability = null;
	
	this.next = null; //Pointer to next enemy in queue; After ai is finished, call upon next Enemy's ai
}

Enemy.prototype.ai = function(){
	this.move();
}

Enemy.prototype.move = function(){

	var numR = Math.round(((Math.random() * 3) + 1));
	var direction = "left";
	switch (numR) {
		case 1: direction = "right"; break;
		case 2: direction = "left"; break;
		case 3: direction = "up"; break;
		case 4: direction = "down"; break;
	}

	
	var _this = this;
	function handleComplete() {
		if (_this.next != null) {
			_this.next.ai();
		}
		else {
			//Finished AI Sequence - Cede control back to the user.
			//console.log("Can type");
			canType = true;
		}
	}
	if (direction == "left") { this.x--;
		if(this.upright){
			createjs.Tween.get(this.image, {loop:false, override:true}).to({x:this.x*(100/2), y:(this.y+1)*88, scaleY:-this.image.scaleY}, 500).call(handleComplete);
			this.upright = false;
		}
		else{
			createjs.Tween.get(this.image, {loop:false, override:true}).to({x:this.x*(100/2), y:(this.y)*88, scaleY:-this.image.scaleY}, 500).call(handleComplete);
			this.upright = true;
		}
	}
	else if (direction == "right") { this.x++;
		if(this.upright){
			createjs.Tween.get(this.image, {loop:false, override:true}).to({x:this.x*(100/2), y:(this.y+1)*88, scaleY:-this.image.scaleY}, 500).call(handleComplete);
			this.upright = false;
		}
		else{
			createjs.Tween.get(this.image, {loop:false, override:true}).to({x:this.x*(100/2), y:(this.y)*88, scaleY:-this.image.scaleY}, 500).call(handleComplete);
			this.upright = true;
		}
	}
	else if (direction == "up") { this.y--;
		if(this.upright){
			//No movement allowed
			//createjs.Tween.get(this.image, {loop:false, override:true}).to({y:this.image.y}, 0).call(handleComplete);
			//this.upright = false;
			this.y++;
			this.move();
		}
		else{
			createjs.Tween.get(this.image, {loop:false, override:true}).to({y:(this.y)*88, scaleY:-this.image.scaleY}, 500).call(handleComplete);
			this.upright = true;
		}
		
	}
	else if (direction == "down") { this.y++;
		if(this.upright){
			createjs.Tween.get(this.image, {loop:false, override:true}).to({y:(this.y+1)*88, scaleY:-this.image.scaleY}, 500).call(handleComplete);
			this.upright = false;
		}
		else{
			//No movement allowed
			//createjs.Tween.get(this.image, {loop:false, override:true}).to({y:this.image.y}, 0).call(handleComplete);
			//this.upright = true;
			this.y--;
			this.move();
		}
	}
	
}
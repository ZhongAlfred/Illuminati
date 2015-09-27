var stage;
var queue;

var map = [ //max: rows = 8; columns = 11;
[".",".",".",".",".",".",".",".",".",".","."],
[".",".","."," ",".",".",".",".",".",".","."],
[".",".","."," ",".",".",".",".",".",".","."],
[".",".",".",".",".",".",".",".",".",".","."],
[".",".",".",".",".",".","."," ",".",".","."],
[".",".",".",".",".",".","."," ",".",".","."],
["."," ",".",".",".",".",".",".",".",".","."],
["."," "," "," ",".",".",".",".",".",".","."]
];

var x = 0;
var y = 0;
var doge;
var moving = false;
var upright = true;
var drEvil;

 var KEYCODE_LEFT = 37,
   KEYCODE_RIGHT = 39,
   KEYCODE_UP = 38,
   KEYCODE_DOWN = 40;

function init() {

	stage = new createjs.Stage("canvas");
	stage.width = $('#canvas').width();
	stage.height = $('#canvas').height();
	queue = new createjs.LoadQueue();
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete", handleComplete);
	queue.loadManifest(
	[
	{id:"Music", src:"assets/illuminati.mp3"},
	{id:"Background", src:"assets/puzzlebg.jpg"},
	{id:"Tile 1", src:"assets/tile.png"},
	{id:"Tile 2", src:"assets/tile2.png"},
	{id:"illuminati", src:"assets/illuminati.png"},
	]);
	
}
//object class

Enemy = function(imagein, xPT, yPT, special, position){
	this.xP = xPT;
	this.yP = yPT;
	this.upright = position;
	console.log("New enemy");
	this.image = new createjs.Bitmap(queue.getResult(imagein));
	this.image.x = x*(100/2); this.image.y = y*88;
	this.ability = null;
}


function handleComplete(event) {
	
	//Rig keyboard
	window.onkeyup = keyUpHandler;
	
	console.log(stage.width + ", " + stage.height);
	createjs.Sound.play("Music");
	var ball = new createjs.Shape();
	ball.graphics.beginFill("#FF0000").drawCircle(0,0,50);
	ball.x = 50;
	ball.y = 200;
	
	createjs.Tween.get(ball, {loop:true}).to({x:450}, 3000).to({x:50}, 3000);
	createjs.Ticker.addEventListener("tick", tick);
	
	
	//Create background and map
	var bg = new createjs.Bitmap(queue.getResult("Background"));
	bg.x = 0; bg.y = 0;
	
	var tiles = [];
	for (var row = 0; row < 8; row++) {
	for (var col = 0; col < 11; col++) {
		if (map[row][col] == ".") {
			if (col%2 == row%2) {
				var tile = new createjs.Bitmap(queue.getResult("Tile 1"));
				tile.x = col*(100/2); tile.y = row*88;
				tiles.push(tile);
			}
			else {
				var tile = new createjs.Bitmap(queue.getResult("Tile 2"));
				tile.x = col*(100/2); tile.y = row*88;
				tiles.push(tile);
			}
		}
	}
	}
	
	//Create doge
	doge = new createjs.Bitmap(queue.getResult("illuminati"));
	doge.x = x*(100/2); doge.y = y*88;
	//enemies
	//drEvil = new createjs.Bitmap(queue.getResult("illuminati"));
	//drEvil.x = x*(100/2); drEvil.y = y*88;
	drEvil = new Enemy("illuminati", 0, 0, null, true);
	stage.addChild(bg);
	for (var i = 0; i < tiles.length; i++) {
		stage.addChild(tiles[i]);
	}
	stage.addChild(doge);
	stage.addChild(drEvil.image);

}

function move(direction) {

	if (!moving) {
		moving = true;
	
	function handleComplete() {
		moving = false;
	}
	
	if (direction == "left") {
		if(upright){
		createjs.Tween.get(doge, {loop:false, override:true}).to({x:doge.x - (100/2), y:doge.y + 88, scaleY:-doge.scaleY}, 500).call(handleComplete);
		upright = false;
		Enemy.ai();
		}
		else{
			createjs.Tween.get(doge, {loop:false, override:true}).to({x:doge.x - (100/2), y:doge.y - 88, scaleY:-doge.scaleY}, 500).call(handleComplete);
			upright = true;
			Enemy.ai();
		}
	}
	else if (direction == "right") {
		if(upright){
			createjs.Tween.get(doge, {loop:false, override:true}).to({x:doge.x + (100/2), y:doge.y + 88, scaleY:-doge.scaleY}, 500).call(handleComplete);
			upright = false;
			Enemy.ai();
		}
		else{
			createjs.Tween.get(doge, {loop:false, override:true}).to({x:doge.x + (100/2), y:doge.y - 88, scaleY:-doge.scaleY}, 500).call(handleComplete);
			upright = true;
			Enemy.ai();
		}
	}
	else if (direction == "up") {
		if(upright){
			createjs.Tween.get(doge, {loop:false, override:true}).to({y:doge.y}, 0).call(handleComplete);
			Enemy.ai();
			//upright = false;
		}
		else{
			createjs.Tween.get(doge, {loop:false, override:true}).to({y:doge.y - 176, scaleY:-doge.scaleY}, 500).call(handleComplete);
			upright = true;
			Enemy.ai();
		}
		
	}
	else if (direction == "down") {
		if(upright){
			createjs.Tween.get(doge, {loop:false, override:true}).to({y:doge.y + 176, scaleY:-doge.scaleY}, 500).call(handleComplete);
			upright = false;
			Enemy.ai();
		}
		else{
			createjs.Tween.get(doge, {loop:false, override:true}).to({y:doge.y}, 0).call(handleComplete);
			Enemy.ai();
			//upright = true;
		}
	}
	
	}
}


function tick(event) {
	stage.update();
}

function keyUpHandler(e) {

   switch(e.keyCode)
   {
    case KEYCODE_LEFT:  move("left"); break;
    case KEYCODE_RIGHT: move("right"); break;
    case KEYCODE_UP:    move("up"); break;
    case KEYCODE_DOWN:  move("down"); break;
   } 

}

Enemy.ai = function(){
	drEvil.move();
}

Enemy.prototype.move = function(){
	var numR = Math.round(((Math.random() * 3) + 1));
	if (numR == 1) {
		if(drEvil.upright){
			createjs.Tween.get(drEvil, {loop:false, override:true}).to({x:drEvil.xP - (100/2), y:drEvil.yP + 88, scaleY:-drEvil.scaleY}, 500);
			drEvil.upright = false;
		}
		else{
			createjs.Tween.get(drEvil, {loop:false, override:true}).to({x:drEvil.xP - (100/2), y:drEvil.yP - 88, scaleY:-drEvil.scaleY}, 500);
			drEvil.upright = true;
		}
	}
	else if (numR == 2) {
		if(drEvil.upright){
			createjs.Tween.get(drEvil, {loop:false, override:true}).to({x:drEvil.xP + (100/2), y:drEvil.yP + 88, scaleY:-drEvil.scaleY}, 500);
			drEvil.upright = false;
		}
		else{
			createjs.Tween.get(drEvil, {loop:false, override:true}).to({x:drEvil.xP + (100/2), y:drEvil.yP - 88, scaleY:-drEvil.scaleY}, 500);
			drEvil.upright = true;
		}
	}
	else if (numR == 3) {
		if(drEvil.upright){
			createjs.Tween.get(drEvil, {loop:false, override:true}).to({y:drEvil.yP}, 0).call(handleComplete);
			//upright = false;
		}
		else{
			createjs.Tween.get(drEvil, {loop:false, override:true}).to({y:drEvil.yP - 176, scaleY:-drEvil.scaleY}, 500);
			drEvil.upright = true;
		}
		
	}
	else if (numR == 4) {
		if(drEvil.upright){
			createjs.Tween.get(drEvil, {loop:false, override:true}).to({y:drEvil.yP + 176, scaleY:-drEvil.scaleY}, 500);
			drEvil.upright = false;
		}
		else{
			createjs.Tween.get(drEvil.image, {loop:false, override:true}).to({y:drEvil.yP}, 0).call(handleComplete);
			//upright = true;
		}
	}
	
}

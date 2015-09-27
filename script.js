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
var illuminati;

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
	{id:"Illuminati", src:"assets/illuminati.png"},
	]);
	
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
	
	//Create illuminati
	illuminati = new createjs.Bitmap(queue.getResult("Illuminati"));
	illuminati.x = x*(100/2); illuminati.y = y*88;

	stage.addChild(bg);
	for (var i = 0; i < tiles.length; i++) {
		stage.addChild(tiles[i]);
	}
	stage.addChild(illuminati);
	stage.addChild(ball);

}

function move(direction) {
	
	if (direction == "left") {
		createjs.Tween.get(illuminati, {loop:false, override:true}).to({x:illuminati.x - (100/2)}, 1000);
	}
	else if (direction == "right") {
		createjs.Tween.get(illuminati, {loop:false, override:true}).to({x:illuminati.x + (100/2)}, 1000);
	}
	else if (direction == "up") {
		createjs.Tween.get(illuminati, {loop:false, override:true}).to({y:illuminati.y - 88}, 1000);
	}
	else if (direction == "down") {
		createjs.Tween.get(illuminati, {loop:false, override:true}).to({y:illuminati.y + 88}, 1000);
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



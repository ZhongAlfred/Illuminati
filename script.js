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

var enemyMap = [ //max: rows = 8; columns = 11;
[" "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "],
[" ",".",".","."," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "]
];

var doge;
var canType = true; //No user input allowed during AI movement
var illuminatis = [];

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
	{id:"illuminati", src:"assets/infinati.png"},
	{id:"Doge", src:"assets/doge.png"},
	]);
	
}

function handleComplete(event) {
	
	//Rig keyboard
	window.onkeyup = keyUpHandler;
	
	console.log(stage.width + ", " + stage.height);
	createjs.Sound.play("Music");

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
	doge = new Doge(2,3,true);
	if (doge.x%2 != doge.y%2) {
		doge.upright = false
	}
	
	//Enemies
	for (var row = 0; row < 8; row++) {
	for (var col = 0; col < 11; col++) {
		
		if (enemyMap[row][col] == ".") {
			if (col%2 == row%2) {
				//Right side up
				var enemy = new Enemy("illuminati", row, col, null, true);
				illuminatis.push(enemy);
			}
			else {
				//Up side down
				var enemy = new Enemy("illuminati", row, col, null, false);
				enemy.image.y = (enemy.y+1)*88;
				enemy.image.scaleY = -1;
				illuminatis.push(enemy);
			}
		}
	}
	}
	
	
	//Add all 'actors' to the stage
	stage.addChild(bg);
	for (var i = 0; i < tiles.length; i++) {
		stage.addChild(tiles[i]);
	}
	for (var i = 0; i < illuminatis.length; i++) {
		illuminatis[i].name = "Illuminati " + i;
		stage.addChild(illuminatis[i].image);
	}
	stage.addChild(doge.image);

}



function ai() {
	canType = false;
	for (var i = 0; i < illuminatis.length; i++) {
		if (i == illuminatis.length-1) 
			illuminatis[i].next = null;
		else 
			illuminatis[i].next = illuminatis[i+1];
		
	}
	illuminatis[0].ai();

}

function tick(event) {
	stage.update();
}

function keyUpHandler(e) {
	
	if (canType) {
	   switch(e.keyCode)
	   {
		case KEYCODE_LEFT:  doge.move("left"); break;
		case KEYCODE_RIGHT: doge.move("right"); break;
		case KEYCODE_UP:    doge.move("up"); break;
		case KEYCODE_DOWN:  doge.move("down"); break;
	   } 
   }

}




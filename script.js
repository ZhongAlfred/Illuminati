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

function init() {

	stage = new createjs.Stage("canvas");
	stage.width = $('#canvas').width();
	stage.height = $('#canvas').height();
	queue = new createjs.LoadQueue();
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete", handleComplete);
	queue.loadManifest(
	[
	{id:"Illuminati", src:"assets/illuminati.mp3"},
	{id:"Background", src:"assets/puzzlebg.jpg"},
	{id:"Tile 1", src:"assets/tile.png"},
	{id:"Tile 2", src:"assets/tile2.png"}
	]);
	
}

function handleComplete(event) {

	console.log(stage.width + ", " + stage.height);
	createjs.Sound.play("Illuminati");
	var ball = new createjs.Shape();
	ball.graphics.beginFill("#FF0000").drawCircle(0,0,50);
	ball.x = 50;
	ball.y = 200;
	
	createjs.Tween.get(ball, {loop:true}).to({x:450}, 3000).to({x:50}, 3000);
	createjs.Ticker.addEventListener("tick", tick);
	
	
	
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

	stage.addChild(bg);
	for (var i = 0; i < tiles.length; i++) {
		stage.addChild(tiles[i]);
	}
	stage.addChild(ball);

}

function tick(event) {
	stage.update();
}
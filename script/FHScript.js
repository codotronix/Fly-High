//alert("hi");
var game = {};
game.height = document.getElementById("canvasBg").getAttribute("height");
game.width = document.getElementById("canvasBg").getAttribute("width");
console.log(game.width);

var player = {};
player.height = 60;
player.width = 60;
player.x = game.width/2 - player.width/2;
player.y = game.height - player.height - 10;
player.oldX = player.x;
player.oldY = player.y;
player.speed = 5;
player.rendered = true;		//set to true initially so that it doesnot TRY to show before image load...
player.ImageReady = false;

var enemy = {};
enemy.refPoint = 10;
enemy.refX = 40;
enemy.refXold = 40;
enemy.refYold = 10;
enemy.ImageReady = false;
enemy.moveInd = -1;    

var sky = {};
sky.x = 0;
sky.y = -600;
sky.ImageReady = false;

var contextBg = document.getElementById("canvasBg").getContext("2d");
var imageSky = new Image();
imageSky.src = "images/nightSky.png";
imageSky.onload = function()
{
	sky.ImageReady = true;
	//drawSky();
}

var contextPlayer = document.getElementById("canvasPlayer").getContext("2d");
var imagePlayer = new Image();
imagePlayer.src = "images/plane3.png";


imagePlayer.onload = function()
{
	player.ImageReady = true;
	//contextPlayer.drawImage(imagePlayer, player.x, player.y, player.height,player.width);
}

var contextEnemy = document.getElementById("canvasEnemy").getContext("2d");
var imageEnemy = new Image();
imageEnemy.src = "images/enemy.jpg";

//Loading Screen

loading();

function loading()
{
	if(sky.ImageReady && player.ImageReady && enemy.ImageReady)
	{
		contextBg.clearRect(0, 0, 500, 600);
		init();
	}
	else
	{
		contextBg.fillStyle = "white";
		contextBg.font = "bold 40px monaco";
		contextBg.fillText("Loading...",170, 300);
		console.log(sky.ImageReady);
		console.log(player.ImageReady);
		console.log(enemy.ImageReady);		
		setTimeout(loading,1000);
	}
}

function init()
{
	drawSky();
	player.rendered = false;
	drawPlayer();
	drawEnemy();
}

imageEnemy.onload = function()
{
	//drawEnemy();
	//increaseRefPoint();
	enemy.ImageReady = true;
}

function drawEnemy()
{
	//contextEnemy.drawImage(imageEnemy, 250, 90, 40, 40);
	//enemy.refPoint += 10;
	
	enemy.refXold = enemy.refX;
	enemy.refYold = enemy.refPoint;
	
	if(enemy.moveInd % 7 == 0)
	{
		enemy.refPoint += 10;
	}
	
		
	if(enemy.moveInd === -1 || enemy.moveInd === 0 || enemy.moveInd === 1 || enemy.moveInd === 6 || enemy.moveInd === 7)
	{
		enemy.refX -= 20;
	}
	else if(enemy.moveInd === 2 || enemy.moveInd === 3 || enemy.moveInd === 4 || enemy.moveInd === 5)
	{
		enemy.refX += 20;
	}
	
	enemy.moveInd++;
	
	if(enemy.moveInd === 8)
	{
		enemy.moveInd = 0;
	}
	
	for(y = 1; y <=5; y++)
	{
		for(x=1; x<=5; x++)
		{
			contextEnemy.clearRect(enemy.refXold + x*70 ,enemy.refYold + y * 60, 40, 40); 
			contextEnemy.drawImage(imageEnemy, enemy.refX + x*70, enemy.refPoint + y * 60, 40, 40);
		}
	}
	if(enemy.refPoint < 200)
	{
		setTimeout(drawEnemy,1500);
	}
}


function drawSky()
{
	contextBg.drawImage(imageSky, sky.x, sky.y);	
	sky.y += 10;
	if(sky.y > 0){sky.y = -600;}
	setTimeout(drawSky,100);
}

////////////////// Key Press ////////////////////////////////////////////////////////////////////
$(document).keydown(function(e){
	//console.log(e.keyCode);
	switch(e.keyCode)
	{
		case 37:		//Left
			player.x -= player.speed;
			if(player.x < 0) {player.x = 0;}
			player.rendered = false;
			break;
		case 39:		//Right
			player.x += player.speed;
			if(player.x + player.width > game.width){player.x = game.width - player.width;}
			player.rendered = false;
			break;
		case 38:		//Up
			player.y -= player.speed;
			if(player.y < 0){player.y = 0;}
			player.rendered = false;
			break;
		case 40:		//Down
			player.y += player.speed;
			if(player.y > game.height - player.height - 10){player.y = game.height - player.height - 10;}
			player.rendered = false;
			break;
	}	
	
	});
	
/////////////////////// End of Key Press Detection ///////////////////////////////////////////////

function render()
{
	drawPlayer();
}

function drawPlayer()
{
	if(player.rendered === false)
	{
		contextPlayer.clearRect(player.oldX, player.oldY, player.width, player.height);
		contextPlayer.drawImage(imagePlayer, player.x, player.y, player.height,player.width);
		player.rendered = true;
		player.oldX = player.x;
		player.oldY = player.y;
	}
}

var fps = setInterval(render,1000/30);

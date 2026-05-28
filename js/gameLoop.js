var canvas;
var context;
var player;
var timer;
var interval = 1000 / 60;


var frictionX = 0.8;
var frictionY = 0.8;
var gravity = 1;

var difficultyTimer = 0;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

// lane setup
var laneCount = 5;
var laneWidth = canvas.width / laneCount;
var currentLane = 2;

var moveAmount = 1;



var frictionX = 0.8;
var frictionY = 0.8;
var gravity = 1;


var enemies = [];
var enemyTimer = 0;
var enemySpawnTime = 90;
var minEnemySpawnTime = 25;

var enemySpeed = 3;
var score = 0;
var gameOver = false;

// player
player = new GameObject(currentLane * laneWidth + laneWidth / 2, canvas.height - 50, 80, 80, "#7a2876");

timer = setInterval(animate, interval);

function animate()
{
    if(gameOver)
{
    drawLanes();
    player.drawRect();
    drawEnemies();
    drawGameOverText();
    return;
}
    
    context.clearRect(0, 0, canvas.width, canvas.height);

    


    if(a)
    {
        currentLane -= moveAmount;

        if(currentLane < 0)
        {
            currentLane = laneCount - 1;
        }

        a = false;
    }


    if(d)
    {
        currentLane += moveAmount;

        if(currentLane >= laneCount)
        {
            currentLane = 0;
        }

        d = false;
    }

    // update player position
    player.x = currentLane * laneWidth + laneWidth / 2;

    
    difficultyTimer++;

    enemySpeed = 3 + difficultyTimer / 1000;

    enemySpawnTime = 90 - difficultyTimer / 100;

    if(enemySpawnTime < minEnemySpawnTime)
    {
        enemySpawnTime = minEnemySpawnTime;
    }


   


    spawnEnemies();
    moveEnemies();
    checkEnemyCollision();



    drawLanes();
    player.drawRect();
    drawText();
    drawEnemies();
}



function spawnEnemies()
{
    enemyTimer++;

    if(enemyTimer >= enemySpawnTime)
    {
        var randomLane = Math.floor(Math.random() * laneCount);

        var enemy = new GameObject(
            randomLane * laneWidth + laneWidth / 2,
            -40,
            60,
            60,
            "red"
        );

        enemies.push(enemy);

        enemyTimer = 0;
    }
}


function moveEnemies()
{
    for(var i = 0; i < enemies.length; i++)
    {
        enemies[i].y += enemySpeed;
    }

    for(var i = enemies.length - 1; i >= 0; i--)
    {
        if(enemies[i].y > canvas.height + 100)
        {
            score++;
            enemies.splice(i, 1);
        }
    }

    
}

function checkEnemyCollision()
{
    for(var i = 0; i < enemies.length; i++)
    {
        if(
            player.x - player.width / 2 < enemies[i].x + enemies[i].width / 2 &&
            player.x + player.width / 2 > enemies[i].x - enemies[i].width / 2 &&
            player.y - player.height / 2 < enemies[i].y + enemies[i].height / 2 &&
            player.y + player.height / 2 > enemies[i].y - enemies[i].height / 2
        )
        {
            gameOver = true;
        }
    }
}


function drawEnemies()
{
    for(var i = 0; i < enemies.length; i++)
    {
        enemies[i].drawRect();
    }
}


function drawLanes()
{
    context.strokeStyle = "black";
    context.lineWidth = 2;

    for(var i = 0; i <= laneCount; i++)
    {
        context.beginPath();
        context.moveTo(i * laneWidth, 0);
        context.lineTo(i * laneWidth, canvas.height);
        context.stroke();
    }
}

function drawText()
{
    context.fillStyle = "black";
    context.font = "24px Arial";
    context.fillText("A = move left", 10, 30);
    context.fillText("D = move right", 10, 65);

    context.fillText("Score: " + score, 10, 100);
   

    
}


function drawGameOverText()
{
    context.fillStyle = "black";
    context.font = "60px Arial";

    context.fillText(
        "GAME OVER",
        canvas.width / 2 - 180,
        canvas.height / 2
    );
}
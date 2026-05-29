var canvas;
var context;
var player;
var timer;
var interval = 1000 / 60;


var gameState = "menu";

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
var highScore = 0;
var gameOver = false;

//images
var catImg = new Image();
catImg.src = "images/cat.png";

var dogImg = new Image();
dogImg.src = "images/dog.png";

var mouseImg = new Image();
mouseImg.src = "images/mouse.png";


//power up
var powerUps = [];
var invincible = false;
var invincibleTimer = 0;
var invincibleTime = 300; // 5 seconds at 60 FPS

// player
player = new GameObject(currentLane * laneWidth + laneWidth / 2, canvas.height - 70, 120, 90);

timer = setInterval(animate, interval);

function animate()
{
    if(gameOver)
    {
        drawLanes();

        context.drawImage(
            catImg,
            player.x - player.width / 2,
            player.y - player.height / 2,
            player.width,
            player.height
        );

        drawEnemies();
        drawPowerUps();
        drawGameOverText();

        if(r)
        {
            restartGame();
            r = false;
        }

        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    if(gameState == "menu")
    {
        drawMenu();

        if(mouseClicked)
        {
            if(mouseX > canvas.width / 2 - 150 && mouseX < canvas.width / 2 + 150 &&
            mouseY > 300 && mouseY < 380)
            {
                gameState = "play";
                mouseClicked = false;
                return;
            }

            if(mouseX > canvas.width / 2 - 150 && mouseX < canvas.width / 2 + 150 &&
            mouseY > 420 && mouseY < 500)
            {
                gameState = "instructions";
                mouseClicked = false;
                return;
            }

            mouseClicked = false;
        }

        return;
    }

    if(gameState == "instructions")
    {
        drawInstructions();

        if(mouseClicked)
        {
            if(mouseX > canvas.width / 2 - 150 && mouseX < canvas.width / 2 + 150 &&
            mouseY > 500 && mouseY < 580)
            {
                gameState = "menu";
                mouseClicked = false;
                return;
            }

            mouseClicked = false;
        }

        return;
    }

    


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


    if(invincible)
    {
        invincibleTimer--;

        

        if(invincibleTimer <= 0)
        {
            invincible = false;
            
        }
    }

    //enemies
    spawnEnemies();
    moveEnemies();
    checkEnemyCollision();

    //power ups
    spawnPowerUps();
    movePowerUps();
    checkPowerUpCollision();

    context.drawImage(
    catImg,
    player.x - player.width / 2,
    player.y - player.height / 2,
    player.width,
    player.height
    );

    drawLanes();
    drawText();
    drawEnemies();
    drawPowerUps();
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
            120,
            120
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

            if(score > highScore)
            {
                highScore = score;
            }

            enemies.splice(i, 1);
        }
    }

    
}

function checkEnemyCollision()
{
    for(var i = 0; i < enemies.length; i++)
    {
        if(
            player.x - player.width / 4 < enemies[i].x + enemies[i].width / 4 &&
            player.x + player.width / 4 > enemies[i].x - enemies[i].width / 4 &&
            player.y - player.height / 4 < enemies[i].y + enemies[i].height / 4 &&
            player.y + player.height / 4 > enemies[i].y - enemies[i].height / 4
        )
        {
            if(!invincible)
            {
                gameOver = true;
            }
        }
    }
}


function drawEnemies()
{
    for(var i = 0; i < enemies.length; i++)
    {
        context.drawImage(
            dogImg,
            enemies[i].x - enemies[i].width / 2,
            enemies[i].y - enemies[i].height / 2,
            enemies[i].width,
            enemies[i].height
        );
    }
}

function spawnPowerUps()
{
    if(Math.random() < 0.003)
    {
        var randomLane = Math.floor(Math.random() * laneCount);

        var powerUp = new GameObject(
            randomLane * laneWidth + laneWidth / 2,
            -40,
            110,
            90
        );

        powerUps.push(powerUp);
    }
}

function movePowerUps()
{
    for(var i = 0; i < powerUps.length; i++)
    {
        powerUps[i].y += enemySpeed;
    }

    for(var i = powerUps.length - 1; i >= 0; i--)
    {
        if(powerUps[i].y > canvas.height + 100)
        {
            powerUps.splice(i, 1);
        }
    }
}

function checkPowerUpCollision()
{
    for(var i = powerUps.length - 1; i >= 0; i--)
    {
        if(
            player.x - player.width / 2 < powerUps[i].x + powerUps[i].width / 2 &&
            player.x + player.width / 2 > powerUps[i].x - powerUps[i].width / 2 &&
            player.y - player.height / 2 < powerUps[i].y + powerUps[i].height / 2 &&
            player.y + player.height / 2 > powerUps[i].y - powerUps[i].height / 2
        )
        {
            invincible = true;
            invincibleTimer = invincibleTime;
            powerUps.splice(i, 1);
        }
    }
}

function drawPowerUps()
{
    for(var i = 0; i < powerUps.length; i++)
    {
        context.drawImage(
            mouseImg,
            powerUps[i].x - powerUps[i].width / 2,
            powerUps[i].y - powerUps[i].height / 2,
            powerUps[i].width,
            powerUps[i].height
        );
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
    context.textAlign = "left";

    context.fillText("Score: " + score, 10, 30);
    context.fillText("High Score: " + highScore, 10, 65);

    if(invincible)
    {
        context.textAlign = "center";
        context.fillText(
            "Invincible: " + (invincibleTimer / 60).toFixed(2),
            canvas.width / 2,
            40
        );
        context.textAlign = "left";
    }
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

    context.font = "30px Arial";
    context.fillText(
    "Press R to Play Again",
    canvas.width / 2 - 140,
    canvas.height / 2 + 60
    );
}


function restartGame()
{
    score = 0;
    gameOver = false;

    enemies = [];

    difficultyTimer = 0;
    enemySpeed = 3;
    enemySpawnTime = 90;

    currentLane = 2;

    player.x = currentLane * laneWidth + laneWidth / 2;

    powerUps = [];
    invincible = false;
    invincibleTimer = 0;
    
}

//menu
function drawMenu()
{
    context.fillStyle = "black";
    context.font = "60px Arial";
    context.textAlign = "center";
    context.fillText("Dog Dodge", canvas.width / 2, 180);

    context.strokeStyle = "black";
    context.lineWidth = 4;

    context.strokeRect(canvas.width / 2 - 150, 300, 300, 80);
    context.font = "36px Arial";
    context.fillText("Play", canvas.width / 2, 350);

    context.strokeRect(canvas.width / 2 - 150, 420, 300, 80);
    context.fillText("Instructions", canvas.width / 2, 470);

    context.textAlign = "left";
}

//instructions

function drawInstructions()
{
    context.fillStyle = "black";
    context.textAlign = "center";

    context.font = "55px Arial";
    context.fillText("Instructions", canvas.width / 2, 100);

    context.font = "28px Arial";
    context.fillText("A = move left", canvas.width / 2, 180);
    context.fillText("D = move right", canvas.width / 2, 230);
    context.fillText("Avoid red enemies", canvas.width / 2, 280);
    context.fillText("Blue power ups make you invincible for 5 seconds", canvas.width / 2, 330);
    context.fillText("Score increases when enemies leave the screen", canvas.width / 2, 380);
    context.fillText("Press R to play again after losing", canvas.width / 2, 430);

    context.strokeStyle = "black";
    context.lineWidth = 4;
    context.strokeRect(canvas.width / 2 - 150, 500, 300, 80);   

    context.font = "36px Arial";
    context.fillText("Back", canvas.width / 2, 550);

    context.textAlign = "left";
}
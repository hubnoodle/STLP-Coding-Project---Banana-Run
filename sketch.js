var PLAY = 1;
var END = 0;
var gameState = PLAY;

var run, run_running, run_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;

var gameOver, restart;


function preload(){
  run_running =   loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png","run7.png","run8.png","run9.png","run10.png","run11.png");run_collided = loadAnimation("753511.gif");
  
  groundImage = loadImage("ground2.png");
  
  obstacle1 = loadImage("peel-removebg-preview.png");
    
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
 
  run = createSprite(300,180,20,50);
 
  run.addAnimation("running", run_running); 
  run.addAnimation("collided", run_collided);
  run.scale = 0.5;
 
  ground = createSprite(1000,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,40);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,80);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
       ground.velocityX = -(6 + 3*score/100);
       if (ground.x < 0){
      ground.x = ground.width/2;
    }
    score = score + Math.round(getFrameRate()/60);
    
      if(keyDown("up") && run.y >= 140) {
      run.velocityY = -12;
    }
  
    run.velocityY = run.velocityY + 0.8
  
    run.collide(invisibleGround);
    spawnObstacles();
  
    camera.position.x = displayWidth/4;

    if(obstaclesGroup.isTouching(run)){
        gameState = END
         run.changeAnimation("collided",run_collided );
   
    }
  }
   if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
       
    ground.velocityX = 0;
    run.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  drawSprites();
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.addImage(obstacle1);
          
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  run.changeAnimation("running", run_running);
  
  score = 0;
  
}
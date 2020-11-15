var planeImage,plane;
var skyImage,sky;
var obstacleImage,obstacle;
var obstacleGroup;
var gameState="play";
var score;
var restart,restartImage;

function preload(){
planeImage=loadImage("plane.jpg");
skyImage=loadImage("sky.jpg");
obstacleImage=loadImage("obstacle.jpg");
restartImage=loadImage("restart.jpg")
}

function setup() {
 createCanvas(400,400);
  
  /*sky=createSprite(300,300,100,50)
  sky.addImage(skyImage)
  sky.scale=0.8;*/
  
  
  plane=createSprite(100,200,20,10);
  plane.addImage(planeImage);
  plane.scale=0.3;
  
  restart=createSprite(200,200,50,50);
  restart.addImage(restartImage);
  restart.scale=0.5;
  restart.visible= false;
  
  obstacleGroup=new Group()
  
  score=0;
}

function draw() {
  background(skyImage)
  text("Score: "+ score, 300,50);
  
 if(gameState==="play"){
  score = score + Math.round(getFrameRate()/60);
   
   if(obstacleGroup.isTouching(plane)){
    plane.velocityY=0;
    plane.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    restart.visible=true;
    score=0;
     if(mousePressedOver(restart)) {
      reset();
    }
   }
   
  if(keyWentDown("up")){
    plane.velocityX=0;
    plane.velocityY=-4;
  }
   if(keyWentUp("down")){
    plane.velocityX=0;
    plane.velocityY=4;
  }
 }
  
  spawnObstacles();
  drawSprites();
}
function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,150,10,40);
    obstacle.debug = false;
    obstacle.y = Math.round(random(1,399));
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.08;
    obstacle.velocityX =-4;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}
function reset(){
  restart.visible= false;
  
  obstacleGroup.destroyEach();
score=0;
}
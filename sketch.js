var trex_running,trex,trex_collided;
var ground,ground_image,ground2;
var cloud_image,cloudsGroup;
var obstacleGroup,o1,o2,o3,o4,o5,o6;
var score = 0;
var gameOver_image;
var gameOver;
var gamerestart;
var gamerestart_image;
var gameState="play";
var count = 0;

function preload () {
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = 
    loadAnimation("trex_collided.png");
  ground_image = 
    loadImage("ground2.png");
  
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
    o3=loadImage("obstacle3.png");
     o4=loadImage("obstacle4.png");
     o5=loadImage("obstacle5.png");
     o6=loadImage("obstacle6.png");
  
  cloud_image=loadImage("cloud.png");
  
  gamerestart_image=loadImage("restart.png");
  
  gameOver_image = loadImage("gameOver.png");
  
  
  
  
  
  
  
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite (50,170);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(300,180);
  ground.addImage(ground_image);
  
  ground2 = createSprite(300,190,600,5);
  ground2.visible = false;
  cloudsGroup=new Group();
  obstacleGroup=new Group ();
  gameOver = createSprite(300,50);
  gamerestart = createSprite(300,120);
  gameOver.addImage (gameOver_image);
  gamerestart.addImage (gamerestart_image);
  gameOver.scale=0.5;
  gamerestart.scale=0.5;
  gameOver.visible=false;
  gamerestart.visible=false;
}

function draw() {
  background(180);
  
  text("Score: "+ count, 250, 40);
  
  if(gameState==="play"){
    if(keyDown("space") && trex.y>160){
    trex.velocityY= -12;
    
  }
    
     count = count+ Math.round(getFrameRate()/40);
  
  trex.velocityY = trex.velocityY + 0.5;
  trex.collide(ground2);
  
  spawnObstacles();
  
  spawnClouds();
  if (obstacleGroup.isTouching(trex)){
    gameState="end";
  }
    
  }
  
else if(gameState==="end"){ 
ground.velocityX = 0;
  trex.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  trex.changeAnimation("collided",trex_collided);
  gameOver.visible=true;
  gamerestart.visible=true;
  if(mousePressedOver(gamerestart)){
    reset();
  }
}
  
  
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    
    switch(rand){
      case 1:obstacle.addImage(o1);
        break
        case 2:obstacle.addImage(o2);
        break
        case 3:obstacle.addImage(o3);
        break
        case 4:obstacle.addImage(o4);
        break
        case 5:obstacle.addImage(o5);
        break
        case 6:obstacle.addImage(o6);
        break
        default:break;
        
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 170;
    obstacleGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,320,40,10);
    cloud.y = Math.round(random(80,140));
    cloud.addImage(cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
    
  }
  
}

function reset(){
  gameState="play";
  gameOver.visible=false;
  gamerestart.visible=false;
  trex.changeAnimation("running",trex_running);
  count=0;
  cloudsGroup.destroyEach();
  obstacleGroup.destroyEach();
  
}
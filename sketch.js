//Create enemy and player sprite variable
var enem1, enem2, enem3, enem4, player, bullet, bottomEdge, gameState;

//Create variables for animations
var enem1Anim, enem2Anim, enem3Anim, enem4Anim, playerAnim, bulletAnim, backAnim;

//Create Enemy and bullet Group
var enemyGroup, bulletGroup;

//Create variable for Background
var Background;

//game States
var PLAY = 1;
var END = 0;

function preload() {
  enem1Anim = loadImage("enemy1.png");
  enem2Anim = loadImage("enemy2.png");
  enem3Anim = loadImage("enemy3.png");
  enem4Anim = loadImage("enemy4.png");
  playerAnim = loadImage("Player.png");
  bulletAnim = loadImage("Bullet.png");
  backAnim = loadImage("Background.jpg");
}

function setup() {
  createCanvas(500, 500);

  Background = createSprite(250, 250, 500, 500);
  Background.addImage("ha", backAnim); 
  Background.depth = 3;
  
  player = createSprite(250, 450, 10, 10);
  player.addImage("sp1", playerAnim);
  player.scale = 0.45;
  player.rotation = -45;
  //player.debug=true;
  player.setCollider("rectangle", 0, 0, player.width - 50, player.height - 50, 45)
  
  enemyGroup = createGroup();
  bulletGroup = createGroup();
  
  bottomEdge = createSprite(250, 550, 500, 1);
  bottomEdge.visible = false;
  
  gameState = 1;
}

function draw() {
  //background("white");  

  
  if (gameState === PLAY) {
    //Checks if enemy has touched player
    planeTouch();
    
    //Shoot bullets
    spawnBullets();

    //Spawn Enemy
    spawnEnemy();
    enemyGroup.setLifetimeEach(298); 
    
    //Makes plane follow mouse cursor
    player.position.x = mouseX;

    //plane wont go beyong the left or right edge
    if (player.position.x >= 460) {
      player.position.x = 455;
    } else if (player.position.x <= 45) {
      player.position.x = 45;
    }
  }  
  
  if (gameState === END) {
    enemyGroup.setVelocityYEach(0);
    endState();
  }
  
  drawSprites();
}


function planeTouch() {
  if (player.isTouching(enemyGroup) || enemyGroup.isTouching(bottomEdge)) {
    gameState = 0;
  }
}

function spawnBullets () {
  if (keyWentDown("space")) {
    bullet = createSprite(player.x, 430, 2, 15);
    bullet.addImage("bullet", bulletAnim);
    bullet.scale = 0.05;
    bullet.lifetime = 76;
    
    bulletGroup.add(bullet);
    bulletGroup.setVelocityYEach(-9);
  }
  
  if (bulletGroup.isTouching(enemyGroup)) {
      enemyGroup.destroyEach();
      bulletGroup.destroyEach();
  }
}

function spawnEnemy() {
  if ((frameCount % 75) === 0) {
    //Making Enemy Sprites
    var enemy = createSprite(Math.round(random(40, 460)), 0, 20, 20);
    enemy.setVelocity(0, 6);
    enemy.scale = 0.35;
    
    //enemy.debug = true;
    enemy.setCollider("rectangle", 0, -10, 160, 140)
    
    enemyGroup.add(enemy);
    
    var cases = Math.round(random(1,4));
    switch(cases) {
     case 1:enemy.addImage("tt",enem1Anim);
       break;
       
     case 2:enemy.addImage("cc",enem2Anim);
       break;
       
     case 3:enemy.addImage("dd",enem3Anim);
       break;
       
     case 4:enemy.addImage("ss",enem4Anim);
       break;
       
     default:break;
     
   }
 }
}

function endState() {
   for (var x = 0; x < 1; x++) {
      if (x === 1) {
        x = 0
      }
        bulletGroup.setLifetimeEach(100);
        enemyGroup.setLifetimeEach(100);
    }
}
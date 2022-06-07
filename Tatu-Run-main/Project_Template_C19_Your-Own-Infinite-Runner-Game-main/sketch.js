var chao,chaoImg;
var tatu,tatuImg;
var obstacle1,obstacle1Img;
var obstacle2,obstacle2Img;
var bordas;
var obstacleGroup;
var gameOver;
var fundoSond, dieSound;
var ding = false

function preload(){
chaoImg = loadImage("Road.png")
tatuImg = loadAnimation("tatu.png","tatu2.png","tatu3.png","tatu4.png")
obstacle1Img=loadImage("obstacle1.png")
obstacle2Img=loadImage("obstacle2.png")
gameOver=loadImage("Game_Over_logo.png")
dieSound=loadSound("Fracasso.mp3")
fundoSond=loadSound("MusicaDeFundo.mp3")
}

function setup() {
    createCanvas(windowWidth,windowHeight);

//Movendo o chão
    chao=createSprite(width/2,height/2)
    chao.addImage(chaoImg);
    chao.velocityX = -5;

//criando o tatu
    tatu=createSprite(70,height/2)
    tatu.addAnimation("tatuRunning",tatuImg)
    tatu.scale=0.08

//criando bordas
  bordas=createEdgeSprites()
//criando obstaculos
obstacleGroup= new Group()
fundoSond.play();
fundoSond.setVolume(0.3)
}



function draw() {
    background(0);
    drawSprites();
 
    tatu.collide(bordas)


    if(chao.x < 0 ){
        chao.x = width/2;
    }
    if(keyDown("w")){  
        tatu.y = tatu.y - 5
    }
    if(keyDown("s")){  
        tatu.y = tatu.y + 5
    }
    if(keyDown("d")){  
        tatu.x = tatu.x + 5
    }
    if(keyDown("a")){  
        tatu.x = tatu.x - 5
    }
   

    if(tatu.isTouching(obstacleGroup)){
        tatu.visible=false
        obstacleGroup.setVisibleEach(false)
        chao.velocityX=0
        obstacleGroup.setVelocityXEach(0)
        imageMode(CENTER)
        image(gameOver,width/2,height/2)
        if(!ding&& !dieSound.isPlaying()){
            dieSound.play()
              
          }
    }
    else{
        createObstacles() 
    }
}

function createObstacles(){
    if(frameCount%60===0){
    var roleta = Math.round(random(1,2))
    if(roleta===1){
        obstacle1=createSprite(width,random(10,height-10))
        obstacle1.addImage(obstacle1Img)
        obstacle1.velocityX=-5
        obstacle1.scale=0.2
        obstacleGroup.add(obstacle1)
    }    
    else{
        obstacle2=createSprite(width,random(10,height-10))
        obstacle2.addImage(obstacle2Img)
        obstacle2.velocityX=-5 
        obstacle2.scale=0.2  
        obstacleGroup.add(obstacle2)
    }
    }
}
var ENCERRAR = 0
var JOGAR = 1
var ej = JOGAR
var trex ,trex_correndo;
var bordas;
var solo ,solo_image;
var solo2;
var img1
var img2,img3,img4,img5,img6,img7
var pont = 0
var trex2
var G1,G2, R, R2
var jump, cp, die

 
function preload(){
  
  trex2 = loadImage("trex_collided.png")
  
  img1 = loadImage("cloud.png")
  img2 = loadImage("obstacle1.png")
  img3 = loadImage("obstacle2.png")
  img4 = loadImage("obstacle3.png")
  img5 = loadImage("obstacle4.png")
  img6 = loadImage("obstacle5.png")
  img7 = loadImage("obstacle6.png")
  G2 = loadImage("gameOver.png")
  R = loadImage("restart.png")
  jump = loadSound("jump.mp3")
  die  = loadSound("die.mp3")
  cp   = loadSound("checkPoint.mp3")
  
  
//carregar as imagens do jogo
  trex_correndo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  solo_image = loadImage("ground2.png")
  
}
   
function setup(){
  

  
  
  //criar a área do jogo
  createCanvas(windowWidth,windowHeight)
  
  //criar um sprite do trex
    trex = createSprite(50,height-15,10,50);
     trex.addAnimation("running", trex_correndo);
      trex.scale=0.5
       trex.addAnimation("morto", trex2)
    trex.setCollider("circle",0,0,30)
    trex.debug = false
  //criar um solo
    solo = createSprite(width/2,height-20,width,2)
     solo.addImage("imagem solo", solo_image);
      solo.velocity.x =  -5
  
  //criar um solo invisivel
    solo2 = createSprite(width/2,height-15,width,2)
     solo2.visible=false

  //criar bordas
    bordas=createEdgeSprites();
  
 //grupos
  grupo1 = new Group ();
  grupo2 = new Group ();
  
//GAME OVER
  G1 = createSprite(width/2,height/2)
  G1.visible = false

  R2 = createSprite(G1.width+500,height/2)
  R2.visible = false  
  R2.scale = 0.5
  
  
  

}
function draw(){
  
    background(180)


  grupo1.depth = R2.depth
  R2.depth = R2.depth + 1
  grupo1.depth = G1.depth
  G1.depth = G1.depth + 1
  
  
  //estado de jogo
     if(ej === ENCERRAR){
     grupo1.setVelocityXEach(0)
     grupo2.setVelocityXEach(0)
     grupo1.setLifetimeEach(-1)
     grupo2.setLifetimeEach(-1)   
     G1.addImage(G2)
     G1.visible = true
     R2.addImage(R)
     R2.visible = true
     solo.velocityX = 0
     trex.velocityY = -0.5
       
     trex.changeAnimation("morto")
       
      if(mousePressedOver(R2)){
       
       reset();
       
     }
       
       
      }
   else if(ej === JOGAR){
    pont = pont+ Math.round(frameRate()/60)
     solo.velocityX = -5
     if(grupo1.isTouching(trex)){
     
      die.play();
      ej = ENCERRAR
      
       
       
       
       
     
      }
     
     
     
  //criar o comando de pulo do trex
    if(
      (touches.length>0&& trex.y> height-50)||
      (keyDown("space")&& trex.y> height-50)){
      trex.velocityY=-10
      jump.play();
  }
     
    if(pont>0 && pont%100 ===0){
      
      cp.play();
      
      
    }
     
     
     
     
    obstaculos();
    cloud();
           
           
           
           
  }
  
  

  
  
  
  
    textSize(10)
    stroke = "black"
    text("pontuação"+ "=" + pont ,500,10)
   
    
 
  //criar um looping do solo
    if(solo.x <0) {
      solo.x = solo.width/2 
  }
    
  //criar a gravidade do trex
    trex.velocityY= trex.velocityY+0.5

  //fazer o trex pisar no solo
    trex.collide(solo2)
    drawSprites();

}


function cloud(){

  if(frameCount%60 === 0){
   
    var nuvem;
      nuvem = createSprite(width+20,height/2,100,10)
       nuvem.velocityX = -8
        nuvem.y = Math.round(random(20,100))
         nuvem.lifetime = 220
      nuvem.addImage(img1)
      trex.depth = nuvem.depth
      trex.depth = trex.depth + 1
      grupo2.add(nuvem)
    
  }
  
  
}

function obstaculos() {
  
 if(frameCount%60 === 0){
    var cacto = createSprite(610,height - 20,20,100)
     cacto.velocityX = -(5+(3*pont)/100)
     
    var rand = Math.round(random(1,6))     
   
    switch(rand){
        
       case 1: cacto.addImage(img2)
        cacto.scale = 0.6
        cacto.collide(solo2)
        break;
       case 2: cacto.addImage(img3)
        cacto.scale = 0.6
        cacto.collide(solo2)
        break;  
       case 3: cacto.addImage(img4)
        cacto.scale = 0.6
        cacto.collide(solo2)
        break; 
       case 4: cacto.addImage(img5)
        cacto.scale = 0.6
        cacto.collide(solo2)
        break; 
       case 5: cacto.addImage(img6)
        cacto.scale = 0.6
        cacto.collide(solo2)
        break; 
        cacto.collide(solo2)
       case 6: cacto.addImage(img7)
        cacto.scale = 0.6
        cacto.collide(solo2)
        break;
       default:break;
        
    }
    grupo1.add(cacto);
    cacto.lifetime = width
  }
 
  
  
  
  
  
}

function reset(){
  
  ej = JOGAR
  grupo1.destroyEach();
  grupo2.destroyEach();
  pont = 0
  G1.visible = false
  R2.visible = false
  
  trex.changeAnimation("running")

}
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, redBubbleGroup, bulletGroup;


var life =3;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  gunImg = loadImage("assets/gun1.png")
  blastImg = loadImage("assets/blast.png")
  bulletImg = loadImage("assets/bullet1.png")
  blueBubbleImg = loadImage("assets/waterBubble.png")
  redBubbleImg = loadImage("assets/redbubble.png")
  backBoardImg= loadImage("assets/back.jpg")

  shootSound = loadSound("assets/shootSound.mp3")
  shootSound.setVolume(0.5)
  bubblePopSound  = loadSound("assets/bubblePopSound.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  backBoard= createSprite(50, height/2, 100, height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#BDA297");
  
  heading.html("Vidas: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Pontuação: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===PLAY){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyWentDown("space")){
      shootBullet();
    }

    blueBubbleGroup.overlap(backBoard, handleGameover);
    redBubbleGroup.overlap(backBoard, handleGameover);
    
    // A função handleBubbleCollision será chamada automaticamente enviando o sprite da bolha e da bala específicos
    blueBubbleGroup.overlap(bulletGroup, handleBubbleCollision);
    redBubbleGroup.overlap(bulletGroup, handleBubbleCollision);

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(width, random(125, height - 50), 40, 40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}

function drawredBubble(){
  redbubble = createSprite(width, random(125, height - 50), 40, 40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet = createSprite(225, width/2, 50,20);
  shootSound.play();
  bullet.y = gun.y - 34;
  bullet.addImage(bulletImg);
  bullet.scale = 0.12;
  bullet.velocityX = 75;
  bulletGroup.add(bullet);
}

function handleBubbleCollision(bubble, bullet) {
  if (life > 0) {
    score = score + 1;
  }

  // Cria a explosão na posição exata da bala que colidiu
  blast = createSprite(bullet.x + 60, bullet.y, 50, 50);
  blast.addImage(blastImg);
  blast.scale = 0.3;
  blast.life = 20;

  bubblePopSound.play();

  // Destrói APENAS a bala e a bolha envolvidas na colisão
  bullet.remove();
  bubble.remove();
}

function handleGameover(bubble, board){
  life = life - 1;
    
  // Apaga apenas a bolha que encostou no painel
  bubble.remove(); 

  if (life === 0) {
    gameState = END;
    swal({
      title: `Fim de Jogo`,
      text: "Sua pontuação é: " + score,
      imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Jogar novamente"
    }, function(){
      gameState = PLAY;
    });
  }
}
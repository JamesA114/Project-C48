var spaceship, spaceShipIMG
var backgroundImage
var laserIMG
var laserG = []

var alien1G,alien2G,alien3G,alien4G,alien5G,alienIMG
var alien1,alien2,alien3,alien4,alien5

var planet, planetIMG

var timerThing

var score = 0
var highscore = 0
var gamestate = "play"

var mothership, mothershipImg
var mothershipHP = 80

var lives = 3
var lifetimer

var endobject
var gameOver, gameOverIMG
var greenlaserG
var greenlaser, greenlaserImg 

var dumblasercatcher

var explosionImg

var winthing, winImg

var pewSound
var boomSound
var laserSound

function preload(){

backgroundImage = loadImage("spaceBackground.jpg");
spaceShipIMG = loadImage("spaceship.png");
laserIMG = loadImage("laser.jpg")
alienIMG = loadImage("spaceinvaderpng.png")
planetIMG = loadImage("planet.png")
gameOverIMG = loadImage("gameOver.png")
mothershipImg = loadImage("Mothership.png")
greenlaserImg = loadImage("alienlaser.webp")
explosionImg = loadImage("explosion.png")
winImg = loadImage("Win.png")

pewSound = loadSound("pew.crdownload")
boomSound = loadSound("cannon_explosion.mp3")
laserSound = loadSound("laser.crdownload")
}

function setup() {
createCanvas(400,600)

planet = createSprite(200,800)
planet.scale = 0.5
planet.addImage(planetIMG)
planet.velocityY = 0.8

//lifetimer = createSprite(0,-30,20,20)
//lifetimer.velocity = 1

timerThing = createSprite(0,-70,20,20)
timerThing.velocityX = 3

endobject = createSprite(200,650,500,1)

winthing = createSprite(200, 300)
winthing.addImage(winImg)
winthing.scale = 0.5
winthing.visible = false

gameOver = createSprite(200,300)
gameOver.addImage(gameOverIMG)
gameOver.scale = 0.7
gameOver.visible = false

spaceship = createSprite(200,550,20,20)
spaceship.addImage(spaceShipIMG)
spaceship.scale = 0.15

dumblasercatcher = createSprite(200,0,400,20)
dumblasercatcher.visible = false

alien1G = new Group();
alien2G = new Group();
alien3G = new Group();
alien4G = new Group();
alien5G = new Group();
laserG = new Group();
greenlaserG = new Group();
}

function draw() {
background(backgroundImage);
spaceship.debug = false
spaceship.setCollider("rectangle", 0, 0, 100, 100)

//console.log(laserG.length)

if(dumblasercatcher.isTouching(laserG)){
    laserG[0].destroy()
    laserG.shift()
}

fill("yellow")
text("Score:" + score, 320, 20)
text("High Score:" + (highscore), 300, 40)
text("Lives:" + lives, 320, 60)
text("up arrow to shoot", 5, 15)
text("down arrow to reset", 5, 30)
text("left and right arrow to move", 5, 45)


if(gamestate == "play"){
    if(keyDown("left_arrow") && spaceship.x > 50){
        spaceship.x = spaceship.x - 6
    }
    if(keyDown("right_arrow") && spaceship.x < 350){
        spaceship.x = spaceship.x + 6
    }
    if(keyDown("up_arrow") && timerThing.x > 25){
        pewSound.play()
        pewSound.setVolume(0.2)
        shootLaser()
        timerThing.x = 0
    }
    
    if(laserG.isTouching(alien1G)){
        boomSound.play()
        boomSound.setVolume(0.05)
        alien1G.destroyEach();
        score = score + 1
        laserG[0].destroy()
        laserG.shift()
        //console.log("alien1 problem")
    }
    
    if(laserG.isTouching(alien2G)){
        boomSound.play()
        boomSound.setVolume(0.05)
        alien2G.destroyEach();
        score = score + 1
        laserG[0].destroy()
        laserG.shift()
        //console.log("alien 2 problem")
    }
    if(laserG.isTouching(alien3G)){
        alien3G.destroyEach();
        score = score + 1
        laserG[0].destroy()
        laserG.shift()
        //console.log("alien 3 problem")
    }
    if(laserG.isTouching(alien4G)){
        boomSound.play()
        boomSound.setVolume(0.05)
        alien4G.destroyEach();
        score = score + 1
        laserG[0].destroy()
        laserG.shift()
    }
    if(laserG.isTouching(alien5G)){
        boomSound.play()
        boomSound.setVolume(0.05)
        alien5G.destroyEach();
        score = score + 1
        laserG[0].destroy()
        laserG.shift()
    }
    
    if(endobject.isTouching(alien1G) && frameCount % 5 ==0){
        lives -= 1
        }
    
    if(endobject.isTouching(alien2G) && frameCount % 5 ==0){
        lives -= 1
    }
    if(endobject.isTouching(alien3G) && frameCount % 5 ==0){
        lives -=1
    }
    if(endobject.isTouching(alien4G) && frameCount % 5 ==0){
        lives -= 1
    }
    if(endobject.isTouching(alien5G) && frameCount % 5 ==0){
        lives -= 1
    }
    if(lives == 0){
        gamestate = "end"
    }

    if(score >= highscore){
        highscore=score
    }

    if(score == 50){
        score += 1
        gamestate = "bossbattle"
        mothership = createSprite(200, 0)
        mothership.addImage(mothershipImg)
        mothership.velocityY = 0.25
        mothership.scale = 0.15
        mothership.depth = winthing.depth
        winthing.depth += 1
    }
    
    spawnAlien1();    
    spawnAlien2();
    spawnAlien3();
    spawnAlien4();
    spawnAlien5();
}

if(gamestate == "bossbattle"){
    /*var fullhp = createSprite(200,40, 100, 25)
    fill(0,115,4)
    var realhp = createSprite(200,40, mothershipHP, 20)
    fill(19,232,26)*/
    if(score >= highscore){
        highscore=score
    }
    if(keyDown("left_arrow") && spaceship.x > 50){
        spaceship.x = spaceship.x - 6
    }
    if(keyDown("right_arrow") && spaceship.x < 350){
        spaceship.x = spaceship.x + 6
    }
    if(keyDown("up_arrow") && timerThing.x > 25){
        pewSound.play()
        pewSound.setVolume(0.2)
        shootLaser()
        timerThing.x = 0
    }
    if(laserG.isTouching(alien1G)){
        boomSound.play()
        boomSound.setVolume(0.05)
        alien1G.destroyEach();
        score = score + 1
        laserG[0].destroy()
        laserG.shift()
        //console.log("alien1 problem")
    }
    
    if(laserG.isTouching(alien2G)){
        boomSound.play()
        boomSound.setVolume(0.05)
        alien2G.destroyEach();
        score = score + 1
        laserG[0].destroy()
        laserG.shift()
        //console.log("alien 2 problem")
    }
    if(laserG.isTouching(alien3G)){
        boomSound.play()
        boomSound.setVolume(0.05)
        alien3G.destroyEach();
        score = score + 1
        laserG[0].destroy()
        laserG.shift()
        //console.log("alien 3 problem")
    }
    if(laserG.isTouching(alien4G)){
        boomSound.play()
        boomSound.setVolume(0.05)
        alien4G.destroyEach();
        score = score + 1
        laserG[0].destroy()
        laserG.shift()
    }
    if(laserG.isTouching(alien5G)){
        boomSound.play()
        boomSound.setVolume(0.05)
        alien5G.destroyEach();
        score = score + 1
        laserG[0].destroy()
        laserG.shift()
    }
    if(laserG.isTouching(mothership)){
        mothershipHP -= 1
        score = score + 1
        laserG[0].destroy()
        laserG.shift()
        console.log(mothershipHP)
    }
    if(endobject.isTouching(alien1G) && frameCount % 5 ==0){
        
        lives -=1
    }
    
    if(endobject.isTouching(alien2G) && frameCount % 5 ==0){
        
        lives -= 1
    }
    if(endobject.isTouching(alien3G) && frameCount % 5 ==0){
        
        lives -= 1
    }
    if(spaceship.isTouching(greenlaserG)){
        
        lives  -= 1
    }
    if(lives <= 0){
        mothership.destroy()
        gamestate = "end"
    }

    shootAlienLaser();
    spawnAlienSquad();

    if(mothershipHP <= 0){
        gamestate = "win"
        winthing.visible = true

    }
}
if(gamestate == "win"){
    if(frameCount % 10 == 0){
        boomSound.play()
        boomSound.setVolume(0.01)
        var explosion = createSprite(Math.round(random(mothership.x - 150, mothership.x + 150)), Math.round(random(mothership.y - 50, mothership.y + 50)))
        explosion.addImage(explosionImg)
        explosion.scale = 0.1
        explosion.lifetime = 15
    }
    laserG.setVelocityYEach(0)
    alien1G.destroyEach()
    alien2G.destroyEach()
    alien3G.destroyEach()
    if(keyDown("DOWN_ARROW")){
        reset2()
    }

}
if(gamestate == "end"){
    planet.velocityY = 0
    laserG.setVelocityYEach(0)
    gameOver.visible = true
if(keyDown("DOWN_ARROW"))
    reset();
}

drawSprites();
}

function shootLaser(){
var laser = createSprite(spaceship.x,500,20,20)
laser.addImage(laserIMG)
laser.scale = 0.1
laser.velocityY = -20
laser.lifetime = 30
laserG.push(laser)
}

function spawnAlien1(){
if(frameCount % 95 === 0){
    alien1 = createSprite(Math.round(random(75,325)),0,20,20)
    alien1.addImage(alienIMG)
    alien1.scale = 0.03
    alien1.velocityY = 6
    alien1G.add(alien1);

}
if(gamestate == "end"){
    alien1.velocityY = 0
}
}
function spawnAlien2(){
    if(frameCount % 106 === 0){
        alien2 = createSprite(Math.round(random(75,325)),0,20,20)
        alien2.addImage(alienIMG)
        alien2.scale = 0.03
        alien2.velocityY = 6
        alien2G.add(alien2);
    }
    if(gamestate == "end"){
        alien2.velocityY = 0
    }
}
function spawnAlien3(){
    if(frameCount % 117 === 0){
        alien3 = createSprite(Math.round(random(75,325)),0,20,20)
        alien3.addImage(alienIMG)
        alien3.scale = 0.03
        alien3.velocityY = 6
        alien3G.add(alien3);
    }
    if(gamestate == "end"){
        alien3.velocityY = 0
    }
}
function spawnAlien4(){
    if(frameCount % 138 === 0){
        alien4 = createSprite(Math.round(random(75,325)),0,20,20)
        alien4.addImage(alienIMG)
        alien4.scale = 0.03
        alien4.velocityY = 6
        alien4G.add(alien4);
    }
    if(gamestate == "end"){
        alien4.velocityY = 0
    }
}

function spawnAlien5(){
    if(frameCount % 159 === 0){
        alien5 = createSprite(Math.round(random(75,325)),0,20,20)
        alien5.addImage(alienIMG)
        alien5.scale = 0.03
        alien5.velocityY = 6
        alien5G.add(alien5);
    }
    if(gamestate == "end"){
        alien5.velocityY = 0
    }
}
function shootAlienLaser(){
    if(frameCount % 40 === 0){
    greenlaser = createSprite(Math.round(random(spaceship.x- 50, spaceship.x + 50)),mothership.y,20,20)
    greenlaser.addImage(greenlaserImg)
    greenlaser.scale = 0.1
    greenlaser.velocityY = 15
    greenlaser.lifetime = 50
    greenlaserG.add(greenlaser)
    laserSound.play()
    laserSound.setVolume(0.1)
    }
    
}
function spawnAlienSquad(){
    if(frameCount % 100 == 0){
        alien1 = createSprite(Math.round(random(75,325)),0,20,20)
        alien1.addImage(alienIMG)
        alien1.scale = 0.03
        alien1.velocityY = 6
        alien1G.add(alien1)
        alien2 = createSprite(Math.round(random(75,325)),0,20,20)
        alien2.addImage(alienIMG)
        alien2.scale = 0.03
        alien2.velocityY = 6
        alien2G.add(alien2)
        alien3 = createSprite(Math.round(random(75,325)),0,20,20)
        alien3.addImage(alienIMG)
        alien3.scale = 0.03
        alien3.velocityY = 6
        alien3G.add(alien3)
    }
    
}

function win(){
    if(frameCount % 10 == 0){
        var explosion = createSprite(Math.round(random(mothership.x - 150, mothership.x + 150)), Math.round(random(mothership.y - 50, mothership.y + 50)))
        explosion.scale = Math.round(random(0.1, 0.5))
        explosion.lifetime = 15
    }
}

function reset(){
    for(var i = 0; i <= laserG.length; i++){
        laserG.pop()
    }
    lives = 3
    highscore = highscore
    score = 0
    gamestate = "play"
    mothershipHP = 80
    planet.x = 200
    planet.y = 800
    planet.velocityY = 0.8
    alien1G.destroyEach();
    alien2G.destroyEach();
    alien3G.destroyEach();
    alien4G.destroyEach();
    alien5G.destroyEach();
    gameOver.visible = false
}
function reset2(){
    for(var i = 0; i <= laserG.length; i++){
        laserG.pop()
    }
    lives = 3
    highscore = highscore
    score = 0
    gamestate = "play"
    mothershipHP = 80
    planet.x = 200
    planet.y = 800
    planet.velocityY = 0.8
    alien1G.destroyEach();
    alien2G.destroyEach();
    alien3G.destroyEach();
    alien4G.destroyEach();
    alien5G.destroyEach();
    winthing.visible = false
    mothership.destroy()
}
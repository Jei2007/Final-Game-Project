var pcImg, pc
var road1Img, road1
var road2Img, road2
var car1Img, car1
var car2Img, car2
var car1Grp, car2Grp

var train1Img, train1
var train2Img, train2
var trainImg, train
var traiNImg, traiN
var trainGrp, traiNGrp

var speed = 2
var speed2 = -2

var finishImg, finish

var gameState = "LOAD"


function preload() {
    pcImg = loadImage("PC.png")
    road1Img = loadImage("road.png")
    road2Img = loadImage("road.png")

    train1Img = loadImage("train1.png")
    train2Img = loadImage("train1.png")

    car1Img = loadImage("car.png")
    car2Img = loadImage("car.png")

    trainImg = loadImage("train.png")
    traiNImg = loadImage("train.png")

    finishImg = loadImage("finish.png")

    car1Grp = new Group()
    car2Grp = new Group()
    trainGrp = new Group()
    traiNGrp = new Group()
}

function setup() {
    createCanvas(displayWidth,displayHeight)
    
    pc = createSprite(displayWidth/2,20)
    pc.addImage(pcImg)
    pc.scale = 0.35
    

    road1 = createSprite(displayWidth/2, 200, displayWidth, 120)
    road1.addImage(road1Img)

    road2 = createSprite(displayWidth/2, 500, displayWidth, 120)
    road2.addImage(road2Img)

    train1 = createSprite(displayWidth/2, 350, displayWidth, 120)
    train1.addImage(train1Img)
    train1.scale = 1.2

    train2 = createSprite(displayWidth/2, 650, displayWidth, 120)
    train2.addImage(train2Img)
    train2.scale = 1.2

    finish = createSprite(displayWidth/2, 815, displayWidth, 120)
    finish.addImage(finishImg)
    finish.depth = -10

    pc.depth = road1.depth + 10
    road1.depth = road2.depth + 1
    road2.depth = train1.depth + 1
    train1.depth = train2.depth + 1
    train2.depth = finish.depth + 1

}

function draw() {
    background("lightBlue")

    if(gameState === "LOAD") {
        textSize(20)
        text("LOADING...", displayWidth/2, displayHeight/2)
        gameState = "PLAY"
    } else if (gameState === "PLAY") {
        if(keyIsDown(DOWN_ARROW)) {
            pc.y = pc.y + speed
        }
        if(keyIsDown(UP_ARROW)) {
            pc.y = pc.y + speed2
        }
        if(pc.y >= 775) {
            pc.y = 100
        }
        if(pc.isTouching(car1Grp) || pc.isTouching(car2Grp) || pc.isTouching(trainGrp) || pc.isTouching(traiNGrp)) {
            pc.y = 100
        }
        spawnTrain()
        spawnCar()
    }

    
    

    

    drawSprites()
}

function spawnCar() {
    if(frameCount % 150 === 0) {
        car1 = createSprite(40,200,50,75)
        car1.addImage(car1Img)
        car1.scale = 0.5
        car1.velocityX = 5
        car1Grp.add(car1)

        car2 = createSprite(40,500,50,75)
        car2.addImage(car2Img)
        car2.scale = 0.5
        car2.velocityX = 5
        car2Grp.add(car2)
        car2Grp.rotate = -180

        // car1.lifetime = 500
    }
}

function spawnTrain() {
    if(frameCount % 250 === 0) {
        train = createSprite(displayWidth,350,50,75)
        train.addImage(trainImg)
        train.scale = 0.8
        train.velocityX = -3
        train.depth = train1.depth + 2
        trainGrp.add(train)

        traiN = createSprite(displayWidth,650,50,75)
        traiN.addImage(traiNImg)
        traiN.scale = 0.8
        traiN.velocityX = -3
        traiN.depth = train2.depth + 2
        traiNGrp.add(traiN)

        // train.lifetime = 500
    }
}

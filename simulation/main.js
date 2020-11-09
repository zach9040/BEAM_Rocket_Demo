import * as p5 from "/libraries/p5.js"

var rocketX;
var rocketY;
var rocketSize;
var rocketVelocity;
var coneHeight;
var fuseHeight;
var flapsHeight;
var cone;
var fuse;
var flaps;

function preload() {
  backgroundImg = loadImage("./images/space-background.png");
  /*
  cone1Img =
  cone2Img =
  cone3Img =
  fuse1Img =
  fuse2Img =
  fuse3Img =
  flap1Img =
  flap2Img =
  flap3Img =
  */
}

function setup() {
  p5.createCanvas(400, 600);
  p5.frameRate(60);
  gameStarted = false;
}

function draw() {
  p5.background(247, 239, 231);
  p5.image(backgroundImg, 0, 0, 400, 600);
  if(gameStarted == true) {
    p5.drawRocket();
  } else {
    // Start menu
    p5.fill(0);
    // Choose rocket components
  }
}

function drawRocket() {
  p5.fill(204, 200, 52);
  p5.image(cone, rocketX + fuseHeight, rocketY, rocketSize, rocketSize);
  p5.image(fuse, rocketX, rocketY, rocketSize, rocketSize);
  p5.image(flaps, rocketX + flapsHeight, rocketY, rocketSize, rocketSize);
}

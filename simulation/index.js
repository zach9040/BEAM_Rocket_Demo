let grid
let rocket
let isOver = false
let isFall = false
let launchHeight = 0
let rocketType = ""
let score = 0
let airtime = 0
let rising
let falling
let fallTimer
let airTimer
let cone
let body
let fins
let coneWeights = new Map()
let bodyWeights = new Map()
let finsWeights = new Map()

const cone_weight = 0.05
const body_weight = 0.05
const fins_weight = 0.025
const base_launch_height = 100

//Set cone weights
coneWeights.set(1, 0)  //Flat cone
coneWeights.set(2, 30) //Pointed cone
coneWeights.set(3, 15) //Rounded cone

//Set body weights
bodyWeights.set(1, 20) //Small body
bodyWeights.set(2, 10) //Medium body
bodyWeights.set(3, 0)  //Large body

//Set fins weights
finsWeights.set(1, 10) //Small fins
finsWeights.set(2, 0)  //Large fins

//Calculate launch height
function calcLaunchHeight(cone, body, fins) {
  let cone_int = coneWeights.get(cone)
  let body_int = bodyWeights.get(body)
  let fins_int = finsWeights.get(fins)
  return (1 + cone_weight * cone_int + body_weight * body_int + fins_weight * fins_int) * base_launch_height
}

//Scroll background when rocket flies up
// var can = document.getElementsByClassName('grid'); 
// var ctx = can.getContext('2d'); 
// can.width = 600; 
// can.height = 600;
// var img = grid.style.backgroundImage; 
// var imgHeight = 0
// var scrollSpeed = 20

// function loop() { 
//   ctx.drawImage(img, 0, imgHeight)
//   ctx.drawImage(img, 0, imgHeight - can.height)
//   imgHeight += scrollSpeed
//   if (imgHeight == can.height) {
//       imgHeight = 0
//   }
//   if (isFall) { 
//     return
//   }
//   window.requestAnimationFrame(loop)
// } 

//Set up default rocket in base position
function createRocket() {
  rocket = document.createElement('div')
  grid.appendChild(rocket)
  rocket.classList.add('rocket')
  changeRocket()
}

//Reset rocket position, score, and airtime
function reset() {
  isOver = false
  isFall = false
  score = 0
  airtime = 0
  clearInterval(airTimer)
  clearInterval(rising)
  clearInterval(falling)
  let scoreHTML = document.getElementById("score")
  scoreHTML.innerText = "Height: " + score + " m | Flight time: " + airtime + " s"
  rocket.remove()
  createRocket()
}

//This will be the start function
function launch() {
  launchHeight = calcLaunchHeight(cone, body, fins)
  rocket.style.transition = "transform 1s"
  rocket.style.transform = "translateY(-65%)"
  rising = setInterval(rise, 100)
  // loop()
  airTimer = setInterval(timer, 1000)
}

//Rise for 1 tick until launchHeight is reached
function rise() {
    let scoreHTML = document.getElementById("score")
    score += 5
    scoreHTML.innerText = "Height: " + score + " m | Flight time: " + airtime + " s"
    if (score > launchHeight) {
      isFall = true
      clearInterval(rising)
      clearInterval(airTimer)
      startFall()
    }
}

//Start falling
function startFall() {
  rocket.style.transition = "transform 1s"
  rocket.style.transform = "rotate(-40deg)"
  console.log(score)
  fallTimer = score
  falling = setInterval(fall, 100)
}

//Fall for 1 tick until ground is reached
function fall() {
  fall -= 5
  if (fallTimer <= 0) {
    clearInterval(falling)
    gameOver()
  }
}

//Times airtime in seconds
function timer() {
  airtime += 1
}

//Draw rocket with default params
function start() {
  createRocket()
}

//What happens when rocket is done with animation and reaches launch height
function gameOver() {
  isOver = true
  while (grid.firstChild) {
    console.log('remove')
    grid.removeChild(grid.firstChild)
  }
  grid.innerHTML = score
  score = 0
  //Need to reset stuff
}

//Change rocket functions for buttons
function changeCone(c) {
  cone = c
  changeRocket()
}

function changeBody(b) {
  body = b
  changeRocket()
}

function changeFins(f) {
  fins = f
  changeRocket()
}

//Change rocket based on params
function changeRocket() {
  rocketType = cone.toString() + body.toString() + fins.toString()
  let url = "./simulation/Rockets/rocket_" + rocketType + ".png"
  rocket.style.backgroundImage = "url(" + url + ")"
}

document.addEventListener('DOMContentLoaded', () => {
  grid = document.querySelector('.grid')
  isOver = false
  launchHeight = 0
  score = 0
  airtime = 0
  cone = 1
  body = 1
  fins = 1
  start()
})


  
/*
Simulation for BEAM Fall 2020 Site Project. Made by BBWRBBCTHSCSCCLST (Ishan Gurnani, Zachary Huang, Parker Lum, and Jacob Yim)

Simulates a rocket launch with interchangable parts. Rocket height varies depending on choice of parts.
*/

let grid
let rocket
let launched = false
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
const base_launch_height = 150

//Set cone weights
coneWeights.set(1, 0)  //Flat cone
coneWeights.set(2, 40) //Pointed cone
coneWeights.set(3, 20) //Rounded cone

//Set body weights
bodyWeights.set(1, 20) //Small body
bodyWeights.set(2, 10) //Medium body
bodyWeights.set(3, 0)  //Large body

//Set fins weights
finsWeights.set(1, 15) //Small fins
finsWeights.set(2, 0)  //Large fins

//Calculate launch height
function calcLaunchHeight(cone, body, fins) {
  let cone_int = coneWeights.get(cone)
  let body_int = bodyWeights.get(body)
  let fins_int = finsWeights.get(fins)
  return (1 + cone_weight * cone_int + body_weight * body_int + fins_weight * fins_int) * base_launch_height
}

//Set up default rocket in base position
function createRocket() {
  rocket = document.createElement('div')
  grid.appendChild(rocket)
  rocket.classList.add('rocket')
  changeRocket()
}

//Reset rocket position, score, and airtime
function reset() {
  launched = false
  score = 0
  airtime = 0
  clearInterval(airTimer)
  clearInterval(rising)
  clearInterval(falling)
  grid.style.backgroundImage = "url('./images/still_stars.gif')"
  let scoreHTML = document.getElementById("score")
  scoreHTML.innerText = "Height: " + score + " m | Flight time: " + airtime + " s"
  rocket.remove()
  createRocket()
}

//This will be the start function
function launch() {
  if (!launched) {
    launchHeight = calcLaunchHeight(cone, body, fins)
    rocket.style.transition = "transform 1s"
    rocket.style.transform = "translateY(-95%)"
    rising = setInterval(rise, 100)
    grid.style.backgroundImage = "url('./images/moving_stars.gif')"
    airTimer = setInterval(timer, 1000)
    launched = true
  }
}

//Rise for 1 tick until launchHeight is reached
function rise() {
    let scoreHTML = document.getElementById("score")
    score += 5
    scoreHTML.innerText = "Height: " + score + " m | Flight time: " + airtime + " s"
    if (score > launchHeight) {
      clearInterval(rising)
      clearInterval(airTimer)
      stopRise()
    }
}

//Start falling
function stopRise() {
  grid.style.backgroundImage = "url('./images/still_stars.gif')"
  rocket.style.transition = "transform 1s"
  rocket.style.transform = "rotate(-40deg)"
  console.log(score)
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
  launched = false
  while (grid.firstChild) {
    console.log('remove')
    grid.removeChild(grid.firstChild)
  }
  grid.innerHTML = score
  score = 0
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
  let url = "./images/Rockets/rocket_" + rocketType + ".png"
  rocket.style.backgroundImage = "url(" + url + ")"
}

document.addEventListener('DOMContentLoaded', () => {
  grid = document.querySelector('.grid')
  launchHeight = 0
  score = 0
  airtime = 0
  cone = 1
  body = 1
  fins = 1
  start()
})


  
let grid
let rocket
let isOver = false
let launchHeight = 0
let rocketType = ""
let speed = 0
let score = 0
let rising
let falling
let rocketBottomSpace
let cone
let body
let fins
let coneWeights = new Map()
let bodyWeights = new Map()
let finsWeights = new Map()

const gravity = 9.8
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

//Set up default rocket in base position
function createRocket() {
  grid.appendChild(rocket)
  //Change based on default params
  launchHeight = calcLaunchHeight(1, 1, 1)
  rocketType = "111"
  rocket.classList.add('rocket')
  //NEED TO FIX positioning
}

// This will be the start function
function launch() {
  launchHeight = calcLaunchHeight(cone, body, fins)
  rocket.style.transition = "transform 1s"
  rocket.style.transform = "translateY(-65%)"
  rising = setInterval(rise, 100)
}

function rise() {
    // rocketBottomSpace += 5
    // rocket.style.bottom = rocketBottomSpace + 'px'
    score += 5
    launchHeight = 100
    if (score > launchHeight) {
      clearInterval(rising)
      startFall()
    }
}

function startFall() {
  rocket.style.transition = "transform 1s"
  rocket.style.transform = "rotate(-40deg)"
  console.log(score)
  falling = setInterval(fall, 100)
}

function fall() {
  // rocketBottomSpace -= 5
  // rocket.style.bottom = rocketBottomSpace + 'px'
  if (rocketBottomSpace <= 200) {
    clearInterval(falling)
    gameOver()
  }
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
  //Shows launch button again necessary
}
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
  let url = "Rockets/rocket_" + rocketType + ".png"
  rocket.style.backgroundImage = "url(" + url + ")"
}

document.addEventListener('DOMContentLoaded', () => {
  grid = document.querySelector('.grid')
  rocket = document.createElement('div')
  isOver = false
  launchHeight = 0
  speed = 0
  score = 0
  cone = 1
  body = 1
  fins = 1
  start()
})

$(function() {
  $("input[type=image]").click(function(){ $(this).addClass('selected'); });
});

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const rocket = document.createElement('div')
  let isOver = false
  let launchHeight = 0
  let speed = 0
  let score = 0
  //CHANGE THESE TO DEFAULT
  let cone = 1
  let body = 1
  let fins = 1

  const gravity = 9.8
  const cone_weight = 0.05
  const body_weight = 0.05
  const fins_weight = 0.025
  const base_launch_height = 100


  // class Platform {
  //   constructor(newPlatBottom) {
  //     this.left = Math.random() * 315
  //     this.bottom = newPlatBottom
  //     this.visual = document.createElement('div')
  //
  //     const visual = this.visual
  //     visual.classList.add('platform')
  //     visual.style.left = this.left + 'px'
  //     visual.style.bottom = this.bottom + 'px'
  //     grid.appendChild(visual)
  //   }
  // }
  // function createPlatforms() {
  //   for(let i =0; i < platformCount; i++) {
  //     let platGap = 600 / platformCount
  //     let newPlatBottom = 100 + i * platGap
  //     let newPlatform = new Platform (newPlatBottom)
  //     platforms.push(newPlatform)
  //     console.log(platforms)
  //   }
  // }
  function calcLaunchHeight(cone, body, fins) {
    let cone_int = parseInt(cone)
    let body_int = parseInt(body)
    let fins_int = parseInt(fins)
    return (1 + cone_weight * cone_int + body_weight * body_int + fins_weight * fins_int) * base_launch_height
  }

  function createRocket() {
    grid.appendChild(rocket)
    rocket.classList.add('rocket')
    //NEED TO FIX LEFT BOTTOM STYLE LATER
    rocket.style.left = 200 + 'px'
    rocket.style.bottom = 200 + 'px'
  }

  function changeRocket(cone, body, fins) {
    rocketType = cone + body + fins
    launchHeight = calcLaunchHeight(cone, body, fins)
    rocket.style.backgroundImage = url("../images/" + rocketType + '.png')
  }

// function fall() {
//   isJumping = false
//     clearInterval(upTimerId)
//     downTimerId = setInterval(function () {
//       rocketBottomSpace -= 5
//       rocket.style.bottom = rocketBottomSpace + 'px'
//       if (rocketBottomSpace <= 0) {
//         gameOver()
//       }
//       platforms.forEach(platform => {
//         if (
//           (rocketBottomSpace >= platform.bottom) &&
//           (rocketBottomSpace <= (platform.bottom + 15)) &&
//           ((rocketLeftSpace + 60) >= platform.left) &&
//           (rocketLeftSpace <= (platform.left + 85)) &&
//           !isJumping
//           ) {
//             console.log('tick')
//             startPoint = rocketBottomSpace
//             jump()
//             console.log('start', startPoint)
//             isJumping = true
//           }
//       })
//
//     },20)
// }


  // This will be the start function
  function launch() {
    while (score < launchHeight) {
      //Send Rocket Up
      //
      rocketBottomSpace += 5
      rocket.style.bottom = rocketBottomSpace + 'px'
      score += 5
    }
  }

  function start() {
    if (!isOver) {
      createRocket()
    }
  }

  function gameOver() {
    isOver = true
    while (grid.firstChild) {
      console.log('remove')
      grid.removeChild(grid.firstChild)
    }
    grid.innerHTML = score
  }

  start()
})

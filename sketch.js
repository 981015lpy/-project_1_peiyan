let canvasWidth, canvasHeight
// let personPosition = { x: canvasWidth / 2, y: canvasHeight - 100}

function setup() {
  canvasWidth = document.body.offsetWidth
  canvasHeight = document.body.offsetHeight
  
  createCanvas(canvasWidth, canvasHeight)
}

function draw() {
  background(210);

  // create the sun
  sun(400, 250, 150)

  // create the mountain group
  mountain(600, 5, 20)

  // create the black ground
  ground({ x: 0, y: canvasHeight - 50 }, canvasWidth, 50)

  // create human
  person({ x: canvasWidth / 2, y: canvasHeight - 100})
}

/**
 * @name: Create the moving mountain by using p5.noise
 * @param {Number} mountainHeight mountain height
 * @param {Number} mountainNum how many mountains to display
 * @param {Number} moveSpeed the mountain moving speed
 * @return {*}
 */
function mountain(mountainHeight, mountainNum, moveSpeed) {
  let noiseScale = 0.01
  let t = millis() / 1000
  
  push()
  for (let k = 0; k < mountainNum; k++) {
    for (let x = 0.5; x < canvasWidth; x++){
      let noiseVal = noise((moveSpeed * t + x) * noiseScale + k * 100)
      stroke(200 - 40 * k)
      let mountainstall = canvasHeight - mountainHeight + noiseVal * 160 + 50 * k
      line(x, mountainstall, x, canvasHeight)
    }
  }
  pop()
}

/**
 * @name: create the sun
 * @param {Number} x sun position_x
 * @param {Number} y sun position_y
 * @param {Number} r sun radius
 * @return {*}
 */
function sun(x, y, r) {
  push()
  fill(180)
  stroke(180)
  ellipse(x, y, r)
  pop()
}

/**
 * @name:  create the ground floor
 * @param {JSON.Obejct} startPoint example:{x: 123, y:123}
 * @param {Number} width ground width
 * @param {Number} height ground height
 * @return {*}
 */
function ground(startPoint, width, height) {
  push()
  fill(30)
  stroke(30)
  rect(startPoint.x, startPoint.y, width, height)
  pop()
}

/**
 * @name: create the walking human
 * @param {*} position example:{x: 123, y:123}
 * @return {*}
 */
function person(position) {
  push()

  let t = millis() / 1000
  // let t = 1
  let speed = 2
  
  let headPosition = { x: position.x, y: position.y - 20 }

  let body = {
    startPoint: { x: position.x, y: position.y - 20 },
    endPoint: { x: headPosition.x, y: headPosition.y + 50}
  }
  let arm_front = {
    startPoint: { x: position.x, y: position.y + 10 },
    endPoint: { x: position.x  + 30 * Math.sin( -speed * t), y: position.y + 25 }
  }
  let arm_back = {
    startPoint: { x: position.x, y: position.y + 10 },
    endPoint: { x: position.x - 30 * Math.sin( -speed * t), y: position.y + 25 }
  }

  let leg_front_1 = {
    startPoint: { x: position.x, y: position.y + 20 + 10 },
    endPoint: { x: position.x + 10 * Math.sin( -speed * t), y: position.y + 20 + 25 }
  }
  let leg_front_2 = {
    startPoint: { x: leg_front_1.endPoint.x, y: leg_front_1.endPoint.y },
    endPoint: { x: leg_front_1.endPoint.x - 10, y: leg_front_1.endPoint.y + 20 + Math.sin( speed * t) }
  }

  let leg_back_1 = {
    startPoint: { x: position.x, y: position.y + 20 + 10 },
    endPoint: { x: position.x + 5 + 20 * Math.sin( speed * t), y: position.y + 45 }
  }

  let leg_back_2 = {
    startPoint: { x: leg_back_1.endPoint.x, y: leg_back_1.endPoint.y },
    endPoint: { x: leg_back_1.endPoint.x - 5 + 20 * Math.sin( speed * t) , y: leg_front_1.endPoint.y + 20 }
  }

  // create front arm
  createLine(arm_front, 140, 5)

  // create front leg
  createLine(leg_front_1, 140, 5)
  createLine(leg_front_2, 140, 5)

  // create body
  createLine(body, 140, 10)
  
  // create head
  fill(140)
  // strokeWeight(2)
  ellipse(headPosition.x, headPosition.y, 30) // head

  // create back arm
  createLine(arm_back, 140, 5)

  // create back leg
  createLine(leg_back_1, 140, 5)
  createLine(leg_back_2, 140, 5)


  pop()

  function createLine(lineObj, color, weight) {
    strokeWeight(weight)
    stroke(color)
    line(lineObj.startPoint.x, lineObj.startPoint.y, lineObj.endPoint.x, lineObj.endPoint.y)
  }
}


let canvasWidth, canvasHeight
let stepCount = 1
let maxStep = 6

let sunStartPosition = { x: 300, y: 350 }

let cloudArray = []

let rainArr = []

function setup() {
  canvasWidth = document.body.offsetWidth
  canvasHeight = document.body.offsetHeight
  cloudArray = [
    { point: {x: canvasWidth + 300, y: 150}, r: 70 },
    { point: {x: canvasWidth + 500, y: 200}, r: 60 },
    { point: {x: canvasWidth + 80, y: 200}, r: 65 },
    { point: {x: canvasWidth + 100, y: 100}, r: 65 },
    { point: {x: canvasWidth + 400, y: 50}, r: 65 },
    { point: {x: canvasWidth + 600, y: 220}, r: 60 },
  ]

  rainArr = [
    { x: canvasWidth + 700, y: 400 },
    { x: canvasWidth + 670, y: 430 },
    { x: canvasWidth + 670, y: 530 },
    { x: canvasWidth + 470, y: 1000 },
    { x: canvasWidth + 380, y: 500 },
    { x: canvasWidth + 370, y: 600 },
    { x: canvasWidth + 180, y: 410 },
    { x: canvasWidth + 500, y: 400 },
    { x: canvasWidth + 450, y: 410 },
    { x: canvasWidth + 520, y: 510 },
    { x: canvasWidth + 580, y: 310 },
    { x: canvasWidth + 390, y: 380 },
    { x: canvasWidth + 600, y: 700 },
    { x: canvasWidth + 570, y: 660 },
    { x: canvasWidth + 450, y: 680 },
    { x: canvasWidth + 120, y: 480 },
    { x: canvasWidth + 50, y: 380 },
    { x: canvasWidth + 50, y: 350 },
    { x: canvasWidth + 20, y: 400 },
    { x: canvasWidth + 180, y: 550 },
  ]
  
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  let t = millis() / 1000;

  background(abs(255 - 20 * t))

  if (stepCount === maxStep) stepCount = 1

  // create the sun
  if (stepCount === 2) sun(sunStartPosition, 150)

  // create the mountain group
  mountain(600, 5, 14)

  // create the black ground
  ground({ x: 0, y: canvasHeight - 30 }, canvasWidth, 50)

  // create human
  person({ x: canvasWidth / 2, y: canvasHeight - 100 })
  
  // create cloud
  if (stepCount === 3) rainingCloud(cloudArray, rainArr, 5)
}

/**
 * @name: Create the moving mountain by using noise
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
function sun(startPoint, r) {
  push()
  fill(180)
  stroke(180)

  ellipse(startPoint.x, startPoint.y, r)

  let t = millis() / 1000
  let positionX = startPoint.x + 2000 * t
  let targetPoint = { x: positionX, y: startPoint.y + 500 * sin(-0.3 * t) }
  if (positionX < 35000) movement(startPoint, targetPoint, 1)
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
    endPoint: { x: position.x  + 30 * Math.sin( -speed * t), y: position.y + 25 - 2 * Math.sin( -speed * t) }
  }
  let arm_back = {
    startPoint: { x: position.x, y: position.y + 10 },
    endPoint: { x: position.x - 30 * Math.sin( -speed * t), y: position.y + 25 + 2 * Math.sin( -speed * t) }
  }

  let leg_front_1 = {
    startPoint: { x: position.x, y: position.y + 20 + 10 },
    endPoint: { x: position.x + 5 + 15 * Math.sin( -speed * t), y: position.y + 20 + 25 }
  }
  let leg_front_2 = {
    startPoint: { x: leg_front_1.endPoint.x, y: leg_front_1.endPoint.y },
    endPoint: { x: leg_front_1.endPoint.x - 15 * Math.sin( speed * t), y: leg_front_1.endPoint.y + 20 + Math.sin( speed * t) }
  }

  let leg_back_1 = {
    startPoint: { x: position.x, y: position.y + 20 + 10 },
    endPoint: { x: position.x + 5 + 10 * Math.sin( speed * t), y: position.y + 45 }
  }

  let leg_back_2 = {
    startPoint: { x: leg_back_1.endPoint.x, y: leg_back_1.endPoint.y },
    endPoint: { x: leg_back_1.endPoint.x + 15 * Math.sin( speed * t) , y: leg_front_1.endPoint.y + 20 }
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

function rainingCloud(cloudArray, rainArr, speed) {
  push()
  cloudArray.map(item => {
    cloud(item.point, item.r, speed)
    return null
  })
  rainArr.map(item => {
    raining(item, speed)
    return null
  })
  pop()
}

function cloud(cloud, radius, speed) {
  push()
  fill('#acacac')
  stroke('#acacac')
  ellipse(cloud.x, cloud.y, radius)
  ellipse(cloud.x - 40, cloud.y, radius - 15)
  ellipse(cloud.x + 40, cloud.y, radius - 15)
  ellipse(cloud.x - 70, cloud.y, radius - 35)
  ellipse(cloud.x + 70, cloud.y, radius - 35)

  let t = millis() / 1000
  let targetPoint = { x: cloud.x - t, y: cloud.y}
  movement(cloud, targetPoint, speed)
  pop()
}

function raining(startPoint, speed) {
  push()
  stroke('#acacac')
  line(startPoint.x, startPoint.y, getRainEndPoint(startPoint, 40).x, getRainEndPoint(startPoint, 40).y)
  let t = millis() / 1000
  let targetPoint = { x: startPoint.x - t, y: startPoint.y}
  movement(startPoint, targetPoint, speed)
  pop()
  function getRainEndPoint(point, length) {
    return {x: point.x + length ?? 100, y: point.y + length ?? 100}
  }
}


function movement (startPoint, targetPoint, speed) {
  if (startPoint.x > targetPoint.x) startPoint.x -= speed
  if (startPoint.x < targetPoint.x) startPoint.x += speed
  if (startPoint.y < targetPoint.y) startPoint.y += speed
  if (startPoint.y > targetPoint.y) startPoint.y -= speed
  translate(startPoint.x,startPoint.y)
}

function mouseClicked(){
  stepCount ++
}




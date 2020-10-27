let canvasWidth, canvasHeight
let stepCount = 0
let maxStep = 5
let sunDisplay = 1

ground_color = 60
background_color = 210
ground_height = 10

let sunStartPosition = { x: 300, y: 350 }
let sunColor = 180

let cloudArray = []
let rainArr = []
let snowflakes = []
let birds = []

let person_speed = 4
let mountain_speed = 70

function setup() {
  canvasWidth = document.body.offsetWidth
  canvasHeight = document.body.offsetHeight
  cloudArray = [
    { point: {x: canvasWidth + 300, y: 150}, r: 70 },
    { point: {x: canvasWidth + 500, y: 200}, r: 60 },
    { point: {x: canvasWidth, y: 200}, r: 65 },
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

  birds = [
    { x: canvasWidth + 300, y: 150 },
    { x: canvasWidth + 500, y: 200 },
    {x: canvasWidth + 100, y: 200},
    {x: canvasWidth + 100, y: 100},
    {x: canvasWidth + 400, y: 50}
  ]

  person_speed = 7

  createCanvas(canvasWidth, canvasHeight);
  
}

function draw() {
  console.log(stepCount, person_speed)

  let t = millis() / 1000;

  background(230 - 200 * sin(t / 2))

  if (stepCount > maxStep) stepCount = 1

  if (stepCount === 1) {
    // reset the var
    if (ground_height > 10) ground_height = ground_height - 0.01 * t
    else ground_height = 10

    if (ground_color > 60) ground_color = ground_color - 0.1 * t
    else ground_color = 60

    person_speed = 4
    sunStartPosition = { x: 300, y: 350 }
    cloudArray = [
      { point: {x: canvasWidth + 300, y: 150}, r: 70 },
      { point: {x: canvasWidth + 500, y: 200}, r: 60 },
      { point: {x: canvasWidth, y: 200}, r: 65 },
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

    birdsGroup(birds, 8)
  }

  // create the sun
  if (stepCount === 2) {
    ground_height = 10
    person_speed = 7
    // reset the birds position
    birds = [
      {x: canvasWidth + 300, y: 150 },
      {x: canvasWidth + 500, y: 200 },
      {x: canvasWidth, y: 200},
      {x: canvasWidth + 100, y: 100},
      {x: canvasWidth + 400, y: 50}
    ]

    sun(sunStartPosition, 150, sunColor)

    if (sunDisplay % 2 === 0) sunColor = 180
    else sunColor = '#8B0000dd'
  }

  // create the mountain group
  mountain(600, 5, mountain_speed)

  // create the black ground
  ground({ x: 0, y: canvasHeight - 30 }, canvasWidth, ground_height, ground_color)

  // create human
  person({ x: canvasWidth / 2, y: canvasHeight - 100 }, person_speed)
  
  // create cloud
  if (stepCount === 3) {
    person_speed = 3
    rainingCloud(cloudArray, rainArr, 6)
  }

  // start snowing
  if (stepCount === 4 || stepCount === 5) {
    snow()

    if (stepCount === 4) person_speed = 2
    if (stepCount === 5) {
      if (ground_height < 30) ground_height = ground_height + 0.01 * t
      else ground_height = 30
      ground_color = ground_color + 0.1 * t
      person_speed = 1
    }
  }

  if (stepCount === 6) {
    person_speed = 7
    
  }

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
function sun(startPoint, r, color) {
  push()
  fill(color)
  stroke(color)

  ellipse(startPoint.x, startPoint.y, r)

  let t = millis() / 1000

  let positionX = startPoint.x + 2000 * t
  let targetPoint = {}

  targetPoint = { x: positionX, y: startPoint.y - 1000 * t }

  if (startPoint.x < 800)
    movement(startPoint, targetPoint, 1)
  
  pop()
}

/**
 * @name:  create the ground floor
 * @param {JSON.Obejct} startPoint example:{x: 123, y:123}
 * @param {Number} width ground width
 * @param {Number} height ground height
 * @return {*}
 */
function ground(startPoint, width, height, color) {
  push()
  if (stepCount === 4 || stepCount === 5) {
    let t = millis() / 1000
    fill(color)
  }
  else {
    fill(color)
  }
  stroke(30)
  rect(startPoint.x, startPoint.y - height, width, startPoint.y+height)
  pop()
}

/**
 * @name: create the walking human
 * @param {*} position example:{x: 123, y:123}
 * @return {*}
 */
function person(position, speed) {
  push()

  let t = millis() / 1000
  
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

/**
 * @name: create the clouds and rain
 * @param {Array} cloudArray cloud array, includes position and radius
 * @param {Array} rainArr rain line position array
 * @param {Number} speed
 * @return {*}
 */
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
  cloudArray.map(item => {
    movement(item.point, {x: item.point.x - speed * 10, y: item.point.y}, speed)
    return null
  })
  rainArr.map(item => {
    movement(item, {x: item.x - speed * 10, y: item.y}, speed)
    return null
  })
  pop()
}

/**
 * @name: create one cloud
 * @param {Object} cloud cloud center position
 * @param {Number} radius cloud center circle radius
 * @return {*}
 */
function cloud(cloud, radius) {
  push()
  fill('#acacac')
  stroke('#acacac')
  ellipse(cloud.x, cloud.y, radius)
  ellipse(cloud.x - 40, cloud.y, radius - 15)
  ellipse(cloud.x + 40, cloud.y, radius - 15)
  ellipse(cloud.x - 70, cloud.y, radius - 35)
  ellipse(cloud.x + 70, cloud.y, radius - 35)

  // let t = millis() / 1000
  // let targetPoint = { x: cloud.x - t, y: cloud.y}
  // movement(cloud, targetPoint, speed)
  pop()
}

/**
 * @name: create rain line
 * @param {Object} startPoint rain line start point
 * @return {*}
 */
function raining(startPoint) {
  push()
  stroke('#acacac')
  line(startPoint.x, startPoint.y, getRainEndPoint(startPoint, 40).x, getRainEndPoint(startPoint, 40).y)
  pop()

  function getRainEndPoint(point, length) {
    return {x: point.x + length ?? 100, y: point.y + length ?? 100}
  }
}

/**
 * @name: snowing
 */
function snow() {
  let t = frameCount / 60
  for (let i = 0; i < Math.random(5); i++) {
    snowflakes.push(new snowflake())
    t
  }
  for (let flake of snowflakes) {
    flake.update(t)
    flake.display(t)
  }
}

/**
 * @name: create snow flake
 * @param {*}
 * @return {*}
 */
function snowflake() {
	//initiating coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);
  
  this.radius = sqrt(random(pow(width / 2, 2)));
  this.update = function(time) {
		//x position follows a circle
    let w = 0.8; // angular speed
    let angle = w * time + this.initialangle;//updated angle, change over time
    this.posX = width / 2 + this.radius * sin(angle); //

		 // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5); //square root

		// delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };
  this.display = function() {
    fill(255);
    stroke(255);
    ellipse(this.posX, this.posY, this.size);
  };
}

function birdsGroup(birds, speed) {
  push()
  birds.map(item => {
    bird(item)
    return null
  })
  birds.map(item => {
    movement(item, {x: item.x - speed * 10, y: item.y}, speed)
    return null
  })
  pop()

}

function bird(position) {
  stroke(200)
  fill(200)

  ellipse(position.x, position.y, 30)

  let size_mouse = 10
  let point1_mouse = { x: position.x - 2.5 * size_mouse, y: position.y }
  let point2_mouse = { x: point1_mouse.x + 2 * size_mouse, y: point1_mouse.y - size_mouse / 2 }
  let point3_mouse = { x: point1_mouse.x + 2 * size_mouse, y: point1_mouse.y + size_mouse / 2 }
  createTriangle(point1_mouse, point2_mouse, point3_mouse)

  let size_wing = 30
  let point1_wing = position
  let point2_wing = { x: point1_wing.x + size_wing, y: point1_wing.y + size_wing }
  let point3_wing = { x: point1_wing.x + size_wing, y: point1_wing.y - size_wing }
  createTriangle(point1_wing, point2_wing, point3_wing)

  let size_tail = size_wing - 10
  let point1_tail = { x: point3_wing.x - 5, y: position.y }
  let point2_tail = { x: point1_tail.x + size_tail, y: point1_tail.y + size_tail }
  let point3_tail = { x: point1_tail.x + size_tail, y: point1_tail.y - size_tail }
  createTriangle(point1_tail, point2_tail, point3_tail)
  
  
  function createTriangle(point1, point2, point3) {
    triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y)
  }
}

/**
 * @name: move the object
 * @param {Object} startPoint
 * @param {Object} targetPoint
 * @param {Number} speed
 * @return {*}
 */
function movement (startPoint, targetPoint, speed) {
  if (startPoint.x > targetPoint.x) startPoint.x -= speed
  if (startPoint.x < targetPoint.x) startPoint.x += speed
  if (startPoint.y < targetPoint.y) startPoint.y += speed
  if (startPoint.y > targetPoint.y) startPoint.y -= speed
  translate(startPoint.x,startPoint.y)
}

/**
 * @name: mouse click
 */
function mouseClicked(){
  stepCount++
  if (stepCount === 2) {
    sunDisplay++ 
  }
}




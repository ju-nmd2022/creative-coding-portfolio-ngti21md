//Based on the flow field code in the lecture

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  cols = floor(width / fieldSize);
  rows = floor(height / fieldSize);

  flowfield = generateField(); // generate flow field
  generateAgents(); // generate agents
}

let agents = [];
let flowfield;
const fieldSize = 50; 
const divider = 4;  
let cols; 
let rows;

function generateField() {
  let field = [];
  noiseSeed(Math.random() * 100);
  for (let x = 0; x < cols; x++) {
    field.push([]);
    for (let y = 0; y < rows; y++) {
      const value = noise(x / divider, y / divider) * Math.PI * 2; // create direction 
      field[x].push(p5.Vector.fromAngle(value)); // create vector
    }
  }
  return field;
}

function generateAgents() {
  for (let i = 0; i < 200; i++) {
    let agent = new Agent(
      random(width),
      random(height),
      6, // max speed
      0.8 // max force
    );
    agents.push(agent);
  }
}

function draw() {
  for (let agent of agents) {
    let x = floor(agent.position.x / fieldSize);
    let y = floor(agent.position.y / fieldSize);

    // ensure x and y are within flowfield 
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      const desiredDirection = flowfield[x][y]; // only access right positions
      agent.follow(desiredDirection);
    }

    agent.update();
    agent.checkBorders();
    agent.draw();
  }
}

class Agent {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.lastPosition = this.position.copy();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = width;
      this.lastPosition.x = width;
    } else if (this.position.x > width) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = height;
      this.lastPosition.y = height;
    } else if (this.position.y > height) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }

  draw() {
    push();
    stroke(0, 0, 0, 60);
    strokeWeight(1);
    line(this.lastPosition.x, this.lastPosition.y, this.position.x, this.position.y);
    pop();
  }
}

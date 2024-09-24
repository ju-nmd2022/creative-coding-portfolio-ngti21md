// Tutorial: https://generativeartistry.com/tutorials/circle-packing/

function setup() {
  createCanvas(windowWidth, windowHeight); 
  noLoop(); 
  stroke(0);
  strokeWeight(3); 

  for (let i = 0; i < totalCircles; i++) {
    createAndDrawCircle();
  }
}

let circles = [];
const minRadius = 2;
const maxRadius = 100;
const totalCircles = 500;
const createCircleAttempts = 500; 

function createAndDrawCircle() {
  let newCircle;
  let circleSafeToDraw = false;

  for (let tries = 0; tries < createCircleAttempts; tries++) {
    newCircle = {
      x: random(width),  
      y: random(height), 
      radius: minRadius  
    };

    if (!doesCircleHaveACollision(newCircle)) {
      circleSafeToDraw = true;
      break;
    }
  }

  if (!circleSafeToDraw) {
    return;
  }

  while (newCircle.radius < maxRadius) {
    newCircle.radius++;
    if (doesCircleHaveACollision(newCircle)) {
      newCircle.radius--; 
      break;
    }
  }

  circles.push(newCircle);
  ellipse(newCircle.x, newCircle.y, newCircle.radius * 2);
}

function doesCircleHaveACollision(circle) {
  for (let i = 0; i < circles.length; i++) {
    let otherCircle = circles[i];
    let distance = dist(circle.x, circle.y, otherCircle.x, otherCircle.y);
    
    if (distance < circle.radius + otherCircle.radius) {
      return true;
    }
  }

  if (circle.x + circle.radius >= width ||
      circle.x - circle.radius <= 0 ||
      circle.y + circle.radius >= height ||
      circle.y - circle.radius <= 0) {
    return true;
  }

  return false; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(650, 650); 
  noLoop(); 
  strokeWeight(2); 
  noFill(); 

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

  if (newCircle.radius >= maxRadius * 0.8) { 
    stroke(255, 105, 180); 
  } else if (newCircle.radius >= maxRadius * 0.3) { 
    stroke(0, 255, 255); 
  } else if (newCircle.radius >= maxRadius * 0.2) {
    stroke(144, 238, 144); 
  } else {
    stroke(0); 
  }

  drawSpiral(newCircle.x, newCircle.y, newCircle.radius);
}

function drawSpiral(x, y, radius) {
  noFill();
  beginShape();
  let angle = 0;
  let increment = 0.05;
  let maxAngle = TWO_PI * 5; // spiral's number of turns

  while (angle < maxAngle) {
    let r = map(angle, 0, maxAngle, radius * 0.5, radius); // spiral radius varies
    let dx = r * cos(angle);
    let dy = r * sin(angle);
    vertex(x + dx, y + dy);
    angle += increment;
  }
  endShape();
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

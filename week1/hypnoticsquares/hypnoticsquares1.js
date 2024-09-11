function setup() {
  createCanvas(650, 650);
  noLoop();
}

const finalSize = 3;
const offset = 20;
const steps = 6; 
let tileStep, startSize;

function draw() {
  background(255); 
  stroke(0); 
  strokeWeight(1); 


  tileStep = (width - offset * 2) / 10; 
  startSize = tileStep;

  for (let x = offset; x < width - offset; x += tileStep) {
    for (let y = offset; y < height - offset; y += tileStep) {
      drawConcentricSquares(x, y, startSize, steps);
    }
  }
}

function drawConcentricSquares(x, y, size, steps) {
  for (let i = 0; i < steps; i++) {
    let newSize = size * (steps - i) / steps; 
    let posX = x + (size - newSize) / 2; 
    let posY = y + (size - newSize) / 2; 
    rect(posX, posY, newSize, newSize); 
  }
}

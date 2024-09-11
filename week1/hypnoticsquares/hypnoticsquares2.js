function setup() {
  createCanvas(windowWidth, windowHeight); 
  noLoop();
}

let finalSize = 3;
let startSteps;
let offset = 2;
let tileStep;
let startSize;
const directions = [-1, 0, 1];
const colorPalettes = [
    ['#FFC1E3', '#FF007F', '#FF85A1', '#E0115F'],
    ['#D8B2FF', '#BA55D3', '#9B30FF', '#B57EDC'],
    ['#00FF7F', '#3CB371', '#00FA9A', '#2E8B57'],
    ['#00FFFF', '#4682B4', '#1E90FF', '#00BFFF']  
];

function draw() {
  background(255); 
  stroke(0); 
  strokeWeight(2);  
  
  tileStep = (width - offset * 2) / 7; 
  startSize = tileStep; 

  for (let x = offset; x < width - offset; x += tileStep) {
    for (let y = offset; y < height - offset; y += tileStep) {
      startSteps = 2 + Math.ceil(Math.random() * 3); 
      let xDirection = random(directions); 
      let yDirection = random(directions); 
      
      if (random() < 0.8) {  
        let palette = random(colorPalettes);
        fill(random(palette));
      } else {
        noFill(); 
      }
      
      drawRecursiveSquare(x, y, startSize, startSize, xDirection, yDirection, startSteps - 1);
    }
  }
}

function drawRecursiveSquare(x, y, width, height, xMovement, yMovement, steps) {
  rect(x, y, width, height); 
  
  if (steps >= 0) {
    let newSize = (startSize) * (steps / startSteps) + finalSize; 
    let newX = x + (width - newSize) / 2;
    let newY = y + (height - newSize) / 2;
    
    newX = newX - ((x - newX) / (steps + 2)) * xMovement;
    newY = newY - ((y - newY) / (steps + 2)) * yMovement;

    drawRecursiveSquare(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

const squareSize = 30;
const randomDisplacement = 15;
const offset = 10; 

function draw() {
  background(225);
  fill(108, 145, 126);
  stroke(225); 
  strokeWeight(2); 
  for (let i = squareSize; i <= width - squareSize; i += squareSize) {
    for (let j = squareSize; j <= height - squareSize; j += squareSize) {
      
      let plusOrMinus = random() < 0.5 ? -1 : 1;
      let translateAmt = j / width * plusOrMinus * random() * randomDisplacement;

      push();
      translate(i + translateAmt + offset, j + offset);
      rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize); // Draw the square with no rotation
      pop(); 
    }
  }
}

function setup() {
  createCanvas(600, 600);
}

const squareSize = 30;
const randomDisplacement = 15;
const rotateMultiplier = 20;
const offset = 10; 

function draw() {
  background(255);
  stroke(108, 145, 126);

  for (let i = squareSize; i <= width - squareSize; i += squareSize) {
    for (let j = squareSize; j <= height - squareSize; j += squareSize) {
      
      let plusOrMinus = random() < 0.5 ? -1 : 1;
      let rotateAmt = j / width * PI / 180 * plusOrMinus * random() * rotateMultiplier;

      plusOrMinus = random() < 0.5 ? -1 : 1;
      let translateAmt = j / width * plusOrMinus * random() * randomDisplacement;

      push();
      translate(i + translateAmt + offset, j + offset);
      rotate(rotateAmt);
      rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);
      pop(); 
    }
  }

  noLoop();
}


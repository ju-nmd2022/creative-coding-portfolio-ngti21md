let shapeMorph = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 10, 20);
  noStroke();
  angleMode(DEGREES); 
}

function draw() {
  background(10, 10, 20, 20);

  let rows = 10; 
  let cols = 10; 
  let shapeSize = width / cols; 

  shapeMorph = (sin(frameCount * 0.01) + 1) / 2; 
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let posX = x * shapeSize + shapeSize / 2;
      let posY = y * shapeSize + shapeSize / 2;

      let hue = map(y, 0, rows - 1, 0, 255); 
      let particleColor = color(hue, 255, 255); 

      fill(particleColor);

      push();
      translate(posX, posY);

      let morph = map(y, 0, rows - 1, 0, 1); 
      let morphValue = lerp(0, 1, shapeMorph * morph); 

      if (morphValue < 1) {
        let interpX1 = lerp(-shapeSize / 2, 0, morphValue);
        let interpX2 = lerp(shapeSize / 2, shapeSize / 2, morphValue);
        let interpX3 = lerp(shapeSize / 2, -shapeSize / 2, morphValue);
        let interpY1 = lerp(-shapeSize / 2, -shapeSize / 2, morphValue);
        let interpY2 = lerp(-shapeSize / 2, shapeSize / 2, morphValue);
        let interpY3 = lerp(shapeSize / 2, shapeSize / 2, morphValue);
        
        beginShape();
        vertex(interpX1, interpY1);
        vertex(interpX2, interpY2);
        vertex(interpX3, interpY3);
        if (morphValue < 0.99) {
          vertex(shapeSize / 2, -shapeSize / 2);
        }
        endShape(CLOSE);
      } else {
        triangle(-shapeSize / 2, shapeSize / 2, 0, -shapeSize / 2, shapeSize / 2, shapeSize / 2);
      }

      pop();
    }
  }
}
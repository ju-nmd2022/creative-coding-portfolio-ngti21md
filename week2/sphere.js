function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(0);

  noFill();
  stroke(225);
  strokeWeight(2);
  
  // Change i value to make the sphere
  for (let i = -90; i <= 90; i += 10) {
    //Colors changing
    let r = map(sin(frameCount / 2), -1, 1, 100, 200);
    let b = map(i, 0, 50, 100, 200);
    let g = map(cos(frameCount / 2), -1, 1, 200, 100); 

    stroke(r, b, g);
    // Rotate the sphere
    rotateX(frameCount * 0.2); 
    rotateY(frameCount * 0.2); 

    beginShape();
    for (let j = 0; j <= 360; j += 10) {
      let ver = i; //vertical angle
      let hon = j; //horizontal angle
      let radius = 150;  

      // Make the sphere
      let x = radius * cos(ver) * cos(hon);
      let y = radius * cos(ver) * sin(hon);
      let z = radius * sin(ver);

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}

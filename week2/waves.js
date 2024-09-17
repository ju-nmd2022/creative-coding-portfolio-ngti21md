function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  rotateX(60);

  noFill();
  stroke(225);
  
  //change i value to make 2 waves
  for (let i = -45; i < 40; i++ ) {
    //colors changing
    let r = map(sin(frameCount / 2), -1, 1, 100, 200);
    let b = map(i, 0, 50, 100, 200);
    let g = map(cos(frameCount / 2), -1, 1, 200, 100); 

    stroke(r, b, g);
    rotate(frameCount / 10); 

    beginShape();
    for (let j = 0; j < 360; j += 5) {
      let radius = i * 8;
      
      //Make shape and movement based on frameCount
      let x = radius * cos(j);
      let y = radius * sin(j);
      let z = sin(frameCount * 8 + i * 8) * 50;

      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
}

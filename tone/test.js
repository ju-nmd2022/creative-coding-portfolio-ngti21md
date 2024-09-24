// Tutorial by Colorful Coding on Youtube. Sine wave structures. https://www.youtube.com/watch?v=vmhRlDyPHMQ.

let hexagonOsc; 
let triangleOsc; 
let currentWaveType = 0; 
let shapeType = 'hexagon'; 

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  
  // Sound for hexagons
  hexagonOsc = new Tone.Oscillator({
    frequency: 110, 
    type: 'sine' 
  }).toDestination();

  // Sound for triangle
  triangleOsc = new Tone.Oscillator({
    frequency: 220, 
    type: 'triangle' 
  }).toDestination();

  // volume
  hexagonOsc.volume.value = -20; 
  triangleOsc.volume.value = -20; 

  // sounds play
  hexagonOsc.start();
  triangleOsc.start();
  Tone.Transport.start();
}

function draw() {
  background(0);
  rotateX(60);
  
  noFill();
  stroke(225); 

  for (let i = 0; i < 40; i++) {
    // Color changing
    let r = map(sin(frameCount / 2), -1, 1, 100, 200);
    let b = map(i, 0, 50, 100, 200);
    let g = map(cos(frameCount / 2), -1, 1, 200, 100); 

    stroke(r, b, g);
    rotate(frameCount / 10); // Rotation based on frameCount

    if (shapeType === 'hexagon') {
      drawHexagon(i); 
    } else if (shapeType === 'triangle') {
      drawTriangle(i); 
    }
  }
}

function drawHexagon(index) {
  beginShape();
  for (let j = 0; j < 360; j += 60) {
    let radius = index * 8;
    let z = sin(frameCount * 5 + index * 8) * 50;

    let x = radius * cos(j);
    let y = radius * sin(j);

    vertex(x, y, z);
    
    let frequency = map(z, -50, 50, 110, 220); 
    hexagonOsc.frequency.setValueAtTime(frequency, Tone.now());
  }
  endShape(CLOSE);
}

function drawTriangle(index) {
  beginShape();
  for (let j = 0; j < 360; j += 120) { 
    let radius = index * 8;
    let z = sin(frameCount * 5 + index * 8) * 50;

    let x = radius * cos(j);
    let y = radius * sin(j);

    vertex(x, y, z);

    let frequency = map(z, -50, 50, 110, 220); 
    triangleOsc.frequency.setValueAtTime(frequency, Tone.now());
  }
  endShape(CLOSE);
}

function mousePressed() {
  // change shape type on mouse click
  if (shapeType === 'hexagon') {
    shapeType = 'triangle'; 
  } else {
    shapeType = 'hexagon'; 
  }  
}


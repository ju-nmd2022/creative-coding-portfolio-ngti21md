let ready = false;
let volume = -9;
let synth;
let waveform;
let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // UI elements
  showButtons();
  slider = createSlider(-20, 10, -9);
  slider.position(500, 100);
  slider.style('width', '80px');
  slider.input(changeVolume);
}

function changeVolume() {
  volume = slider.value();
  Tone.Master.volume.value = volume;
}

function showButtons() {
  const types = ["sine", "triangle", "sawtooth", "square"];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    const button = createButton(type);
    button.position(100 + i * 100, 100);
    button.mousePressed(createButtonHandler(type)); // Use closure to capture 'type'
  }
}

function createButtonHandler(type) {
  return function() {
    if (synth) {
      synth.oscillator.type = type;
    }
  };
}

function initAudio() {
  synth = new Tone.Synth().toDestination();
  synth.oscillator.type = "sine";
  waveform = new Tone.Waveform(); // Visualize sound wave
  Tone.Master.connect(waveform);
  Tone.Master.volume.value = -9;
}

function draw() {
  if (ready) {
    background("grey");
    stroke("white");
    noFill();
    let buffer = waveform.getValue(0);
    let start = 0;
    for (let i = 1; i < buffer.length; i++) {
      if (buffer[i - 1] < 0 && buffer[i] >= 0) {
        start = i; // Where the wave cycle starts
        break;
      }
    }
    let end = buffer.length / 2 + start; // Where the wave cycle ends
    beginShape();
    for (let i = start; i < end; i++) {
      let x = map(i, start, end, 0, width);
      let y = map(buffer[i], -1, 1, 0, height);
      vertex(x, y);
    }
    endShape();
  } else {
    background('grey');
    fill('black');
    textAlign(CENTER, CENTER);
    text("click to start", width / 2, height / 2);
  }
}

function mousePressed() {
  if (!ready) {
    ready = true;
    initAudio();
    return;
  }
  synth.triggerAttackRelease(random(220, 440), "8n");
}

setInterval(() => {
  if (ready) {
    const minFrequency = 220; // Minimum frequency
    const maxFrequency = 440; // Maximum frequency
    const time = millis() / 1000; // Time-based noise
    const frequency = map(noise(time / 10), 0, 1, minFrequency, maxFrequency);
    console.log(time, frequency);
    
    // Randomly change oscillator type
    if (Math.random() > 0.5) {
      synth.oscillator.type = random(["sine", "triangle", "sawtooth", "square"]);
    }
    synth.triggerAttackRelease(frequency, "8n");
  }
}, 400);

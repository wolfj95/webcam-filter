let cam
let webcamFilter

let c1Picker, c2Picker, c3Picker, c4Picker
let lagSlider
let trails

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCapture(VIDEO).hide();
  webcamFilter = buildFilterShader(myFilter);

  // Accumulates past frames. FLOAT avoids the faint ghost that never fully
  // fades out when blending with low alpha in an 8-bit buffer.
  trails = createFramebuffer({ format: FLOAT })

  // How much of the previous frames to keep: 0 = no lag, higher = longer trails
  lagSlider = createSlider(0, 0.95, 0.8, 0.01).position(210, 5)

  c1Picker = createColorPicker('#69006b').position(0, 0)
  c2Picker = createColorPicker('#1a6bc1').position(50, 0)
  c3Picker = createColorPicker('#33db9b').position(100, 0)
  c4Picker = createColorPicker('#ffea00').position(150, 0)
}

function myFilter() {
  filterColor.begin();
  let initial = getTexture(filterColor.canvasContent, filterColor.texCoord);
  // let val = pow(brightness(initial), 4);
  let val = map(brightness(initial), 0, 0.7, 0, 1, true)

  let c1 = uniformVec4(() => color(c1Picker.value()))
  let c2 = uniformVec4(() => color(c2Picker.value()))
  let c3 = uniformVec4(() => color(c3Picker.value()))
  let c4 = uniformVec4(() => color(c4Picker.value()))

  // let c1 = color('#69006b')
  // let c2 = color('#1a6bc1')
  // let c3 = color('#33db9b')
  // let c4 = color('#ffea00')
  
  let outColor = c1
  if (val < 1/3) {
    outColor = lerpColor(c1, c2, map(val, 0, 1/3, 0, 1, true))
  } else if (val < 2/3) {
    outColor = lerpColor(c2, c3, map(val, 1/3, 2/3, 0, 1, true))
  } else {
    outColor = lerpColor(c3, c4, map(val, 2/3, 1, 0, 1, true))
  }
  filterColor.set(outColor);
  filterColor.end();
}

function draw() {
  // Draw the new camera frame partly transparent on top of the old ones,
  // so earlier frames fade out gradually instead of disappearing at once
  trails.begin();
  imageMode(CENTER);
  scale(-1, 1)
  tint(255, 255 * (1 - lagSlider.value()))
  image(
    cam,
    0, 0, width, height,
    0, 0, cam.width, cam.height,
    COVER
  );
  trails.end();

  background(0);
  imageMode(CENTER);

  // noStroke()
  // fill(255)
  // circle(0, 0, 300)

  image(trails, 0, 0)
  filter(BLUR, 6)
  // webcamFilter.setUniform('c1', color(c1Picker.value()))
  // webcamFilter.setUniform('c2', color(c2Picker.value()))
  // webcamFilter.setUniform('c3', color(c3Picker.value()))
  // webcamFilter.setUniform('c4', color(c4Picker.value()))
  filter(webcamFilter);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

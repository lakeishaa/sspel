let tickerText =
  "HIGHER GROOVE   ✶   HIGHER GROOVE   ✶   HIGHER GROOVE   ✶   HIGHER GROOVE   ✶   HIGHER GROOVE   ✶   HIGHER GROOVE   ✶   HIGHER GROOVE";
let tickerText2 =
  "SOUNDS BY SPELL   ✶   SOUNDS BY SPELL   ✶   SOUNDS BY SPELL   ✶   SOUNDS BY SPELL   ✶   SOUNDS BY SPELL   ✶   SOUNDS BY SPELL   ";
let tickerSpeed = 15;
let tickerX1 = 0;
let tickerX2 = 0;
let maxVerticalPlacement;

let gridSizeSlider;
let invertCheckbox;

let button;

let checkbox1, checkbox2, checkbox3;
let video;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight - 38);
  maxVerticalPlacement = windowHeight - 130; // Set the maximum vertical placement

  canvas.position(0, 38);

  gridSizeSlider = createSlider(10, 90, 10);
  gridSizeSlider.position(10, 10);
  gridSizeSlider.style("width", "100px"); // set the width of the slider
  gridSizeSlider.style("height", "10px"); // set the height of the slider track
  gridSizeSlider.style("background-color", "gray"); // set the color of the slider track
  gridSizeSlider.style("outline", "none"); // remove the outline of the slider thumb
  gridSizeSlider.style("appearance", "none"); // remove the default appearance of the slider thumb
  gridSizeSlider.style("::-webkit-slider-thumb", "background-color: white"); // set the color of the slider thumb for WebKit browsers (Chrome, Safari, etc.)
  gridSizeSlider.style("::-moz-range-thumb", "background-color: white"); // set the color of the slider thumb for Firefox

  invertCheckbox = createCheckbox(" INVERT", false);
  invertCheckbox.position(750, 5);
  invertCheckbox.style("color", "#31E638");
  invertCheckbox.style("border", "none");
  invertCheckbox.style("outline", "none");
  invertCheckbox.style("width", "200px");
  invertCheckbox.style("line-height", "1.7em");
  invertCheckbox.style("font-family", "helvetica");

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  button = createButton("SCREENSHOT");
  button.position(windowWidth - 150, 5);
  button.mousePressed(screenshot);
  button.style("background-color", "#31E638");
  button.style("color", "#343434");
  button.style("padding", "3px");
  button.style("font-size", "15px");

  radio = createRadio();
  radio.option(" CAMERA 1  ");
  radio.option(" CAMERA 2  ");
  radio.option(" CAMERA 3  ");
  fill(255, 0, 0);
  radio.position(170, 5);
  radio.style("color", "#31E638");
  radio.style("width", "550px");
  radio.style("font-family", "helvetica");
  radio.style("line-height", "1.6em");

  textSize(50);
  textAlign(CENTER, CENTER);
}

function draw() {
  background("#5e5e5e");
  saturation(1000);

  let val = radio.value();

  if (val == " CAMERA 1  ") {
    background("#ECE6B3");
    let gridSize = gridSizeSlider.value();

    video.loadPixels();
    for (let y = 0; y < video.height; y += gridSize) {
      for (let x = 0; x < video.width; x += gridSize) {
        let index = (y * video.width + x) * 4;
        let r = video.pixels[index];
        let dia = map(r, 0, 255, gridSize, 2);

        stroke("#e2b61f");
        strokeWeight(0.5);

        let fillColor = "#df1691";

        fill(fillColor);
        rect(x, y + r / 10 + 2, (gridSize * 2) / 3), r / 3;

        fill("#1e59f6");

        rect(x, y + gridSize + 10 + 5, r / 20, gridSize);

        fill("#FFD030");
        circle(x + r / 2, y + r / 2, dia);
      }
    }

    // if (invertCheckbox.checked()) {
    //   filter(INVERT);
    // }
  } else if (val == " CAMERA 2  ") {
    background("#FFFFFF");
    let gridSize = gridSizeSlider.value();

    video.loadPixels();
    for (let y = 0; y < video.height; y += gridSize) {
      for (let x = 0; x < video.width; x += gridSize) {
        let index = (y * video.width + x) * 4;
        let r = video.pixels[index];
        let dia = map(r, 0, 255, gridSize, 2);

        stroke("#e2b61f");
        strokeWeight(0.5);

        let fillColor = "#df1691";

        fill(fillColor);
        rect(x, y + r / 10 + 2, (gridSize * 2) / 3), r / 3;

        fill("#1e59f6");

        rect(x, y + gridSize + 10 + 5, r / 20, gridSize);

        fill("#FFD030");
        circle(x + r / 2, y + r / 2, dia);
      }
    }

    filter(INVERT);
  } else if (val == " CAMERA 3  ") {
    let gridSize = gridSizeSlider.value();
    background("#000000");

    video.loadPixels();
    for (let y = 0; y < video.height; y += gridSize) {
      for (let x = 0; x < video.width; x += gridSize) {
        let index = (y * video.width + x) * 4;
        let r = video.pixels[index];
        let dia = map(r, 0, 255, gridSize, 2);

        fill("#FF7E00");
        stroke("#FCCE31");
        strokeWeight(0.5);

        let fillColor = "#FD0EA5";

        fill(fillColor);
        rect(x + r - 100, y + r / 10 + 2, (gridSize * 2) / 3, r / 3);
        fill("#7F0C98");
        rect(x, y + gridSize + 10 + 5, r / 20, gridSize);

        fill("#FFC900");
        circle(x + gridSize / 2, y + gridSize / 2, dia);
      }
    }
    saturation(100);
  }

  // Move the HIGHER GROOVE text
  textAlign(LEFT, CENTER);
  fill("#FFFFFF"); // Set the color to white
  stroke("#FFFFFF"); // Set stroke color
  textSize(50);
  strokeWeight(2); // Set stroke weight

  text(tickerText, tickerX1, maxVerticalPlacement);

  // Move the SOUNDS BY SPELL text from right to left
  textAlign(LEFT, CENTER);
  fill("#FFFFFF"); // Set the color to white
  stroke("#FFFFFF"); // Set stroke color
  textSize(50);

  strokeWeight(2); // Set stroke weight

  text(tickerText2, width - tickerX2, maxVerticalPlacement + 60);

  // Update tickerX values for both texts
  tickerX1 += tickerSpeed;
  tickerX2 += tickerSpeed;

  // Reset the position when the text goes off-screen
  if (tickerX1 > width) {
    tickerX1 = -textWidth(tickerText);
  }

  if (tickerX2 > width + textWidth(tickerText2)) {
    tickerX2 = 0;
  }
}

function screenshot() {
  saveCanvas("HIGHER_GROOVE_LAKEISHA" + ".jpg");
}

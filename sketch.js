let video;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);

  // Load the current frame from the webcam into a p5.Image object
  let img = video.get();

  // Convert the image to grayscale
  img.filter(GRAY);

  // Set the threshold value for creating the silhouette
  let thresholdValue = 127;

  // Create the silhouette by setting pixels below the threshold to black
  loadPixels();
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let gray = (r + g + b) / 2;
    if (gray < thresholdValue) {
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
    }
  }
  updatePixels();
}


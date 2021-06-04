let DIS_WIDTH = 1280;
let DIS_HEIGHT = 720;
let FPS = 24;
let debug = true;
let aesthetics = true;

function setup() {
  createCanvas(DIS_WIDTH, DIS_HEIGHT);
  frameRate(FPS);
}

function draw() {
  background(20);
  // vertices is an array of three vectors, each representing
  // a vertex of the largest triangle as position vectors with
  // centre of the equilateral triangle as origin.
  let vertices = [
    createVector(0, -280),
    createVector(-560 / sqrt(3), 280),
    createVector(560 / sqrt(3), 280),
  ];
  display_sierpinski(5, 0, vertices);
}

function display_sierpinki(level, ratio, points) {
  // === Base case:
  if (level == 0) {
    return;
  }

  // === Processing:

  // === Recurse:
}

loopBool = true;
function keyPressed() {
  if (key == " ") {
    if (loopBool) {
      noLoop();
      loopBool = !loopBool;
    } else {
      loop();
      loopBool = !loopBool;
    }
  } else if (key == "d") {
    debug = !debug;
  } else if (key == "a") {
    aesthetics = !aesthetics;
  }
}

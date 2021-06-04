let DIS_WIDTH = 1280;
let DIS_HEIGHT = 720;
let FPS = 24;
let debug = true;
let aesthetics = true;
let t = 0;
let dt = 0.01;
let triangle_radius = 0.8 * (DIS_HEIGHT / 2);

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
    createVector(0, -triangle_radius),
    createVector((triangle_radius * Math.sqrt(3)) / 2, triangle_radius / 2),
    createVector((-triangle_radius * Math.sqrt(3)) / 2, triangle_radius / 2),
  ];
  //   let vertices = [
  //     createVector(DIS_WIDTH / 2, DIS_HEIGHT / 2 - 280),
  //     createVector(DIS_WIDTH / 2 + 560 / Math.sqrt(3), DIS_HEIGHT / 2 + 280),
  //     createVector(DIS_WIDTH / 2 - 560 / Math.sqrt(3), DIS_HEIGHT / 2 + 280),
  //   ];
  display_sierpinski(7, Math.acos(1 - 2 * (t - Math.floor(t))) / PI, vertices);

  t += dt;
}

// `level` is recursion depth, decreases to 0 which is base case.
// `proportion` is proportion of side in clockwise direction, in range [0, 1]
// `points` is an array of position vectors for the vertices of the triangle,
// clockwise starting from top vertex. Centre of initial big triangle as origin.
function display_sierpinski(level, proportion, points) {
  // === Base case:
  if (level == 0) {
    return;
  }

  // === Processing:
  push();
  stroke(255);
  strokeWeight(0.7 * level);
  noFill();
  translate(DIS_WIDTH / 2, DIS_HEIGHT / 2);
  rotate(-0.3 * t);
  beginShape();
  vertex(points[0].x, points[0].y);
  vertex(points[1].x, points[1].y);
  vertex(points[2].x, points[2].y);
  vertex(points[0].x, points[0].y);
  endShape();
  //   line(points[0].x, points[0].y, points[1].x, points[1].y);
  //   line(points[1].x, points[1].y, points[2].x, points[2].y);
  //   line(points[2].x, points[2].y, points[0].x, points[0].y);
  pop();

  // === Recurse:
  // Sub-triangle at vertex 1
  let v1_partition_points = [
    points[0].copy(),
    points[0].copy().add(p5.Vector.sub(points[1], points[0]).mult(proportion)),
    points[2].copy().add(p5.Vector.sub(points[0], points[2]).mult(proportion)),
  ];
  display_sierpinski(level - 1, proportion, v1_partition_points);

  // Sub-triangle at vertex 2
  let v2_partition_points = [
    points[0].copy().add(p5.Vector.sub(points[1], points[0]).mult(proportion)),
    points[1].copy(),
    points[1].copy().add(p5.Vector.sub(points[2], points[1]).mult(proportion)),
  ];
  display_sierpinski(level - 1, proportion, v2_partition_points);

  // Sub-triangle at vertex 3
  let v3_partition_points = [
    points[2].copy().add(p5.Vector.sub(points[0], points[2]).mult(proportion)),
    points[1].copy().add(p5.Vector.sub(points[2], points[1]).mult(proportion)),
    points[2].copy(),
  ];
  display_sierpinski(level - 1, proportion, v3_partition_points);
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

//Name: Metastasis
//Date: 15 January 2023

//Author: Jing Zhou

//Caution for intensive phobics

//Acknowledgements:

//The Coding Train (2016) Coding Challenge #6: Mitosis Simulation with p5.js. 27 April. Available at: https://www.youtube.com/watch?v=jxGS3fKPKJA&t=712s (Accessed: 21st December 2022)

//Colorful Coding (2021) 3D particle explosions in p5.js | Coding Project #10. 19 January. Available at: https://www.youtube.com/watch?v=MceZFeV2jhE&t=5s (Accessed: 4 January 2023) 

//-----------------------------
//Spreading cells part
class Cell {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(0, 0);

    this.acc = p5.Vector.random2D().normalize();

    //color
    this.r = map(dist(this.pos.x, this.pos.y, width / 2, height / 2), 0, width / 2, 192, 59);
    this.g = map(dist(this.pos.x, this.pos.y, width / 2, height / 2), 0, width / 2, 198, 15);
    this.b = map(dist(this.pos.x, this.pos.y, width / 2, height / 2), 0, width / 2, 119, 18);
    
    this.alpha = 220;

    this.radius = 30;
  }

  update() {
    //let it spread around, and changed speed
    var m = map(sin(frameCount), -1, 1, 0.4, 0.9);
    this.acc.mult(m);

    this.vel.add(this.acc);
    this.pos.add(this.vel);

    //update color
    this.r = map(dist(this.pos.x, this.pos.y, width / 2, height / 2), 0, width / 2, 192, 59);
    this.g = map(dist(this.pos.x, this.pos.y, width / 2, height / 2), 0, width / 2, 198, 15);
    this.b = map(dist(this.pos.x, this.pos.y, width / 2, height / 2), 0, width / 2, 119, 18);
    
    this.alpha -= 0.1;

    var r = map(dist(this.pos.x, this.pos.y, width / 2, height / 2), 0, width / 2, 0.15, 0.0);
    this.radius -= r;
  }

  display() {
    push();

    //the outer ellipse(Cell)
    stroke(119, 59, 33, map(this.alpha, 220, 0, 50, 0));
    fill(this.r, this.g, this.b, this.alpha);
    
    ellipse(this.pos.x, this.pos.y, float(random(this.radius * 0.9, this.radius * 1.1)), float(random(this.radius * 0.9, this.radius * 1.1))); 
    //use random value to make them look like moving themselves, like growing

    //The ellipse inside (Cell nucleus)
    noStroke();
    fill(105, 86, 72, this.alpha - 50);
    
    ellipse(this.pos.x + random(-2, 2), this.pos.y + random(-2, 2), float(random(this.radius * 0.2, this.radius * 0.25)), float(random(this.radius * 0.2, this.radius * 0.25)));

    pop();
  }
}

var cells = [];
var start = 0;
var inc = 0.01;

function setup() {
  createCanvas(1000,550);
  angleMode(DEGREES);

  //pixelDensity for background
  pixelDensity(1);
}

function draw() {
  //this background color can make the gaps between each rectange on the background look not that obviously
  background(120,55,35);

  noiseBackground();
  
  //set the number of new Cell create each frame
  for (var i = 0; i < 2; i++) {
    c = new Cell();
    cells.push(c);
  }

  for (var j = 0; j < cells.length; j++) {
    if (cells[j].alpha > 0) {
      cells[j].update();
      cells[j].display();
    } else {
      cells.splice(j, 1);
    }
  }
}

//Make it more like inside the body
function noiseBackground() {
  var xoff = 0;
  
  loadPixels();
  
  for(var x = 0;x < width; x++){
    var yoff = 0;
    for (var y  =0; y < height; y++){
      var index = (x + y * width) * 4
      var h = noise(xoff + start, yoff + start * 0.5) * 255;
      
      pixels[index+0] = 25 * h;
      pixels[index+1] = 2 * h;
      pixels[index+2] = 1.5 * h;
      pixels[index+3] = 255;

      yoff += inc;
    }
    xoff += inc;
  }
  start += 0.01;
  
  updatePixels();
}
// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 5000; // Decide the initial number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width/2-90), random(height/2-50));
  }
}

function draw() {
  background(50);
  drawVolcano()
  // update and display
  // for (let i = 0; i < particles.length; i++) {
  //   let p = particles[i];
  //   // if (mouseIsPressed){
  //     p.fall();
  //     // p.bounce();
  //     p.move();
  //     p.display();
  //   // }
  mousePressed()
    
  }

class Particle {
  constructor(x, y) {
    // properties
    this.x = x;
    this.y = y;
    this.xSpd = random(-8, 40);
    this.ySpd = random(-30, -8);
    this.dia = random(3,20);
  }
  // methods
  fall() {
    this.ySpd += 0.1;
  }
  bounce() {
    if (this.x < 0) {
      this.x = 0;
      this.xSpd = this.xSpd * -1;
    }
    else if (this.x > width) {
      this.x = width;
      this.xSpd = this.xSpd * -1;
    }
    if (this.y < 0) {
      this.y = 0;
      this.ySpd = this.ySpd * -1;
    }
    else if (this.y > height) {
      this.y = height;
      this.ySpd = this.ySpd * -1;
    }
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    push();
    translate(this.x, this.y);
    fill('#e85009')
    noStroke()
    circle(0, 0, this.dia);
    
    pop();
  }
 
}

function drawVolcano(){
  fill('#362727')
  
  fill('#362727')
  beginShape()
  curveVertex(0,600)
  curveVertex(0,600)
  curveVertex(200,200)
curveVertex(250,180)
curveVertex(300,155)
curveVertex(325,209)
curveVertex(379,163)
  curveVertex(450,140)
  curveVertex(800,600)
  curveVertex(800,600)
  endShape()
}
function mousePressed(){
  
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    // if (mouseIsPressed){
      p.fall();
      // p.bounce();
      p.move();
      p.display();
  }
}


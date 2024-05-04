let balls = [];
let totalNum = 20;
let specialBall;
let bLink = false;
let button;
let slider;
let input;
let submit;
let str = '';


function setup() {
  let canvas = createCanvas(500, 400);

  canvas.parent("p5_container");

  specialBall = new Ball(random(width), random(height));
  specialBall.size = 80;
  specialBall.col = [255, 255, 0];
  specialBall.xSpd = random(-3, 3);
  specialBall.ySpd = random(-3, 3);
  
  button = createButton("link all objects");
  button.mousePressed(linkAllObjs);
button.parent("interface");

  
  slider = createSlider(1, 50, 10, 5);
  slider.style("width", "350px");
  slider.parent("interface");

  input = createInput();
  input.style("width", "350px");
  input.parent("interface");


  submit = createButton("submit");
  submit.mousePressed(updateInput);
  submit.parent("interface");
}

function updateInput(){

  str = input.value();

}

function linkAllObjs(){
  bLink = !bLink;
}

function draw() {
  background(200);

  specialBall.move();
  specialBall.display();
  specialBall.bounce();

  
  if (random(1.0) < 0.08) {
    balls.push(new Ball(random(width), random(height)));
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].checkOutOfCanvas();
    balls[i].checkCollision(specialBall);
    if(bLink){
      balls[i].checkAllObjs(balls);
    }
    balls[i].updateSize(slider.value());
    balls[i].text = str;
    balls[i].display();
  }

  for (let i = balls.length - 1; i >= 0; i--) {
    if (balls[i].isDone) {
      balls.splice(i, 1);
    }
  }

  while (balls.length > 500) {
    balls.splice(0, 1);
  }

  fill(0);
  text(balls.length, 50, 50);
}

class Ball {
  constructor(xPos, yPos) {
    this.x = xPos;
    this.y = yPos;
    this.xSpd = random(-1, 1);
    this.ySpd = random(-1, 1);
    this.size = random(20, 40);
    this.col = [255, 255, 255];
    this.isDone = false;
    this.bTouch = false;
    this.text = ' ';
  }

  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }


  updateSize(size){
    this.size = size;
  }
  
  checkCollision(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    
    if (d < other.size / 2+this.size/2) {
      this.bTouch = true;
      this.col = [250, 0, 255];
      this.shake();
      this.speedUp();
    } else {
      this.bTouch = false;
      this.col = [255, 255, 255];
    }
  }
  
  
  checkAllObjs(allObjs){
    for(let i = 0; i< allObjs.length; i++){
      if(allObjs[i] != this){
        let d = dist(this.x, this.y, allObjs[i].x, allObjs[i].y);
        if(d<150){
          strokeWeight(0.4);
          line(this.x, this.y, allObjs[i].x, allObjs[i].y);
        }
      }
    }
  }


  shake() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }
  speedUp() {
    this.xSpd *= 1.2;
    this.ySpd *= 1.2;
  }

  slowDown() {
    this.xSpd *= 0.2;
    this.ySpd *= 0.2;
  }

  checkOutOfCanvas() {
    if (this.x > width || this.x < 0) {
      this.isDone = true;
    }

    if (this.y > height || this.y < 0) {
      this.isDone = true;
    }
  }

  bounce() {
    if (this.x > width || this.x < 0) {
      this.xSpd *= -1;
    }

    if (this.y > height || this.y < 0) {
      this.ySpd *= -1;
    }
  }

  display() {
    fill(this.col[0], this.col[1], this.col[2]);
    circle(this.x, this.y, this.size);
    text(this.text, this.x, this.y);
  }
}

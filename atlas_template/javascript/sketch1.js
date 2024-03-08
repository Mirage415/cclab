let colBlue_1 = "#171678"; //color for main parts
let colRed_1 = "#f50505"; //color for eyes
let colRed_2 = "#780b0b"; //color for body parts
let colPurple = "#461196"; //color for head horns
let col_space = "#12092b"; //color for space background
let colBlue_2 = "#5d84e8"; //color for plasma
let colGrey = "#807c7c"; //color for some small parts
let colSpaceRed = "#4f0f0f";
let colOrange = "#d93e18"; //color for laser
let colBlue_3='#05f1f5'//color for scanning laser
let x = 0;
let y = 0;
let deltaX = 0.15;
let deltaY = 0.15;
let angle = 0;
let Vx = 0;
let Vy = 0;
let Y;
let i = 0;
let bullets = [];
let diameter = 200;
let particles = [];
let maxParticles = 100; // Maximum number of particles on the screen
let xEarth=600
let yEarth=1300
let w
function setup() {
  createCanvas(800, 500);
  angleMode(DEGREES);
}

function draw() {
  w=int(random(1,3))
    //console.log(yEarth)
  x += deltaX;
  y += deltaY;
  if (x >= 10 || x <= -10) {
    deltaX = deltaX * -1;
  }
  if (y >= 10 || y <= -10) {
    deltaY = deltaY * -1;
  }
  background(col_space);
  //animation
  push();
  if (mouseButton) {
    // translate(10*x*cos(y*frameCount),15*y*sin(x*frameCount))
    translate(5 * x * cos(frameCount), 7 * y * sin(frameCount));
    scanning()
    if (keyCode == ENTER) {
    
      if(w=2){
      background(colSpaceRed);
      translate(x * cos(y * frameCount), y * sin(x * frameCount));
    }else{

    }
    }
  }

  
  //laser blast
  //while keypressed, if your mouse is not more than 300 away from its core, the creature will first warn you and after three seconds, it will shoot laser towards you.
  push();
  if (keyCode == ENTER) {
     w=random(1,4)
    if (dist(mouseX, mouseY, 400, 185) <= 300) {
      stroke(colRed_1);

      //energon rings shrink from r=200 to r=10 as time goes
      noFill();
      for (let j = 20; j >= 0; j--) {
        strokeWeight(j);
        circle(400, 185, diameter + j);
        diameter -= 1;
        if (diameter <= 1) {
          diameter = 200;
        }
      }

     
      if (frameCount >= 300) {
        stroke(colRed_1);
        if(frameCount<700){
        strokeWeight(15);
        line(mouseX, mouseY, 400, 185);
        strokeWeight(4);
        stroke(255);
        line(mouseX, mouseY, 400, 185);
        }else{
          stroke(colRed_1)
          strokeWeight(25)
          line(400,185,350,700)
          stroke(255)
          strokeWeight(9)
          line(400,185,350,700)
        }
        
  pop();
  pop();
  


  Y = mouseY - 15;
  if (keyIsPressed) {
    let bullet = {
      x: mouseX - 10,
      y: Y,
      speed: 25,
      
    };
    bullets.push(bullet);
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].y -= bullets[i].speed;
      fill(colBlue_2);
      ellipse(bullets[i].x, bullets[i].y, 7, 15);
      ellipse(bullets[i].x + 20, bullets[i].y, 7, 15);
      fill(255);
      ellipse(bullets[i].x, bullets[i].y, 4, 9);
      ellipse(bullets[i].x + 20, bullets[i].y, 4, 9);
    }
    
  }
}
  else if(frameCount>=600&&frameCount<650){
  shipbody()
  cannon()
  otherparts()

}else if(frameCount>=650&&frameCount<=700){
  shipbody()
}else if(frameCount>800&&frameCount<1300){
  scale(0.5)
  drawEarth(xEarth, yEarth, 1000);
  if(yEarth>850){
  yEarth-=0.5
   
 
    
  }else{
    yEarth=850
  }
  }else{
    for(let k=1000;k>=0;k-=10){
    fill(0)
    k-=0.5
    circle(xEarth,yEarth,k)
  }
  }
    }else{
    shipbody()
    wings()
    cannon()
    otherparts()
  }
  }else{
    shipbody()
    wings()
    cannon()
    otherparts()
    
  }
/////////////////////////////////////////////////////////////////////////////////////ending of draw loop
//////////////////beginning of my functions/////////////////////////////////////
function shipbody(){
    fill(200, 200, 100);
  ellipse(mouseX, mouseY, 20, 30);
}
  //wings
function wings(){
  fill(230, 200, 100);
  triangle(
    mouseX - 7,
    mouseY - 15,
    mouseX - 7,
    mouseY + 15,
    mouseX - 25,
    mouseY + 17
  );
  triangle(
    mouseX + 25,
    mouseY + 17,
    mouseX + 7,
    mouseY - 15,
    mouseX + 7,
    mouseY + 15
  );
}
  //cannon
function cannon(){
  fill("grey");
  rectMode(CENTER);
  rect(mouseX - 10, mouseY - 10, 3, 20);
  rect(mouseX + 10, mouseY - 10, 3, 20);
}
  //推进器
function otherparts(){
  rectMode(CENTER);
  fill("darkgrey");
  rect(mouseX - 7, mouseY + 10, 5, 15);
  rect(mouseX + 7, mouseY + 10, 5, 15);
  rect(mouseX, mouseY + 13, 7, 15);
  //window
  fill("skyblue");
  beginShape();
  vertex(mouseX - 3, mouseY);
  vertex(mouseX + 3, mouseY);
  vertex(mouseX + 3, mouseY - 6);
  vertex(mouseX, mouseY - 10);
  vertex(mouseX - 3, mouseY - 6);
  endShape(CLOSE);
}
function drawEarth(x, y, size) {
  // Draw Earth's outline
  fill(0, 100, 255);
  stroke(0);
  strokeWeight(2);
  ellipse(x, y, size, size);
  
  // Draw landmasses
  fill(34, 139, 34); // Green color for land
  noStroke();
  // Draw landmasses 
  beginShape();
  vertex(x - 70, y);
  bezierVertex(x - 70, y - 70, x + 70, y - 70, x + 70, y);
  bezierVertex(x + 70, y + 70, x - 70, y + 70, x - 70, y);
  endShape(CLOSE);
  
  // Draw oceans
  fill(30, 144, 255); // Blue color for oceans
  ellipse(x, y, size * 0.8, size * 0.8);
}
function scanning(){
  let End=200
  xEnd=map(End,100,800,400,500)
  push()
  strokeWeight(10)
  stroke('#05f1f5')
  line(mouseX,mouseY-10,xEnd,End)
  pop()
}
function CREATURE(){
  // armour
  fill(colBlue_1);
  triangle(310 + x, 50 + y, 340 + x, 305 + y, 220 + x, 200 + y);
  triangle(490 - x, 50 + y, 460 - x, 305 + y, 580 - x, 200 + y);
  // head
  fill(colBlue_1);
  beginShape();
  vertex(485, 150);
  vertex(460, 250);
  vertex(340, 250);
  vertex(315, 150);
  vertex(485, 150);
  endShape();
  //horns
  //left horn
  fill(colPurple);
  beginShape();
  vertex(344, 170);
  vertex(344, 120);
  vertex(380, 95);
  vertex(380, 190);
  endShape();
  //right horn
  beginShape();
  vertex(456, 170);
  vertex(456, 120);
  vertex(420, 95);
  vertex(420, 190);
  endShape();
  //nose
  //left
  fill(2);
  beginShape();
  vertex(392, 160);
  vertex(392, 220);
  vertex(380, 200);
  vertex(380, 170);
  endShape();
  //right
  beginShape();
  vertex(408, 160);
  vertex(408, 220);
  vertex(420, 200);
  vertex(420, 170);
  endShape();
  //nosebridge
  rectMode(CENTER);
  fill(200);
  rect(400, 180, 16, 10);
  rect(400, 190, 16, 10);
  //eyes
  //left eye
  if (keyCode) {
    fill(colRed_1);
  } else {
    fill(0);
  }
  beginShape();
  vertex(344, 170);
  vertex(344, 177);
  vertex(380, 197);
  vertex(380, 190);
  endShape(CLOSE);
  //left optics

  push();

  fill(colRed_1);
  noStroke();
  rectMode(CORNER);
  rect(353, 177, 1, 8);
  rect(362, 182, 1, 8);
  rect(371, 187, 1, 8);
  //right eye
  if (keyCode == ENTER) {
    w=random(1,4)
    if(w%2==0){
    fill('#05f1f5');
    }else{
      fill(colRed_1)
    }
  } else {
    fill(0);
  }
  beginShape();
  vertex(456, 170);
  vertex(456, 177);
  vertex(420, 197);
  vertex(420, 190);
  endShape(CLOSE);
  //left optics

  fill(colRed_1);
  noStroke();
  rectMode(CORNER);
  rect(447, 177, 1, 8);
  rect(438, 182, 1, 8);
  rect(429, 187, 1, 8);
  pop();

  //mouth
  fill(colRed_2);
  push();
  translate(380, 190);
  beginShape();
  vertex(0, 10);
  vertex(-10, 30);
  vertex(5, 50);
  vertex(5, 20);
  endShape(CLOSE);
  beginShape();
  vertex(40, 10);
  vertex(50, 30);
  vertex(35, 50);
  vertex(35, 20);
  endShape(CLOSE);
  pop();
  //helmet
  fill(colBlue_1);
  triangle(327.5, 200, 295, 140, 327.5, 75);
  triangle(472.5, 200, 515, 140, 472.5, 75);
  //screws
  //left
  push();
  translate(290, 180);
  if (x <= 7) {
    angle = 0;
  } else {
    angle = random(-90, 100);
  }
  fill(colGrey);
  rectMode(CENTER);
  rotate(angle);
  rect(0, 0, 20, 20);
  pop();
  //right
  push();
  translate(510, 180);
  if (x <= 7) {
    angle = 0;
  } else {
    angle = random(-90, 100);
  }
  fill(colGrey);
  rectMode(CENTER);
  rotate(angle);
  rect(0, 0, 20, 20);
  pop();

  //jet
  fill(colBlue_1);
  triangle(340, 250, 380, 250, 360, 300);
  triangle(460, 250, 420, 250, 440, 300);
  beginShape();
  vertex(380, 250);
  vertex(420, 250);
  vertex(410, 300);
  vertex(400, 350);
  vertex(390, 300);
  endShape();
  //wings
  fill(colRed_2);
  rectMode(CENTER);
  push();
  translate(240 + 1.2 * x, 160 + 1.2 * y);
  angle = 100 * sin(frameCount);
  rotate(2 * angle);
  rect(0, 0, 30, 30);
  pop();

  push();
  translate(560 - 1.2 * x, 160 + 1.2 * y);
  rotate(-2 * angle);
  rect(0, 0, 30, 30);
  pop();
  fill(colBlue_1);
  triangle(
    235 + 2 * x,
    175 + 2 * y,
    120 + 2 * x,
    220 + 2 * y,
    230 + 2 * x,
    155 + 2 * y
  );
  triangle(
    565 - 2 * x,
    175 + 2 * y,
    690 - 2 * x,
    220 + 2 * y,
    570 - 2 * x,
    155 + 2 * y
  );
}
function particles(){
  if (particles.length < maxParticles) {
    let particle = {
      x: mouseX,
      y: mouseY,
      size: random(2, 10),
      vx: random(-2, 2),
      vy: random(-2, 2),
      lifespan: 255,
    };
    particles.push(particle);
  
  }

  // Update and draw particles
  for (let t = 0; t < particles.length; t++) {
    let particle = particles[t];

    // Move the particle
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Reduce the lifespan
    particle.lifespan -= 5;

    // Draw the particle
    noStroke();
    fill(255, particle.lifespan);
    ellipse(particle.x, particle.y, particle.size, particle.size);
  }

  // Remove dead particles
  particles = particles.filter((particle) => particle.lifespan > 0);
}


}

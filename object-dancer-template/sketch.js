/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new EricDancer(width / 2, height / 2);
  angleMode(DEGREES)
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only
  
  dancer.update();
  
  dancer.display();
  
  
  dancer.transform()

 
  
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class EricDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.head_X = 0
    this.head_Y = 0 - 60
    this.left_winX = 0-17
    this.left_winY = 0-45
    this.right_winX = 0+17
    this.right_winY = 0-45
    this.left_shoulderX = 0-38
    this.left_shoulderY = 0-55
    this.right_shoulderX = 0+38
    this.right_shoulderY = 0-55
    this.left_armX = 0-75
    this.left_armY = 0+40
    this.right_armX = 0+75
    this.right_armY = 0+40
    this.left_handX = 0-40
    this.left_handY = 0-15
    this.right_handX = 0+40
    this.right_handY = 0-15
    this.腰_Y = 0-30
    this.d_X = 0
    this.d_Y = 0-10
    this.left_legX = 0-13
    this.left_legY = 0+10
    this.left_smalllegY = 0+10
    this.left_footY = 0+10
    this.right_legX = 0+13
    this.right_legY = 0+10
    this.right_smalllegY = 0+10
    this.right_footY = 0+10
    this.velocity = 0.04
    this.小臂长度 = 30
    this.轮子宽度 = 9
    this.进气格栅 = 15
    this.大腿长度 = 40
    this.小腿长度 = 50
    //head main part

    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    scale(1.9)

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    //head
    //helmet
    //  fill('#08158a');
    fill('#131780');
   stroke('white')
   strokeWeight(0.1)
    beginShape();

    vertex(this.head_X - 7, this.head_Y + 3)
    vertex(this.head_X - 7, this.head_Y - 6)
    vertex(this.head_X - 4, this.head_Y - 10)
    vertex(this.head_X - 1, this.head_Y - 12)
    vertex(this.head_X + 1, this.head_Y - 12);
    vertex(this.head_X + 4, this.head_Y - 10);
    vertex(this.head_X + 7, this.head_Y - 6);
    vertex(this.head_X + 7, this.head_Y + 3);
    endShape(CLOSE);
    //antenna
    stroke('#131780')
    strokeWeight(2)
    line(this.head_X - 7.2,this.head_Y + 3,this.head_X-7.2,this.head_Y-17)
    line(this.head_X + 7.2,this.head_Y + 3,this.head_X+7.2,this.head_Y-17)
    //eyes
    strokeWeight(0)
    fill('#13bef2')
    ellipse(this.head_X - 3,this.head_Y - 4.5,1,1)
    ellipse(this.head_X + 3,this.head_Y - 4.5,1,1)
    //mask
    fill('#d7d8d9')
    beginShape()
    vertex(this.head_X,this.head_Y-3)
    vertex(this.head_X - 4.5,this.head_Y - 2)
    vertex(this.head_X - 4,this.head_Y + 2)
    vertex(this.head_X - 1,this.head_Y + 4)
    vertex(this.head_X+1,this.head_Y+4)
    vertex(this.head_X+4,this.head_Y+2)
    vertex(this.head_X+4.5,this.head_Y-2)
    endShape(CLOSE)
    
    //mask
    fill('#d7d8d9')
    ellipse(this.head_X,this.head_Y - 3,2,5)
   
    fill('#d7d8d9')
    beginShape()
    vertex(this.head_X,this.head_Y-3)
    vertex(this.head_X - 4.5,this.head_Y - 2)
    vertex(this.head_X - 4,this.head_Y + 2)
    vertex(this.head_X - 1,this.head_Y + 4)
    vertex(this.head_X+1,this.head_Y+4)
    vertex(this.head_X+4,this.head_Y+2)
    vertex(this.head_X+4.5,this.head_Y-2)
    endShape(CLOSE)
    
    //额头
    fill('#68696b')
    ellipse(this.head_X,this.head_Y - 9,3,6)
    //neck
    fill('#6a6c6e')
    rect(this.head_X - 3.9,this.head_Y + 5,9,15)
    push()
    stroke('black')
    strokeWeight(0.15)
    line(this.head_X,this.head_Y+4,this.head_X,this.head_Y - 2.3)
    line(this.head_X,this.head_Y - 2.3,this.head_X - 4.5,this.head_Y - 1.5)
    line(this.head_X,this.head_Y - 2.3,this.head_X + 4.5,this.head_Y - 1.5)
    pop()
  //chimney
  stroke('#88898a')
  strokeWeight(2)
  line(this.left_winX,this.left_winY,this.left_winX,this.left_winY - 30)
  line(this.right_winX,this.right_winY,this.right_winX,this.right_winY - 30)
 
  //chest(left)
    stroke('#c70404')
    strokeWeight(1)
    rectMode(CENTER)
    fill('#3a4459')
    rect(this.left_winX,this.left_winY,25,15)
    rect(this.right_winX,this.right_winY,25,15)

    //遮阳板
    noStroke()
    fill('#858282')
    rect(this.left_winX,this.right_winY-9,25,5)
    rect(this.right_winX,this.right_winY-9,25,5)
  //xiaotui left
fill('#131780')
rect(this.left_legX,this.left_smalllegY+43,15,this.小腿长度)
fill('grey')

rect(this.left_legX,this.left_smalllegY+45,6,this.小腿长度*2/3)
push()
noFill()
strokeWeight(0.5)
stroke('black')
rect(this.left_legX,this.left_smalllegY+45,5,this.小腿长度*2/5)
rect(this.left_legX,this.left_smalllegY+45,5,this.小腿长度*0.75/5)
pop()
//xiaotui right
fill('#131780')
rect(this.right_legX,this.right_smalllegY+43,15,this.小腿长度)
fill('grey')
rect(this.right_legX,this.right_smalllegY+45,6,this.小腿长度*2/3)
push()
noFill()
strokeWeight(1/2)
stroke('black')
rect(this.right_legX,this.right_smalllegY+45,5,this.小腿长度*2/5)
rect(this.right_legX,this.right_smalllegY+45,5,this.小腿长度*0.75/5)
pop()
//feet
fill('#494c52')
rect(this.left_legX,this.left_footY+65,17,7)
rect(this.right_legX,this.right_footY+65,17,7)

    //腹部车头
    fill('#c70404')
    rect(this.d_X,this.腰_Y+3,25,25)
    fill('#33373d')
    rect(this.d_X,this.腰_Y,this.进气格栅,25)
    fill('#f5f7fa')
    rect(this.d_X,this.腰_Y-5,this.进气格栅,0.5)
    rect(this.d_X,this.腰_Y-3,this.进气格栅,0.5)
    rect(this.d_X,this.腰_Y-1,this.进气格栅,0.5)
    rect(this.d_X,this.腰_Y+1,this.进气格栅,0.5)
    rect(this.d_X,this.腰_Y+3,this.进气格栅,0.5)
    rect(this.d_X,this.腰_Y+5,this.进气格栅,0.5)
    rect(this.d_X,this.腰_Y+7,this.进气格栅,0.5)
    rect(this.d_X,this.腰_Y+9,this.进气格栅,0.5)
    rect(this.d_X,this.腰_Y+11,this.进气格栅,0.5)
  //autobot align
  fill('grey')
  rect(this.d_X,this.腰_Y-9,10,4)
  fill('red')
  circle(this.d_X,this.腰_Y-9,2.5)

  
    //arm
    fill('#c70404')
    rect(this.left_shoulderX,this.left_shoulderY,18,18)
    fill('#b8bbbf')
    rect(this.left_shoulderX,this.left_shoulderY,18,5)
    rect(this.right_shoulderX,this.left_shoulderY,18,5)
        fill('#444547')
        rect(this.left_shoulderX,this.left_shoulderY+15,10,20)
        fill(0)
        rect(this.left_shoulderX-2,this.left_shoulderY+15,1,15)
        rect(this.left_shoulderX+2,this.left_shoulderY+15,1,15)
        fill('#131780')
        rect(this.left_shoulderX-4,this.left_shoulderY+13,7,5)
          //小臂
                fill('#c70404')
                rect(this.left_handX,this.left_handY,15,this.小臂长度)
                  //小臂上的圆盘
                  push()
                  strokeWeight(1)
                  stroke(0)
                  fill('grey')
                  ellipse(this.left_shoulderX-2,this.right_shoulderY+29,this.轮子宽度,9)  
                  pop()
        
                      fill('#c70404')
                      rect(this.right_shoulderX,this.right_shoulderY,18,18)
                      fill('#b8bbbf')
                      rect(this.right_shoulderX,this.left_shoulderY,18,5)
                          fill('#444547')
                          rect(this.right_shoulderX,this.right_shoulderY+15,10,20)
                          fill(0)
                          rect(this.right_shoulderX-2,this.right_shoulderY+15,1,15)
                          rect(this.right_shoulderX+2,this.right_shoulderY+15,1,15)
                          fill('#131780')
                          rect(this.right_shoulderX+4,this.right_shoulderY+13,7,5)
                        
                          //小臂
                           fill('#c70404')
                           rect(this.right_handX,this.right_handY,15,this.小臂长度)
                                  
                                      //小臂上的圆盘
                                        push()
                                        strokeWeight(1)
                                        stroke(0)
                                      fill('grey')
                                        ellipse(this.right_shoulderX+2,this.right_shoulderY+29,this.轮子宽度,9)
                                        pop()

//left leg
fill('#b3b4b5')
rect(this.left_legX,this.left_legY,12,this.大腿长度)

//right leg
fill('#b3b4b5')
rect(this.right_legX,this.right_legY,12,this.大腿长度)

//裤裆
fill('#494c52')
rect(this.d_X,this.d_Y,30,10)
fill('#929396')
rect(this.d_X,this.d_Y,10,15)
// rect(this.d_X,this.d_Y,10,15)
// push()
//     translate(this.d_X,this.d_Y)
    
//     rotate(100*90*this.velocity/3)
//     rect(0,0,10,15)
// pop()

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
  }
  transform(){
    //sqeeze
    
      this.left_winX += this.velocity
      this.left_armX += this.velocity
      this.left_handX += this.velocity
      this.left_legX += this.velocity
      this.left_shoulderX += this.velocity
      this.left_smalllegY -= this.velocity*15
      this.left_footY -= this.velocity*20
      
      
      this.right_winX -= this.velocity
      this.right_armX -= this.velocity
      this.right_handX -= this.velocity
      this.right_legX -= this.velocity
      this.right_shoulderX -= this.velocity
      this.right_smalllegY -= this.velocity*15
      this.right_footY -= this.velocity*20
    //head movements
    this.head_Y += this.velocity*6
    //arm movements
    this.left_shoulderX += this.velocity*4
    this.left_handX += this.velocity*4.2
    this.left_shoulderY += this.velocity*5
    this.left_legY -= this.velocity*7
    

    this.right_shoulderX -= this.velocity*4
    this.right_handX -= this.velocity*4.2
    this.right_shoulderY += this.velocity*5
    this.right_legY -= this.velocity*7

    this.小臂长度 -= this.velocity*2
    this.轮子宽度 -= this.velocity
    this.进气格栅 += this.velocity
    this.小腿长度 -= this.velocity*10
    this.大腿长度 -= this.velocity*7
  if(this.left_winX > -17 && this.right_winX < 17) { 
      if(this.left_winX >= -12.5 && this.right_winX <= 12.5){
        this.velocity *= -1
      }
 
    
  }else{
    this.velocity *= -1
   }
      
    
    
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
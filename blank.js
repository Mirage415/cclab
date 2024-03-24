let ball1, ball2
function setup(){
    createCanvas(400,400)
    ball1 = new ball(200,200,20,30,40,100,200,100)
    ball2 = new ball(200,200,20,10,12,310,122,310,213)
}
function draw(){
    background(200)
    ball1.display()
    ball1.bounce()
    ball1.move()
    ball2.display()
    ball2.bounce()
    ball2.move()
}
class ball{
constructor(x,y,xSpd,ySpd,dia,r,g,b){
    this.xPos = x
    this.yPos = y
    this.xSpd = xSpd
    this.ySpd = ySpd
    this.dia = dia
    this.r = r
    this.g = g
    this.b = b
}
move(){
this.xPos += this.xSpd
this.yPos += this.ySpd
}
bounce(){
if(this.xPos >= width || this.xPos<=0){
    this.xSpd *= -1
}
if(this.yPos >= height || this.yPos<=0){
    this.ySpd *= -1
}
}
display(){
    fill(this.r,this.g,this.b)
    circle(this.xSpd,this.ySpd,this.dia)
}
}
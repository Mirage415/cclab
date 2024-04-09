let particle = []
function setup(){
    createCanvas(400,400)
    background(50)
}
function draw(){
    background(50)
    particle.push(new particles(mouseX,mouseY))
    for (let i = 0; i < particle.length; i += 2){
        let b = particle[i]
        b.move()
        b.check_out()
        b.display()

    }
    for (let j = particle.length - 1; j >= 0; j --){
         let b = particle[j]
         if(b.isdone == true){
            particle.splice(i,1)
         }
    }

}
class particles{
    constructor(x,y){
        this.x = x
        this.y = y
        this.dia = random(0.9,5)
        this.xSpd = random(-5,5)
        this.ySpd = random(-5,5)
        this.isDone = false
        this.r = random(255)
        this.g = random(255)
        this.b = random(255)
    }
    check_out(){
        if(this.x < 0 || this.x > width){
            this.isDone = true
        }
        if(this.y < 0 || this.y > height){
            this.isDone = true
        }
    }
    move(){
        this.x += this.xSpd
        this.y += this.ySpd
    }
    display(){
        noStroke()
        fill(255)
        ellipse(this.x,this.y,this.dia,this.dia)
        // fill('orange')
        // ellipse(this.x,this.y,random(2,3)*this.dia,random(2,3)*this.dia)
        
    }
}
let ball;
let ball2;
let balls = [];
let totalNum = 20
function setup() {
    let canvas = createCanvas(400, 400)
    canvas.parent("p5-canvas-container")
    background(220)
    ball = new Ball(200, 100)
    ball2 = new Ball(100, 200)
    for (let i = 0; i < totalNum; i++) {
        let b = new Ball(random(width), random(height));
        balls.push(b)
    }
}
function draw() {
    background(200)
    ball.move
    ball.display
    // let v = mic.getLevel()
    // let s = mic.openSound()
}
class Ball {
    constructor(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
        this.xSpd = random(-3, 3)
        this.ySpd = random(-3, 3)
        this.size = random(5, 50)
        this.color = [random(255), random(255), random(255)];
    }
    move() {
        this.x += this.xSpd
        this.y += this.ySpd
    }
    display() {
        fill(this.color[0], this.color[1], this.color[2])
        circle(this.x, this.y, this.size)
    }
    bounce() {
        if (this.x > width || this.x < 0) {
            this.xSpd *= -1
        }
        if (this.y > width || this.y < 0) {
            this.ySpd *= -1
        }
    }
}

// 在class中，用random定义速度，在Ball中， x += xSpd, y += ySpd
//diameter random
// 用array+for循环组合，用if statement决定什么时候splice第一个
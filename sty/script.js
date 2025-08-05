let fireworks = [];
let particles = [];
let backgroundParticles = [];
let backgroundCurves = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 100);
    
    // 初始化背景粒子
    for (let i = 0; i < 50; i++) {
        backgroundParticles.push(new BackgroundParticle());
    }
    
    // 初始化背景曲线
    for (let i = 0; i < 8; i++) {
        backgroundCurves.push(new BackgroundCurve());
    }
}

function draw() {
    // 创建渐变背景
    drawGradientBackground();
    
    // 绘制背景曲线
    updateBackgroundCurves();
    
    // 绘制背景粒子
    updateBackgroundParticles();
    
    // 随机创建烟花
    if (random(1) < 0.02) {
        fireworks.push(new Firework());
    }
    
    // 更新和显示烟花
    updateFireworks();
    
    // 添加一些闪烁的星星
    drawStars();
}

function drawGradientBackground() {
    for (let i = 0; i <= height; i++) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(color(220, 40, 25), color(260, 60, 35), inter);
        stroke(c);
        line(0, i, width, i);
    }
}

function updateBackgroundParticles() {
    for (let i = backgroundParticles.length - 1; i >= 0; i--) {
        let p = backgroundParticles[i];
        p.update();
        p.show();
        
        if (p.isDead()) {
            backgroundParticles.splice(i, 1);
            backgroundParticles.push(new BackgroundParticle());
        }
    }
}

function updateBackgroundCurves() {
    for (let curve of backgroundCurves) {
        curve.update();
        curve.show();
    }
}

function updateFireworks() {
    for (let i = fireworks.length - 1; i >= 0; i--) {
        let fw = fireworks[i];
        fw.update();
        fw.show();
        
        if (fw.isDead()) {
            fireworks.splice(i, 1);
        }
    }
}

// function drawStars() {
//     if (frameCount % 30 === 0) {
//         for (let i = 0; i < 3; i++) {
//             let x = random(width);
//             let y = random(height * 0.3);
//             let size = random(1, 3);
            
//             push();
//             translate(x, y);
//             fill(60, 20, 100, 80);
//             noStroke();
            
//             for (let j = 0; j < 8; j++) {
//                 rotate(PI / 4);
//                 ellipse(size, 0, size * 0.5, size * 2);
//             }
//             pop();
//         }
//     }
// }
function drawStars(){
    stars = [];
    starsx = [];
    starsy = [];
    

    
}

// 烟花类
class Firework {
    constructor() {
        this.rocket = new Particle(random(width), height, random(0, 360), true);
        this.exploded = false;
        this.particles = [];
        this.hue = random(360);
        this.explodeHeight = random(height * 0.2, height * 0.7); // 随机爆炸高度
    }
    
    update() {
        if (!this.exploded) {
            this.rocket.applyForce(createVector(0, -0.2));
            this.rocket.update();
            
            // 在随机高度爆炸，而不是等速度为0
            if (this.rocket.pos.y <= this.explodeHeight) {
                this.explode();
            }
        }
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    explode() {
        this.exploded = true;
        let particleCount = random(80, 150);
        
        for (let i = 0; i < particleCount; i++) {
            let angle = map(i, 0, particleCount, 0, TWO_PI);
            let speed = random(2, 8);
            let p = new Particle(
                this.rocket.pos.x,
                this.rocket.pos.y,
                this.hue + random(-30, 30),
                false,
                speed,
                angle
            );
            this.particles.push(p);
        }
    }
    
    show() {
        if (!this.exploded) {
            this.rocket.show();
        }
        
        for (let p of this.particles) {
            p.show();
        }
    }
    
    isDead() {
        return this.exploded && this.particles.length === 0;
    }
}

// 粒子类
class Particle {
    constructor(x, y, hue, isRocket = false, speed = null, angle = null) {
        this.pos = createVector(x, y);
        this.isRocket = isRocket;
        this.hue = hue;
        this.lifespan = 100;
        this.maxLifespan = 100;
        
        if (isRocket) {
            this.vel = createVector(0, random(-12, -8));
            this.acc = createVector(0, 0);
        } else {
            if (speed && angle !== null) {
                this.vel = createVector(cos(angle) * speed, sin(angle) * speed);
            } else {
                this.vel = p5.Vector.random2D();
                this.vel.mult(random(2, 10));
            }
            this.acc = createVector(0, 0);
        }
    }
    
    applyForce(force) {
        this.acc.add(force);
    }
    
    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        
        if (!this.isRocket) {
            this.applyForce(createVector(0, 0.1)); // 重力
            this.vel.mult(0.98); // 阻力
            this.lifespan -= 1.5;
        }
    }
    
    show() {
        push();
        translate(this.pos.x, this.pos.y);
        
        if (this.isRocket) {
            // 火箭尾迹
            strokeWeight(4);
            stroke(this.hue, 100, 100);
            point(0, 0);
            
            // 添加尾迹效果
            for (let i = 1; i < 10; i++) {
                let alpha = map(i, 1, 10, 100, 0);
                stroke(this.hue, 80, 80, alpha);
                point(0, i * 3);
            }
        } else {
            // 爆炸粒子
            let alpha = map(this.lifespan, 0, this.maxLifespan, 0, 100);
            let size = map(this.lifespan, 0, this.maxLifespan, 1, 6);
            
            fill(this.hue, 80, 100, alpha);
            noStroke();
            ellipse(0, 0, size);
            
            // 添加光晕效果
            fill(this.hue, 40, 100, alpha * 0.3);
            ellipse(0, 0, size * 2);
        }
        pop();
    }
    
    isDead() {
        return this.lifespan <= 0;
    }
}

// 背景粒子类
class BackgroundParticle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
        this.size = random(1, 3);
        this.hue = random(180, 280);
        this.brightness = random(50, 80);
        this.alpha = random(30, 70);
        this.life = random(300, 600);
        this.maxLife = this.life;
    }
    
    update() {
        this.pos.add(this.vel);
        this.life--;
        
        // 边界检查
        if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
        if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
        
        // 保持在画布内
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
    }
    
    show() {
        let alpha = map(this.life, 0, this.maxLife, 0, this.alpha);
        
        push();
        translate(this.pos.x, this.pos.y);
        fill(this.hue, 60, this.brightness, alpha);
        noStroke();
        ellipse(0, 0, this.size);
        pop();
    }
    
    isDead() {
        return this.life <= 0;
    }
}

// 背景曲线类
class BackgroundCurve {
    constructor() {
        this.points = [];
        this.numPoints = random(4, 8);
        this.hue = random(180, 320);
        this.brightness = random(20, 40);
        this.alpha = random(15, 35);
        this.thickness = random(1, 3);
        this.speed = random(0.005, 0.02);
        this.offset = random(TWO_PI);
        this.type = floor(random(2)); // 只保留 0: 贝塞尔曲线, 1: 正弦波
        
        // 为正弦波预设固定参数
        this.wavelength = random(100, 300);
        this.amplitude = random(50, 150);
        this.baseY = random(height * 0.2, height * 0.8);
        
        // 初始化控制点
        for (let i = 0; i < this.numPoints; i++) {
            this.points.push({
                x: map(i, 0, this.numPoints - 1, -width * 0.2, width * 1.2),
                y: random(height),
                offsetX: random(TWO_PI),
                offsetY: random(TWO_PI),
                amplitudeX: random(50, 150),
                amplitudeY: random(30, 100)
            });
        }
    }
    
    update() {
        this.offset += this.speed;
        
        // 更新控制点位置
        for (let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            point.offsetX += this.speed * 0.5;
            point.offsetY += this.speed * 0.3;
        }
    }
    
    show() {
        push();
        strokeWeight(this.thickness);
        stroke(this.hue, 60, this.brightness + 100, this.alpha);
        noFill();
        
        if (this.type === 0) {
            this.drawBezierCurve();
        } else if (this.type === 1) {
            this.drawSineWave();
        }
        
        pop();
    }
    
    drawBezierCurve() {
        if (this.points.length < 4) return;
        
        beginShape();
        noFill();
        
        // 计算动态控制点位置
        let dynamicPoints = [];
        for (let point of this.points) {
            dynamicPoints.push({
                x: point.x + sin(point.offsetX) * point.amplitudeX * 0.3,
                y: point.y + cos(point.offsetY) * point.amplitudeY * 0.3
            });
        }
        
        // 绘制平滑的贝塞尔曲线
        vertex(dynamicPoints[0].x, dynamicPoints[0].y);
        
        for (let i = 1; i < dynamicPoints.length - 2; i++) {
            let xc = (dynamicPoints[i].x + dynamicPoints[i + 1].x) / 2;
            let yc = (dynamicPoints[i].y + dynamicPoints[i + 1].y) / 2;
            quadraticVertex(dynamicPoints[i].x, dynamicPoints[i].y, xc, yc);
        }
        
        // 最后一段
        if (dynamicPoints.length >= 2) {
            let last = dynamicPoints.length - 1;
            quadraticVertex(
                dynamicPoints[last - 1].x, 
                dynamicPoints[last - 1].y,
                dynamicPoints[last].x, 
                dynamicPoints[last].y
            );
        }
        
        endShape();
    }
    
    drawSineWave() {
        beginShape();
        noFill();
        
        for (let x = -50; x <= width + 50; x += 5) {
            let y = this.baseY + sin((x / this.wavelength) + this.offset * 3) * this.amplitude;
            vertex(x, y);
        }
        
        endShape();
    }
}

// 鼠标点击创建烟花
function mousePressed() {
    fireworks.push(new Firework());
}

// 窗口大小改变时重新调整画布
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
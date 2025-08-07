let fireworks = [];
let particles = [];
let backgroundParticles = [];
let backgroundCurves = [];
let floatingOrbs = [];
let sparkles = [];
let aurora = [];
let nebula = [];

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
    
    // 初始化漂浮光球
    for (let i = 0; i < 12; i++) {
        floatingOrbs.push(new FloatingOrb());
    }
    
    // 初始化闪烁粒子
    for (let i = 0; i < 80; i++) {
        sparkles.push(new Sparkle());
    }
    
    // 初始化极光效果
    for (let i = 0; i < 3; i++) {
        aurora.push(new Aurora());
    }
    
    // 初始化星云效果
    for (let i = 0; i < 15; i++) {
        nebula.push(new NebulaParticle());
    }
}

function draw() {
    // 创建渐变背景
    drawGradientBackground();
    
    // 绘制星云效果
    updateNebula();
    
    // 绘制极光效果
    updateAurora();
    
    // 绘制背景曲线
    updateBackgroundCurves();
    
    // 绘制漂浮光球
    updateFloatingOrbs();
    
    // 绘制背景粒子
    updateBackgroundParticles();
    
    // 绘制闪烁粒子
    updateSparkles();
    
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

function updateFloatingOrbs() {
    for (let orb of floatingOrbs) {
        orb.update();
        orb.show();
    }
}

function updateSparkles() {
    for (let i = sparkles.length - 1; i >= 0; i--) {
        let sparkle = sparkles[i];
        sparkle.update();
        sparkle.show();
        
        if (sparkle.isDead()) {
            sparkles.splice(i, 1);
            sparkles.push(new Sparkle());
        }
    }
}

function updateAurora() {
    for (let aur of aurora) {
        aur.update();
        aur.show();
    }
}

function updateNebula() {
    for (let neb of nebula) {
        neb.update();
        neb.show();
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
function drawStars() {
    // 绘制静态星星背景
    if (frameCount % 120 === 0) { // 每2秒更新一次星星位置
        push();
        for (let i = 0; i < 15; i++) {
            let x = random(width);
            let y = random(height * 0.4); // 主要在上半部分
            let size = random(1, 3);
            let brightness = random(60, 100);
            let twinkle = sin(frameCount * 0.1 + i) * 0.3 + 0.7;
            
            fill(50, 30, brightness, 80 * twinkle);
            noStroke();
            
            // 绘制星形
            translate(x, y);
            for (let j = 0; j < 6; j++) {
                rotate(PI / 3);
                ellipse(size * twinkle, 0, size * 0.3, size * 1.5);
            }
            resetMatrix();
        }
        pop();
    }
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

// 漂浮光球类 - 大型发光球体缓慢漂浮
class FloatingOrb {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-0.3, 0.3), random(-0.3, 0.3));
        this.size = random(20, 60);
        this.hue = random(180, 320);
        this.brightness = random(60, 90);
        this.alpha = random(20, 40);
        this.pulseSpeed = random(0.01, 0.03);
        this.pulseOffset = random(TWO_PI);
        this.glowIntensity = random(0.5, 1.2);
    }
    
    update() {
        this.pos.add(this.vel);
        this.pulseOffset += this.pulseSpeed;
        
        // 边界反弹
        if (this.pos.x < -this.size || this.pos.x > width + this.size) {
            this.vel.x *= -1;
        }
        if (this.pos.y < -this.size || this.pos.y > height + this.size) {
            this.vel.y *= -1;
        }
        
        // 保持在边界内
        this.pos.x = constrain(this.pos.x, -this.size/2, width + this.size/2);
        this.pos.y = constrain(this.pos.y, -this.size/2, height + this.size/2);
    }
    
    show() {
        let pulse = sin(this.pulseOffset) * 0.3 + 0.7;
        let currentSize = this.size * pulse;
        let currentAlpha = this.alpha * pulse;
        
        push();
        translate(this.pos.x, this.pos.y);
        
        // 外层光晕
        for (let r = currentSize * 2; r > 0; r -= 3) {
            let alpha = map(r, 0, currentSize * 2, currentAlpha, 0);
            fill(this.hue, 50, this.brightness, alpha * 0.3);
            noStroke();
            ellipse(0, 0, r);
        }
        
        // 核心光球
        fill(this.hue, 30, 100, currentAlpha);
        ellipse(0, 0, currentSize * 0.3);
        
        pop();
    }
}

// 闪烁粒子类 - 小型快速闪烁的星星
class Sparkle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.hue = random(40, 60); // 偏金色
        this.life = random(60, 120);
        this.maxLife = this.life;
        this.twinkleSpeed = random(0.1, 0.3);
        this.twinkleOffset = random(TWO_PI);
        this.size = random(1, 4);
    }
    
    update() {
        this.life--;
        this.twinkleOffset += this.twinkleSpeed;
        
        // 轻微漂移
        this.pos.x += sin(frameCount * 0.01 + this.pos.y * 0.01) * 0.1;
        this.pos.y += cos(frameCount * 0.008 + this.pos.x * 0.01) * 0.05;
    }
    
    show() {
        let twinkle = abs(sin(this.twinkleOffset));
        let alpha = map(this.life, 0, this.maxLife, 0, 80) * twinkle;
        
        if (alpha > 5) {
            push();
            translate(this.pos.x, this.pos.y);
            
            // 星形闪烁
            strokeWeight(1);
            stroke(this.hue, 60, 100, alpha);
            
            for (let i = 0; i < 4; i++) {
                rotate(PI / 4);
                line(-this.size * twinkle, 0, this.size * twinkle, 0);
            }
            
            // 中心点
            fill(this.hue, 40, 100, alpha);
            noStroke();
            ellipse(0, 0, this.size * 0.5 * twinkle);
            
            pop();
        }
    }
    
    isDead() {
        return this.life <= 0;
    }
}

// 极光类 - 波浪状的极光效果
class Aurora {
    constructor() {
        this.baseY = random(height * 0.1, height * 0.4);
        this.hue = random(120, 200); // 绿蓝色调
        this.amplitude = random(50, 120);
        this.wavelength = random(150, 300);
        this.speed = random(0.005, 0.015);
        this.offset = random(TWO_PI);
        this.alpha = random(15, 35);
        this.thickness = random(30, 80);
    }
    
    update() {
        this.offset += this.speed;
    }
    
    show() {
        push();
        noFill();
        
        // 绘制多层极光条带
        for (let layer = 0; layer < 5; layer++) {
            let layerAlpha = this.alpha * (1 - layer * 0.15);
            let layerOffset = this.baseY + layer * 15;
            let layerThickness = this.thickness * (1 - layer * 0.1);
            
            strokeWeight(layerThickness / 5);
            stroke(this.hue + layer * 10, 80, 80, layerAlpha);
            
            beginShape();
            noFill();
            
            for (let x = -50; x <= width + 50; x += 8) {
                let wave1 = sin((x / this.wavelength) + this.offset) * this.amplitude;
                let wave2 = sin((x / (this.wavelength * 0.7)) + this.offset * 1.3) * this.amplitude * 0.5;
                let y = layerOffset + wave1 + wave2;
                curveVertex(x, y);
            }
            
            endShape();
        }
        
        pop();
    }
}

// 星云粒子类 - 气体云状效果
class NebulaParticle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-0.2, 0.2), random(-0.2, 0.2));
        this.size = random(40, 120);
        this.hue = random(280, 320); // 紫色调
        this.brightness = random(30, 60);
        this.alpha = random(8, 20);
        this.noiseOffset = random(1000);
        this.morphSpeed = random(0.002, 0.008);
    }
    
    update() {
        // 使用噪声函数创建有机运动
        let noiseX = noise(this.noiseOffset) * 2 - 1;
        let noiseY = noise(this.noiseOffset + 100) * 2 - 1;
        
        this.vel.add(noiseX * 0.01, noiseY * 0.01);
        this.vel.mult(0.98); // 阻尼
        this.pos.add(this.vel);
        
        this.noiseOffset += this.morphSpeed;
        
        // 边界循环
        if (this.pos.x < -this.size) this.pos.x = width + this.size;
        if (this.pos.x > width + this.size) this.pos.x = -this.size;
        if (this.pos.y < -this.size) this.pos.y = height + this.size;
        if (this.pos.y > height + this.size) this.pos.y = -this.size;
    }
    
    show() {
        push();
        translate(this.pos.x, this.pos.y);
        
        // 创建气体云效果
        let morphFactor = noise(this.noiseOffset) * 0.5 + 0.75;
        let currentSize = this.size * morphFactor;
        
        // 多层渲染创建深度感
        for (let i = 0; i < 8; i++) {
            let layerSize = currentSize * (1 - i * 0.1);
            let layerAlpha = this.alpha * (1 - i * 0.12);
            
            fill(this.hue + i * 5, 60, this.brightness, layerAlpha);
            noStroke();
            
            // 使用噪声创建不规则形状
            beginShape();
            for (let angle = 0; angle < TWO_PI; angle += 0.2) {
                let r = layerSize + sin(angle * 3 + this.noiseOffset * 2) * layerSize * 0.2;
                let x = cos(angle) * r;
                let y = sin(angle) * r;
                vertex(x, y);
            }
            endShape(CLOSE);
        }
        
        pop();
    }
}
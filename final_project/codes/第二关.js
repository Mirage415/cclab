// Optimus first warn you of Megatron, Megatron speaks, Prime fights Megatron.
// Prime can not defeat Megatron, you reinforce Prime to keep fighting.
// Defeat Megatron
let player;
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;
let bullets = [];
let pattern;
let seeker1;
let seeker2;
let seeker3;
let seeker4;
let seeker5;
let seeker6;
let seeker7;
let seeker8;
let seeker9;
let seeker10;
let allSeeker = [];
let verticalOffset = 0;
let scrollSpeed = 1;
let megatron_;
let bullet;
let fire = [];
let explosionX;
let explosionY;
let megatron_damage = [];
let hp;

function preload() {
  firing = loadImage("../resources/炮弹1.png");
  firingSound = loadSound("../resources/firing_sound.mp3");
  rocket = loadImage("../resources/飞炮火箭.png");
  texture_metal = loadImage("../resources/金属材质.jpeg");
  transforming = loadSound("../resources/transform_sound1.mp3");
  explosion = loadImage("../resources/explosion_1.gif");
  backgroundImage = loadImage("../resources/bgi.jpeg");
  megatron = loadImage("../resources/megatron.png");
  finalBgm = loadSound("../resources/finalBattle.mp3");
  // laser = loadImage("/resources/laser.png");
  energyExplosion = loadImage("../resources/energyExplosion.png");
  megatronCannon = loadSound("../resources/megatronCannon.mp3");
  engineSound = loadSound("../resources/engine.mp3");
 
  // rocketSound =
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  finalBgm.setVolume(2);
  const x0 = width / 2;
  const y0 = height - 200;
  player = new Player(x0, y0);
  hp = new 血条(width / 2, 200, 100, 20);
  // seeker1 = new seekers(400,0);
  // seeker2 = new seekers(800,-100)
  // seeker3 = new seekers(600,-300)
  // seeker4 = new seekers(900,-600)
  // seeker5 = new seekers(200,-900)
  // seeker6 = new seekers(300,-1200)
  // seeker7 = new seekers(100,-1400)
  // seeker8 = new seekers(500,-1600)
  // seeker9 = new seekers(700,-1800)
  // seeker10 = new seekers(600,-2000)

  for (let i = 0; i <= 20; i++) {
    let s = new seekers(random(100, 900), random(0, -1000));
    allSeeker.push(s);
  }
  megatron_ = new Megatron(width / 2, -100);
  rectMode(CENTER);
  angleMode(DEGREES);
  pattern = createGraphics(200, 200);
  pattern.image(texture_metal, 0, 0, 200, 200);

  // textureGraphic = createGraphics(player.size, player.size);
  // textureGraphic.background(255); // 设置背景为白色
  // textureGraphic.fill(255, 0, 0); // 设置图形颜色为红色
  // textureGraphic.ellipse(player.size / 2, player.size / 2, player.size, player.size); // 在绘图图形对象上绘制一个圆形
  // textureGraphic.noStroke(); // 取消绘图图形对象的描边
  // textureGraphic.texture(texture_metal); // 应用纹理到绘图图形对象
}

function draw() {
  text(mouseX, mouseY, 500, 500);
  background(255);
  if (!finalBgm.isPlaying()) {
    finalBgm.play();
  }
  // 计算背景图片的移动
  verticalOffset += scrollSpeed;

  // 绘制背景图片
  for (
    let y = -backgroundImage.height + (verticalOffset % backgroundImage.height);
    y < height;
    y += backgroundImage.height
  ) {
    for (
      let x = -backgroundImage.width;
      x < width;
      x += backgroundImage.width
    ) {
      image(
        backgroundImage,
        x,
        y,
        backgroundImage.width,
        backgroundImage.height
      );
    }
  }
  player.move();
  player.display();
  player.firing();

  player.transform();
  player.detect();
  megatron_.display();
  player.detectMegatron();
  megatron_.shoot();
  player.detectExplosion();

  // hp.decreaseHealth();
  // hp.display();
  // hp.checkCollision();
  // seeker1.display()
  // seeker1.firing();
  // for(let i; i >= 0 && i <= 10; i ++){
  //     seeker{i}.display()
  // }
  // seeker2.display();
  // seeker3.display();
  // seeker4.display()
  // seeker5.display()
  // seeker6.display()
  // seeker7.display()
  // seeker8.display()
  // seeker9.display()
  // seeker10.display()

  for (let i = 0; i < allSeeker.length; i++) {
    let a = allSeeker[i];
    a.display();
  }
  for (let i = 0; i < allSeeker.length; i++) {
    let d = dist(player.x, player.y, allSeeker[i].x, allSeeker[i].y);
    if (d < 20) {
      // 假设玩家和 seeker 的碰撞半径为 20
      // 停止显示玩家
      player.display_origin = false;
      // 在玩家原位置显示爆炸效果
      image(explosion, player.x - 50, player.y - 10, 200, 200);
    }
  }
  // if (frameCount == megatron_.time - 100 && !megatronCannon.isPlaying()) {
  //   megatronCannon.play();
  // }
  // player.detectExplosion(megatron_.fireX, megatron_.fireY); // 假设 explosion 的位置由 megatron 的火炮控制
if(player.current <= 1){
  win()
}
}

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    // this.color = "#2c3661";
    this.color = "#243b5e";
    this.speed = 5;
    // 设置腿部的坐标
    this.legX_left = this.x - 10;
    this.legX_right = this.x + 10;
    this.legY = this.y + 90;
    this.isRunning = false;
    this.timeline = 0;
    this.angle = 0;
    this.rotationSpeed = 20; // 增加旋转速度
    this.rotationFrames = 0; // 记录旋转帧数
    this.maxRotationFrames = 2; // 最大旋转帧数
    this.isRotating = false;
    this.display_origin = true;
    this.isVehicle = false;
    this.isdead = false;
    this.total = 10000;
    this.current = this.total;

    // this.bullets = [];
  }

  move() {
    if (moveUp) {
      this.y -= this.speed;
    }
    if (moveDown) {
      this.y += this.speed;
    }
    if (moveLeft) {
      this.x -= this.speed;
    }
    if (moveRight) {
      this.x += this.speed;
    }
    // 更新腿部的坐标
    this.legX_left = this.x - 10;
    this.legX_right = this.x + 10;
    this.legY = this.y + 60;
  }

  display() {
    if (this.display_origin == true) {
      fill(this.color);
      this.drawBody();
      engineSound.stop();
    } else {
    }
  }

  drawBody() {
    //draw head
    rect(this.x, this.y, this.size, this.size);
    //horns
    triangle(
      this.x + 5,
      this.y - 25,
      this.x + 5,
      this.y - 5,
      this.x + 8,
      this.y - 8
    );
    triangle(
      this.x - 5,
      this.y - 25,
      this.x - 5,
      this.y - 5,
      this.x - 8,
      this.y - 8
    );
    triangle(
      this.x - 20,
      this.y + 18,
      this.x - 25,
      this.y - 2,
      this.x - 20,
      this.y - 30
    );
    triangle(
      this.x + 20,
      this.y + 18,
      this.x + 25,
      this.y - 2,
      this.x + 20,
      this.y - 30
    );
    //draw shoulders
    triangle(
      this.x - 10,
      this.y,
      this.x - 10,
      this.y + 10,
      this.x - 20,
      this.y + 10
    );
    triangle(
      this.x - 10,
      this.y,
      this.x - 30,
      this.y + 20,
      this.x - 10,
      this.y + 10
    );

    triangle(
      this.x + 10,
      this.y,
      this.x + 10,
      this.y + 10,
      this.x + 20,
      this.y + 10
    );
    triangle(
      this.x - 10,
      this.y,
      this.x - 10,
      this.y + 10,
      this.x - 20,
      this.y + 10
    );
    //draw left arm
    rect(this.x - 35, this.y + 30, 15, 20);
    rect(this.x - 35, this.y + 50, 10, 30);
    push();
    fill("#83858f");
    beginShape();
    vertex(this.x - 40, this.y + 45);
    vertex(this.x - 48, this.y + 45);
    vertex(this.x - 48, this.y + 35);
    vertex(this.x - 50, this.y + 48);
    vertex(this.x - 35, this.y + 95);
    vertex(this.x - 35, this.y + 65);
    endShape();
    pop();
    //draw right arm
    rect(this.x + 35, this.y + 30, 15, 20);
    rect(this.x + 35, this.y + 10, 10, 30);
    //body

    rect(this.x, this.y + 30, 60, 40);
    push();
    fill("#3e424f");

    rect(this.x - 10, this.y + 30, 50, 10);

    rect(this.x + 10, this.y + 30, 30, 10);
    pop();
    //legs
    //left
    //big
    rect(this.legX_left, this.legY, 20, 30);
    //small
    rect(this.legX_left, this.legY + 30, 15, 25);
    //right
    //big
    rect(this.legX_right, this.legY, 20, 30);
    //small
    rect(this.legX_right, this.legY + 30, 15, 25);

    //draw chimneies
    fill("white");
    rect(this.x - 17, this.y + 18, 4, 40);
    rect(this.x + 17, this.y + 18, 4, 40);
    //draw gun
    push();
    fill("#584b75");
    noStroke();
    rect(this.x + 30, this.y - 5, 3, 13);
    rect(this.x + 40, this.y - 5, 3, 13);
    fill("#5a5d66");
    rect(this.x + 35, this.y - 4, 5, 20);
    pop();
    rect(this.x + 33, this.y - 4, 2, 10);
    rect(this.x + 37, this.y - 4, 2, 10);
    //draw details
    fill("grey");
    rect(this.x + 30, this.y + 25, 1, 9);
    rect(this.x - 30, this.y + 25, 1, 9);
    //draw the wings
    fill("#79a0d9");
    beginShape();
    vertex(this.x - 10, this.y + 20);
    vertex(this.x - 10, this.y + 40);
    vertex(this.x - 60, this.y + 20);
    vertex(this.x - 60, this.y - 10);
    endShape(CLOSE);
    beginShape();
    vertex(this.x + 10, this.y + 20);
    vertex(this.x + 10, this.y + 40);
    vertex(this.x + 60, this.y + 20);
    vertex(this.x + 60, this.y - 10);
    endShape(CLOSE);
    //wheels
    fill(0);
    ellipse(this.x - 15, this.y + 20, 20, 20);
    ellipse(this.x + 15, this.y + 20, 20, 20);
    fill("#a1a2a6");
    ellipse(this.x - 15, this.y + 20, 13, 13);
    ellipse(this.x + 15, this.y + 20, 13, 13);
  }

  firing() {
    if (this.display_origin == true) {
      if (mouseIsPressed) {
        if (firingSound.isPlaying() == false) {
          firingSound.play();
        }

        let bullet = {
          x: this.x + 35 - 10,
          y: this.y - 4 - 15,
          speed: 25,
        };
        bullets.push(bullet);
        push();
        noStroke();
        for (let i = 0; i < bullets.length; i++) {
          bullets[i].y -= bullets[i].speed;
          // fill("#fa8c16");
          image(firing, bullets[i].x + 3, bullets[i].y, 15, 30);
          // fill(255);
          // ellipse(bullets[i].x + 10, bullets[i].y, 6, 11);
        }
        pop();
      } else {
        firingSound.stop();
      }
    }
  }

  transform() {
    //开始变形的时候时间为0，经过2秒后变形完成

    if (keyIsDown(70)) {
      // 如果按住了 "f" 键
      this.display_origin = false;
      this.timeline = 0;
      if (transforming.isPlaying() == false) {
        transforming.play();
      }
    } else if (keyIsDown(71)) {
      this.display_origin = true;
      if (transforming.isPlaying() == false) {
        transforming.play();
      }
    }

    if (this.display_origin == false) {
      this.timeline++;
      if (this.timeline <= 25) {
        //wings

        if (!this.isRotating) {
          // 如果当前不在旋转状态
          this.isRotating = true; // 启动旋转
          this.rotationFrames = 0; // 重置旋转帧数
        }

        if (this.isRotating) {
          // 如果正在旋转
          // 根据旋转方向调整旋转角度
          this.angle += this.rotationSpeed;

          // 增加旋转帧数
          this.rotationFrames++;

          // 如果旋转帧数达到最大值，停止旋转
          if (this.rotationFrames >= this.maxRotationFrames) {
            this.isRotating = false; // 停止旋转
          }
        }

        //body
        if (this.display_origin == false) {
          push();
          translate(this.x, this.y + 20);

          rotate(this.angle); // 使用弧度直接进行旋转
          fill("#bfbcd6");
          beginShape();
          vertex(-10, 0);
          vertex(-10, 20);
          vertex(-60, 0);
          vertex(-60, -30);
          endShape(CLOSE);

          rotate(-2 * this.angle); // 使用弧度直接进行旋转
          beginShape();
          vertex(10, 0);
          vertex(10, 20);
          vertex(60, 0);
          vertex(60, -30);
          endShape(CLOSE);

          pop();
          fill(this.color);
          push(); //first this.x - 10
          translate(this.x - 10, this.y);
          rotate(this.angle);

          triangle(0, 0 - 40, 0, 0 + 10, -10, 0 + 10);
          triangle(0, 0 - 40, -20, 0 + 20, 0, 0 + 10);

          pop();

          push();

          fill("white");
          rect(
            this.x - 17 - sin(frameCount),
            this.y + 18 - 20 * sin(5 * frameCount),
            4,
            40
          );
          rect(
            this.x + 17 - sin(frameCount),
            this.y + 18 - 20 * sin(5 * frameCount),
            4,
            40
          );

          pop();

          push();
          translate(this.x, this.y);
          rotate((this.angle * -1) / 2);
          triangle(0 + 10, 0, 0 + 10, 0 + 10, 0 + 20, 0 + 10);
          triangle(0 - 10, 0, 0 - 10, 0 + 10, 0 - 20, 0 + 10);

          pop();
          //arms
          push();
          translate(this.x - 25, this.y + 30);
          rotate((1 / 2) * this.angle);
          rect(0 - 10, 0, 15, 20);
          pop();
          /////////////////////////////////////////////////////////////////////////
          push();
          translate(this.x - 35, this.y + 30);
          rotate(((this.angle * 1) / 3) * -1);
          rect(5, 20, 10, 30);
          rect(0, 20, 10, 30);
          pop();

          push();
          translate(this.x + 35, this.y + 30);
          rotate((this.angle * 1) / 3);
          rect(0, 0, 15, 20);
          rect(0, 20, 10, 30);
          pop();

          push();
          translate(this.x - 10, this.y + 30);
          rotate(this.angle);
          rect(0, 0, 30, 40);
          pop();

          push();
          translate(this.x + 10, this.y + 30);
          rotate(-this.angle);
          rect(0, 0, 30, 40);
          pop();
        }
      } else {
        // console.log(",")
        this.vehicle();
        this.isVehicle = true;
      }
    } else if (this.display_origin == true) {
      this.timeline++;
      if (this.timeline <= 25) {
        //wings

        if (!this.isRotating) {
          // 如果当前不在旋转状态
          this.isRotating = true; // 启动旋转
          this.rotationFrames = 0; // 重置旋转帧数
        }

        if (this.isRotating) {
          // 如果正在旋转
          // 根据旋转方向调整旋转角度
          this.angle += this.rotationSpeed;

          // 增加旋转帧数
          this.rotationFrames++;

          // 如果旋转帧数达到最大值，停止旋转
          if (this.rotationFrames >= this.maxRotationFrames) {
            this.isRotating = false; // 停止旋转
          }
        }

        //body
        if (this.display_origin == true) {
          push();
          translate(this.x, this.y + 20);

          rotate(-this.angle); // 使用弧度直接进行旋转
          fill("#bfbcd6");
          beginShape();
          vertex(-10, 0);
          vertex(-10, 20);
          vertex(-60, 0);
          vertex(-60, -30);
          endShape(CLOSE);

          rotate(2 * this.angle); // 使用弧度直接进行旋转
          beginShape();
          vertex(10, 0);
          vertex(10, 20);
          vertex(60, 0);
          vertex(60, -30);
          endShape(CLOSE);

          pop();
          fill(this.color);
          push(); //first this.x - 10
          translate(this.x - 10, this.y);
          rotate(-this.angle);

          triangle(0, 0 - 40, 0, 0 + 10, -10, 0 + 10);
          triangle(0, 0 - 40, -20, 0 + 20, 0, 0 + 10);

          pop();

          push();

          fill("white");
          rect(
            this.x - 17 - sin(frameCount),
            this.y + 18 - 20 * sin(5 * frameCount),
            4,
            40
          );
          rect(
            this.x + 17 - sin(frameCount),
            this.y + 18 - 20 * sin(5 * frameCount),
            4,
            40
          );

          pop();

          push();
          translate(this.x, this.y);
          rotate((this.angle * 1) / 2);
          triangle(0 + 10, 0, 0 + 10, 0 + 10, 0 + 20, 0 + 10);
          triangle(0 - 10, 0, 0 - 10, 0 + 10, 0 - 20, 0 + 10);

          pop();
          //arms
          push();
          translate(this.x - 25, this.y + 30);
          rotate((-1 / 2) * this.angle);
          rect(0 - 10, 0, 15, 20);
          pop();
          /////////////////////////////////////////////////////////////////////////
          push();
          translate(this.x - 35, this.y + 30);
          rotate((this.angle * 1) / 3);
          rect(5, 20, 10, 30);
          rect(0, 20, 10, 30);
          pop();

          push();
          translate(this.x + 35, this.y + 30);
          rotate((this.angle * -1) / 3);
          rect(0, 0, 15, 20);
          rect(0, 20, 10, 30);
          pop();

          push();
          translate(this.x - 10, this.y + 30);
          rotate(-this.angle);
          rect(0, 0, 30, 40);
          pop();

          push();
          translate(this.x + 10, this.y + 30);
          rotate(this.angle);
          rect(0, 0, 30, 40);
          pop();
        }
      } else {
        // console.log(",")
        // this.vehicle()
        this.isVehicle = false;
      }
    }
  }
  vehicle() {
    fill(this.color);
    push();
    translate(this.x, this.y);
    //main part
    beginShape();
    vertex(-20, 10);
    vertex(-10, -10);
    vertex(10, -10);
    vertex(20, 10);
    vertex(20, 40);
    vertex(-20, 40);
    endShape(CLOSE);
    //jets
    fill("grey");
    // rect(0, 20, 10, 10)
    rect(-8, 33, 8, 23);
    rect(8, 33, 8, 23);
    //details
    push();
    strokeWeight(0.8);
    stroke(255);
    rect(-9.5, 33, 1, 20);
    rect(-6.5, 33, 1, 20);
    rect(9.5, 33, 1, 20);
    rect(6.5, 33, 1, 20);
    pop();
    //wheels
    rectMode(CENTER);
    fill("black");
    rect(-24, 6, 8, 12);
    rect(24, 6, 8, 12);
    rect(-24, 36, 8, 12);
    rect(24, 36, 8, 12);
    pop();
    if (!engineSound.isPlaying()) {
      engineSound.play();
    }
  }
  detect() {
    for (let i = 0; i < allSeeker.length; i++) {
      let d = dist(this.x, this.y, allSeeker[i].x, allSeeker[i].y);
      if (d < 20) {
        // 假设玩家和 seeker 的碰撞半径为 20
        // 播放爆炸音效
        // explosionSound.play();
        // 播放爆炸动画并记录播放次数
        // this.explosionCount++;

        image(explosion, this.x - 50, this.y - 20, 200, 200);
        this.isdead = true;
        // 停止显示玩家
      }
    }
    for (let i = 0; i < allSeeker.length; i++) {
      let d = dist(this.x, this.y, allSeeker[i].x, allSeeker[i].rocket_y);
      if (d < 40) {
        // 假设玩家和火箭的碰撞半径为 40
        // 播放爆炸音效
        // explosionSound.play();
        // 播放爆炸动画并记录播放次数
        // this.explosionCount++;

        image(explosion, this.x - 50, this.y - 10, 200, 200);

        // 停止显示玩家
        this.isdead = true;
      }
    }

    this.die();
  }
  die() {
    if (this.isdead == true) {
      background("red");
      textFont("Courier New", 50);
      text("YOU LOST", width / 2 - 10, height / 2);
    }
  }
  detectMegatron() {
    for (let i = bullets.length - 1; i >= 0; i--) {
      let bullet = bullets[i];
      let d = dist(bullet.x, bullet.y, megatron_.x, megatron_.y);
      if (d < 100) {
        bullets.splice(i, 1);
        image(explosion, bullet.x - 150, bullet.y, 400, 400);
        this.decreaseHp();
        this.displayhp();
      }
    }
  }
  decreaseHp() {
    if (this.current > 0) {
      this.current -= 10; // 每次减1
    }
  }
  displayhp() {
    // 绘制背景
    fill(255); // 白色
    rect(width/2, 200, 200, 20);

    // 计算红色部分的宽度
    let healthWidth = map(this.current, 0, this.total, 0, 200);

    // 绘制红色部分
    fill(255, 0, 0); // 红色
    rect(width/2, 200, healthWidth, 20);
  }

  detectExplosion() {
    let d = dist(this.x, this.y, megatron_.fireX, megatron_.fireY);
    if (d < 100) {
      this.isdead = true;
      image(explosion, this.x, this.y, 300, 300);
      background("red");
      textFont("Courier New", 50);
      text("YOU LOST", width / 2 - 10, height / 2);
    }
  }
}

// 处理按键按下事件
function keyPressed() {
  handleMovement(true);
}

// 处理按键释放事件
function keyReleased() {
  handleMovement(false);
}

function handleMovement(value) {
  if (keyCode === UP_ARROW || key === "w") {
    moveUp = value;
  } else if (keyCode === DOWN_ARROW || key === "s") {
    moveDown = value;
  } else if (keyCode === LEFT_ARROW || key === "a") {
    moveLeft = value;
  } else if (keyCode === RIGHT_ARROW || key === "d") {
    moveRight = value;
  }
}

class seekers {
  constructor(x, y) {
    rectMode(CENTER);
    this.x = x;
    this.y = y;
    this.velocity = 2;
    this.rocket_y = y;
    this.shoot = false;
  }
  display() {
    //mainbody
    fill("#150426");
    rect(this.x, this.y, 40, 20);
    //guns
    rect(this.x - 10, this.y + 25, 7, 40);
    rect(this.x - 11.5, this.y + 47, 1.5, 9);
    rect(this.x - 8.5, this.y + 47, 1.5, 9);
    rect(this.x + 10, this.y + 25, 7, 40);
    rect(this.x + 11.5, this.y + 47, 1.5, 9);
    rect(this.x + 8.5, this.y + 47, 1.5, 9);
    //thruster
    fill("black");
    rect(this.x - 11, this.y - 13, 16, 26);
    rect(this.x + 11, this.y - 13, 16, 26);
    fill("#9b9a9c");
    rect(this.x - 11, this.y - 13, 18, 5);
    rect(this.x + 11, this.y - 13, 18, 5);
    this.move();
    this.firing();
  }
  move() {
    this.y += this.velocity;
  }
  firing() {
    if (frameCount % 4 == 0) {
      this.shoot = true;
    } else {
      this.shoot = false;
    }
    // if(this.shoot){
    this.rocket_y += this.velocity * 2;
    push();
    translate(this.x - 10, this.rocket_y);

    image(rocket, -60, 0, 150, 100);
    // pop()

    // push()

    // rotate(90)
    image(rocket, -80, 0, 150, 100);
    // }
    pop();
  }
}

class Megatron {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.theta = 0;
    this.fireX = 0;
    this.fireY = this.y;
    this.shoot_ = false;
    this.velocity = 5;
    this.time = 0;
  }
  display() {
    image(megatron, this.x - 400, this.y, 900, 800);
  }
  shoot() {
    if(player.current > 1){
      if (sin(frameCount) > 5.96 / 8) {
        this.shoot_ = true;
      } else {
        this.shoot_ = false;
      }
      if (this.shoot_) {
        this.fireX = this.x;
        // this.fireY = this.y;
        this.fireY += this.velocity * 2;
        fire.push(
          image(energyExplosion, this.fireX - 500, this.fireY - 100, 900, 900)
        );
        this.time = frameCount;
        if (frameCount === this.time && !megatronCannon.isPlaying()) {
          megatronCannon.play();
        }
        //relocate
        if (this.fireY >= windowHeight) {
          this.fireY = this.y;
        }
  
        //sound
      }
    }
    
  }
}
class 血条 {
  constructor(x, y, w, h) {
    this.total = 10000; // 初始总血量
    this.current = this.total; // 当前血量等于总血量
    this.x = x; // x坐标
    this.y = y; // y坐标
    this.width = w; // 血条宽度
    this.height = h; // 血条高度
  }

  // 当 bullet 与 Megatron 碰撞时减少血量
  decreaseHealth() {
    if (this.current > 0) {
      this.current -= 2; // 每次减1
    }
  }
  decreaseNothing() {
    this.current += 0;
  }

  // 碰撞检测
  checkCollision() {
    if (mouseIsPressed&&player.x >= megatron_.x - 500 && player.x <= megatron_.x - 300) {
     
        this.decreaseHealth();
       
      
    } else {
      this.decreaseNothing();
    }
  }

  // 绘制血条
  display() {
    // 绘制背景
    fill(255); // 白色
    rect(this.x, this.y, this.width, this.height);

    // 计算红色部分的宽度
    let healthWidth = map(this.current, 0, this.total, 0, this.width);

    // 绘制红色部分
    fill(255, 0, 0); // 红色
    rect(this.x, this.y, healthWidth, this.height);
  }
}
function win(){
  let time = 0
  time ++
 image(explosion,300,-400,900,900)
 if (time > 50){
  finalBgm.stop()
  fill(0)
  rect(width/2,height/2,windowWidth,windowHeight) 
 }
}
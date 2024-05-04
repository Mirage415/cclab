let x1 = 900;
let y1 = 800;
let found = [];
let x0 = [];
let y0 = [];
let numCircles = 10;

function preload() {
    iacon = loadImage("../resources/iacon.jpeg");
    prime = loadSound("../resources/goodwork.mp3")
}

function setup() {
    // Create a canvas
    let canvas_3 = createCanvas(1100, 950);
    canvas_3.parent('myCanvas');
    generateCoordinates();
    textFont('Arial');
} 

function draw() {
    background(0);
    vision_movement();
    image(iacon, 0 + x1, y1, width, height);
    drawCircles();
    displayText();

    if (numCircles == 0) {
        if (!prime.isPlaying()) {
            prime.play()
            if (!button) {
                button = createButton("PROCEED");
                button.position(width / 2, height * 3 / 4);
                button.mousePressed(moveOn);
                button.style('background-color', '#111a30');
                button.style('color', '#a3a5a8');
                button.style('font-size', '20px');
            }
        }
    }
}

function generateCoordinates() {
    for (let i = 0; i < numCircles; i++) {
        x0[i] = random(1000);
        y0[i] = random(600);
    }
}

function drawCircles() {
    for (let i = 0; i < numCircles; i++) {
        noStroke();
        fill("red");
        let ix = x0[i] + x1;
        let iy = y0[i] + y1;
        circle (ix,iy,6)
    }

}

function mousePressed() {
    for (let i = 0; i < numCircles; i++) {
        let d = dist(mouseX, mouseY, x0[i] + x1, y0[i] + y1);
        if (d < 3) {
            found_injuries(i);
            displayText()

        }
    }
}

function found_injuries(index) {
    found.push("1");
    x0.splice(index, 1);
    y0.splice(index, 1);


    numCircles = x0.length;
}

function vision_movement() {
    if (mouseX >= 0 && mouseX <= 900 && mouseY >= 0 && mouseY <= 900) {
        if (mouseX - pmouseX != 0) {
            x1 = -mouseX * 0.5;
            y1 = -mouseY * 0.9;
        }
    } else if (mouseX < 0 || mouseX > 950 || mouseY < 0 || mouseY > 900) {
        x1 += 0;
        y1 += 0;
    }
}
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        x1 += 10;
    } else if (keyCode === RIGHT_ARROW) {
        x1 -= 10;
    } else if (keyCode === UP_ARROW) {
        y1 += 10;
    } else if (keyCode === DOWN_ARROW) {
        y1 -= 10;
    }
}
function displayText() {
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(`You have saved ${found.length} trapped citizens！`, width / 2, height / 2);
}
function moveOn(){
    window.location.href = "https://mirage415.github.io/cclab/final_project/codes/%E7%AC%AC%E4%BA%8C%E5%85%B3.html"
}
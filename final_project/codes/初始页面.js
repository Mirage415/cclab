let background_music;
let background_photo_1;
let background_photo_2
let button;
let alphaValue = 255;
let x = 1

function preload() {
    background_music = loadSound("./resources/arrival_to_earth初始页面.mp3");
    background_photo_1 = loadImage("./resources/塞伯坦背景图.avif");
    background_photo_2 = loadImage("./resources/cybertron1.avif")
    // background_photo_3 = loadImage("/resources/")
    Optimus_monologue = loadSound("./resources/旁白.mp3");
   
    fight_1 = loadImage("./resources/gif1.gif")
    rollout = loadImage("./resources/rollout.gif")
    cons = loadImage("./resources/decepticons.gif")
    megatron = loadImage("./resources/megatron.gif")
    
}

function setup() {
    canvas_1 = createCanvas(windowWidth, windowHeight);


    imageMode(CENTER);

    background_music.setVolume(0.3);
    Optimus_monologue.setVolume(1);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
function draw() {
    background('black');
    if (frameCount <= 400){
         image(background_photo_1, width / 2, height / 2, width, height);
    }else if(frameCount > 400 && frameCount <= 900){
        image(background_photo_2,width / 2, height / 2, width, height)
    }else if(frameCount > 900 && frameCount <= 980){
        image(fight_1,width / 2, height / 2, width/2, height/2)
    }else if(frameCount > 980 && frameCount <= 1300){
        image(rollout,  width / 2, height / 2 + 20, width, height)
    }else if (frameCount > 1300 && frameCount <= 1500){
        image(cons,width / 2, height / 2 + 20, width, height)
    }else if (frameCount > 1500 && frameCount <= 1700){
        image(megatron,width / 2, height / 2 + 20, width, height)
    }
   

    if (!Optimus_monologue.isPlaying() && frameCount >= 200) {
        if (!button) {
            button = createButton("PROCEED");
            button.position(width / 2, height * 3 / 4);
            button.mousePressed(close_page);
            button.style('background-color', '#111a30');
            button.style('color', '#a3a5a8');
            button.style('font-size', '20px');
        }
    }

    if (alphaValue <= 255) {
        alphaValue += 1;
        background(0, alphaValue);
    }
    if (alphaValue >= 249 && x == 2) {
        alphaValue = 255
        background_music.stop()
        Optimus_monologue.stop()

        // canvas_1.remove()
        button.remove()
        // 第一关main()
    }


}
///////////////////////////////////////////////////////////////////////////////////////////////////
function mousePressed() {
    if (!background_music.isPlaying() && !Optimus_monologue.isPlaying()) {
        background_music.play();
        Optimus_monologue.play();
    }
}

function close_page() {
    alphaValue = 0;
    x += 1
    window.location.href = "https://mirage415.github.io/cclab/final_project/codes/%E7%AC%AC%E4%B8%80%E5%85%B3index.html"

}






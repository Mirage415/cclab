let Optimus_transform;
let transform_sound;
let mission1;
let prime1;
let 台词

function preload() {
    Optimus_transform = loadImage("../resources/擎天柱变形.GIF");
    transform_sound = loadSound("../resources/变形音效.mp3");
    mission1 = loadSound("../resources/任务1.mp3");
    prime1 = loadImage("../resources/optimus1.png");
    nametag = loadImage("../resources/namecard.png")
    bg = loadImage("../resources/Optimus_bg.jpeg")
}

function setup() {
    canvas_2 = createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    台词 = "Soldier, our war wages on. Your mission is to defend the city, evacuate the citizens, and stop any Decepticons from getting inside. "
}

function draw() {
//    background(CLEAR);
// imageMode(CORNER);
push ()
imageMode(CORNER)
    background(bg);
pop ()

//    image(bg,0,0,windowWidth,windowHeight);
   if (frameCount < 400){
    擎天柱变形();
   }
        
       else if (frameCount >= 400){
        // Optimus_transform.stop()
        transform_sound.stop()
        布置任务();
        对话框(width / 3, height)
        
       }
}

function 擎天柱变形() {
    imageMode(CENTER);
    image(Optimus_transform, width / 2, height / 2, width/2 , height/2 );
    if (!transform_sound.isPlaying()) {
        transform_sound.play();
    }
}

function 布置任务() {
    
    image(prime1, width / 3, height, 500, 850); 
    if (!mission1.isPlaying()) {
        mission1.play();
    }
    字幕()
}
function 字幕(){
    for (let i; i < 台词.length; i ++){
        fill(255)
        text (台词[i],width/2,height/2)
    }
}
function 对话框(x,y){
    if(prime1){
        image(nametag,x+400,y-100,400,120)
        textSize(30)
        // textFont()
        fill(255)
        text("Optimus Prime",x+300,y-100)
    }
}
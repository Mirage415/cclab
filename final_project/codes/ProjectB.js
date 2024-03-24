function preload(){
background_music = loadSound("BGM.mp3");
// console.log('loaded ');

}
function setup(){
    createCanvas(800,500);
}
function draw(){
    background();

}
function mousePressed(){
    background_music.play();

}
// customized functions below
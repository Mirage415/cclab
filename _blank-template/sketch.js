function preload(){
  background_music = loadSound("BGM.mp3");
  console.log('loaded ');
  
  }
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("p5-canvas-container");
  background(220);
}

function draw() {
  //
}
function mousePressed(){
  background_music.play();

}
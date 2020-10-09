
let phase = 0;
let zoff = 0;
let slider;
var song;
var analyzer;
var fft;
angleMode (DEGREES);
//var volhis = [];
function preload(){ //use for bigger size files
  
   song = loadSound('data/PianoPlayer.mp3'); //need directory /data
   
}
function setup() {
  
  createCanvas(windowWidth, windowHeight); //full window canvas
  background(223,190,246);
 // fill(240);
  //song.loop();
  fft = new p5.FFT(0.99);
  fft.setInput(song);
  //fft.analyze(song);
  analyzer = new p5.Amplitude();  // set analyzer to check amplitude
  analyzer.setInput(song);
}


function draw() {
  background(245);
  let spectrum = fft.analyze();
  var volume = analyzer.getLevel(); //extracts volume from song
  translate(width / 2, height / 2);
  rotate(90);
  stroke(0);
  strokeWeight(6);
  noFill();
  vol = map(volume, 0, 1, 2, 15);
  beginShape();
  let noiseMax = map(volume, 0, 1, 0, 50);
  for (let a = 0; a < TWO_PI; a += radians(10)) {
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a * phase), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
    let x = r * cos(a);
    let y = r * sin(a);
    curveVertex(x, y);
  }
  endShape(CLOSE);
  phase += 0.001;
  zoff += 0.001;

  
  //var volume = analyzer.getLevel(); //extracts volume from song
  //volume = (volume*300)+200;
  //noStroke();
  //fill (0,0,volume+100,volume+100);
  //fill (240,75);
  //ellipse(0,0,volume+50,volume+50); //middle of screen
  //fill (240,90);
  //ellipse(0,0,volume,volume); //middle of screen
  //fill(255);
  //ellipse(0,0,200,200);
 
  }
  



function keyPressed(){
  //function mousePressed(){
  //  if (song.isPlaying()){ //when song is playing
  //  song.stop();
  //  song.noLoop();
     if (song.isPlaying()){
    song.pause();
  } else {
    song.loop();
   // fill(212,239,222);
   fill(0);
  } 
   // else { //when it's not playing
  
   // fill(156,11,74);
   // song.play();
   // song.loop();
  //}
}

/* Chromaesthetor by Sylvain Girard
Thanks to:
Daniel Shiffman - sound: https://github.com/CodingTrain/website/tree/master/Tutorials/P5JS/p5.js_sound
                  noise: https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html
                  CSS: https://www.youtube.com/watch?v=zGL8q8iQSQw
Tympnus - https://tympanus.net/Development/AudioVisualizers/
Roni Kaufman - https://www.openprocessing.org/user/184331
And of course, Karen ann Donnachie and Andy Simionato
*/
let fft, song, analyzer, peakDetect;
let kMax; //BLOBS randomness
let step;
let n = 30; // number of conc blobs
let radius = 20; // circle base radius
let inter = 10; // blob step distance
let maxNoise = 10;
let noiseProg = (x) => (x); //BLOBS
let font;
let points;
let bounds;
let fade = 40;
let theme = 20;
let ellipseWidth = 200;
let dark = false;

function preload(){ //use for bigger size files
  font = loadFont('data/FuturaDemiBold.otf');
  font2 = loadFont('data/FuturaHeavy.otf');
  //song = loadSound('data/File.mp3'); //offline
}

function upload(file) {
    song = loadSound(file.data, loadSound);
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  
  uploadBtn = createFileInput(upload);
  uploadBtn.position(windowWidth/2 ,windowHeight/1.6);
  uploadBtn.style("transform", "translate(-50%, -110%)");
  uploadBtn.style("border-radius", "100px");
  uploadBtn.style("opacity", "0");
  uploadBtn.style("padding", "100px");
  uploadBtn.style("width", "200px");
  uploadBtn.style("height", "200px");
  uploadBtn.mouseOver(hoverState);
  uploadBtn.mouseOut(unhoverState);
  
  btn = createButton("dark/light mode"); 
  btn.position(30, 20); 
  btn.style("width", "110px");
  btn.style("height", "20px");
  btn.style("opacity", "0");
  btn.mouseOver(themehoverState);
  btn.mouseOut(themeunhoverState);
  btn.mousePressed(darkMode); 
  
  colorMode(HSB, 360, 100, 100, 100); //hsb, hue, sat, brightness, alpha //BLOBS 
  
  noFill();
  kMax = noise(0.3, 0.9);
  step = 0.01;
  noStroke();         
  
  fft = new p5.FFT(0.9);
  fft.setInput(song);
  peakDetect = new p5.PeakDetect(10, 15, 0.5); 
  analyzer = new p5.Amplitude();  // set analyzer to check amplitude
  analyzer.setInput(song);
  
  points = font.textToPoints(' o ', 0, 0, 10, {
    sampleFactor: 35,
    simplifyThreshold: 0
  });
  bounds = font.textBounds(' o ', 1.6, 1.6, 17);
}





function draw() {
    background(0,0,95);
  if (dark) {
    background (0,0,15);
  } else {
    background(0,0,95);
  }
 
 blendMode(MULTIPLY);
  
 waveform = fft.waveform();                                                    //WAVE        
 push();
    stroke(0, 100, 0, 1);
    if (dark) {
      stroke(0, 100, 0, 6);
    } else {
      stroke(0, 100, 0, 1);
    }
    strokeWeight(200);
    translate(0, windowHeight/2);
    beginShape();
  for (var i = 0; i< waveform.length; i++){
     noFill();
    curveVertex(i*2, map(waveform[i], -8, 8, height, 0) );
     }
  endShape();                                                                  //WAVE 
  pop();
  
  let t = frameCount/150;
  let spectrum = fft.analyze();
  let volume = analyzer.getLevel(); //extracts volume from song
  
  let bass, lowMid,  mid, highMid, treble, custom;
   bass    = fft.getEnergy( "bass" );
   lowMid  = fft.getEnergy( "lowMid" );
   mid     = fft.getEnergy( "mid" ); 
   highMid  = fft.getEnergy( "highMid" );
   treble  = fft.getEnergy( "treble" );
   custom  = fft.getEnergy( 100, 200 );
  let mapBass, mapLm, mapMid, mapHm, mapTreble;
   mapBass = map(bass, 0, 255, -200, 300);
   mapLm   = map(lowMid, 0, 255, -200, 225);
   mapMid  = map(mid, 0, 255, -200, 250);
   mapHm   = map(highMid, 0, 255, -200, 300);
   mapTreble = map(treble, 0, 255, -200, 400);
   
let midColour = map(mid, 0, 255, 0, 360);
push();
 strokeWeight(5);
 stroke(midColour, 100, 100, 6);
 if(dark) {
   stroke(midColour, 100, 100, 12);
 } else {
   stroke(midColour, 100, 100, 6);
 }
 
 blendMode(MULTIPLY);
 if(dark) {
    blendMode(BURN);
 } else {
    blendMode(MULTIPLY);
 }
 noFill();
 beginShape(LINES);                                                                  //SINWAVE 
 translate(-bounds.x * (width/2) / bounds.w+(width/4)+(width/8), -bounds.y * height / bounds.h+(height/4.3));
  rotate(12);
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let w = map(mid, 0, 255, 10, 40); //number of waves
    let s = 600;
    let xpand = map(mid, 0, 255, 50, -18); // 50 = circlish baseline, -35 controls distortion; the lower the more distorted
  curveVertex(
      p.x * width / bounds.w +
        sin(w * p.y / bounds.h + millis() / s) * width / xpand,
      p.y * height / bounds.h);
  }
  endShape();                                                                       //SINWAVE 
  pop();

       blendMode(OVERLAY);
     if (dark) {
       blendMode(SCREEN);
     } else {
       blendMode(OVERLAY);
     }
     
  for (let i = n; i > 0; i--) {                                                    //BLOBS
    let noisiness = maxNoise * noiseProg(i / n);
    let bassNoise, midNoise, trebNoise, bassAlpha, midAlpha, trebAlpha, hmAlpha,
    bassColour, drkbassColour, midColour, trebColour, drktrebColour, bassSize, trebSize;
    bassNoise = map(bass, 0, 255, 60, 400);
    bassSize = map(bass, 0, 255, 0, 30);
    hmNoise = map(mapHm, 0, 255, 30, 400);
    trebNoise = map(treble, 0, 255, 60, 600);
    trebSize = map(treble, 0, 255, 0, 30);
    midNoise = map(mid, 0, 255, 50, 350);
    bassAlpha = map(bass, 0, 255, 50, 100);
    hmAlpha = map(highMid, 0, 255, 50, 150);
    midAlpha = map(mid, 0, 255, 50, 150);
    trebAlpha = map(treble, 0, 255, 50, 100);
    //bassColour = 390-map(bass, 0, 255, 0, 180);
    bassColour = map(bass, 0, 255, 0, 360);
    drkbassColour = map(bass, 0, 255, 360, 0);
    //trebColour = 360-map(treble, 0, 255, 0, 150);
    trebColour = map(treble, 0, 255, 0, 360);
    drktrebColour = map(treble, 0, 255, 360, 0);
    midColour = map(mid, 0, 255, 80, 150);
    
   let alpha = pow(0.8 - noiseProg(i / n), 3);
   let size = radius + i * inter;
   let k = kMax * sqrt(i/n);
    
    fill(bassColour, 100, 100, alpha*bassAlpha);
    if(dark) {
      fill(drkbassColour, 100, 100, alpha*bassAlpha);
    } else {
      fill(bassColour, 100, 100, alpha*bassAlpha);
    }
    blob(size + bassSize, (width/2)-60, (height/2)+35, k, t - i * step, bassNoise*1.2); 
   
    fill(trebColour, 100, 100, alpha*trebAlpha);
    if(dark) {
    fill(drktrebColour, 100, 100, alpha*trebAlpha);
    } else {
    fill(trebColour, 100, 100, alpha*trebAlpha);
    }
    blob(size + trebSize, width/2+60, (height/2)-35, k, t - i * step, trebNoise*1.8);
   }                                                                              //BLOBS
  blendMode(BLEND);

push();                                                                           //CIRCLES
 translate(width / 2, height / 2);
   noStroke();
 volume = (volume*120)+100;
  noStroke();
  fill (0, 0, 100,30);
  if(dark) {
    fill (0, 0, 30,30);
  } else {
    fill (0, 0, 100,30);
  }
  ellipse(0,0,volume*2.6,volume*2.6);
  ellipse(0,0,volume*2.4,volume*2.4); //middle of screen
  ellipse(0,0,volume*2.2,volume*2.2); //middle of screen
  fill(0, 0, 100, 80);
  if(dark) {
    fill(0, 0, 30, 80);
  } else {
    fill(0, 0, 100, 80);
  }
  ellipse(0,0,200,200);
    peakDetect.update(fft);
   if ( peakDetect.isDetected ) {
    ellipseWidth = 400;
  } else {
    ellipseWidth *= 0.98;
  }
  ellipse(0,0,ellipseWidth,ellipseWidth);                                        //CIRCLES


fill(0, 0, 80,fade);                                                             //TEXT
textAlign(CENTER, CENTER);
textSize (23); 
textFont (font2);
text('chromaesthetor', 0,0);
textSize (15); 
translate(0,45);
text('upload', 0, 0);
pop();
push();
textAlign(CENTER, CENTER);
fill(0, 0, 80,fade);
textFont (font2);
textSize (15);
translate(windowWidth/2, 30);
fill(0, 0, 80,fade*2);
text('upload a song then space bar to play/pause', 0, 0);
pop();
textFont (font2);
textSize (15);
textAlign(CENTER, CENTER);
translate(90, 30);
fill(0, 0, 80, 60+theme);
if(dark) {
  fill(0, 0, 80, 30+theme);
} else {
    fill(0, 0, 80, 60+theme);
}
text('dark/light mode', 0, 0);                                                  //TEXT

} //DRAW END

function blob(size, xCenter, yCenter, k, t, noisiness) {                       //BLOB
  beginShape();
  let angleStep = 360 / 8;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
    r1 = cos(theta)+1;
    r2 = sin(theta)+1;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}                                                                              //BLOB


function windowResized() {                                                     //USER
  resizeCanvas(windowWidth, windowHeight);
}

function hoverState(){
  fade *= 1.8;
  if (song.isPlaying()){
    fade = 40;
 } else {
    fade = 80;
 } 
}

function unhoverState(){
  fade *= 0.8;
  if (song.isPlaying()){
    fade = 0;
 } else {
    fade = 40;
 } 
}

function themehoverState(){
  theme = 40;
}

function themeunhoverState(){
 theme = 20;
}
 
function keyPressed(){
 if (song.isPlaying()){
    song.pause();
    fade = 40;
  } else {
    song.loop();
    fade = 0;
    } 
  }

function darkMode() { 
    if (dark) {
    dark = false;
  } else {
    dark = true;
  }
}                                                                           //USER

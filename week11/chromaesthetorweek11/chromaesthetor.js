let fft, song, analyzer;
let kMax; //BLOBS randomness
let step;
let n = 30; // number of blobs
let radius = 20; // diameter of the circle
let inter = 8; // difference between the sizes of two blobs
let maxNoise = 10;
let noiseProg = (x) => (x); //BLOBS
let phase = 0;
let zoff = 0;
let fade = 50;

//function preload(){ //use for bigger size files
//  song = loadSound('data/Tommy.mp3'); //need directory /data
//}

function handleFile(file) {
  print(file);
    song = loadSound(file.data, loadSound);
}

function setup() {
  createCanvas(windowWidth, windowHeight); //full window canvas
  input = createFileInput(handleFile);
  input.position(20, 20);
  colorMode(HSB, 360, 100, 100, 100); //hsb, hue, sat, brightness, alpha //BLOBS 
  angleMode(DEGREES);
  noFill();
  kMax = random(0.4, 0.9);
  step = 0.01;
  noStroke();          //BLOBS
  fft = new p5.FFT(0.7);
  fft.setInput(song);
  //fft.analyze(song);
  analyzer = new p5.Amplitude();  // set analyzer to check amplitude
  analyzer.setInput(song);
textSize (25); 
textFont ('Futura');
textAlign(CENTER);
}


function draw() {
  //blendMode(BLEND);                                                        //BLOBS
  //background(260,16,100);
  background(0, 0, 95);
  blendMode(OVERLAY);
  //blendMode(SOFT_LIGHT);
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
   
  //let mapBass, mapLm, mapMid, mapHm, mapTreble;
  // mapBass = map(bass, 0, 255, -200, 100);
  // mapLm   = map(lowMid, 0, 255, -200, 125);
  // mapMid  = map(mid, 0, 255, -200, 150);
  // mapHm   = map(highMid, 0, 255, -200, 200);
  // mapTreble = map(treble, 0, 255, -200, 300);
  
    let mapBass, mapLm, mapMid, mapHm, mapTreble;
   mapBass = map(bass, 0, 255, -200, 300);
   mapLm   = map(lowMid, 0, 255, -200, 225);
   mapMid  = map(mid, 0, 255, -200, 250);
   mapHm   = map(highMid, 0, 255, -200, 300);
   mapTreble = map(treble, 0, 255, -200, 400);
   
  for (let i = n; i > 0; i--) {
    let alpha = pow(0.8 - noiseProg(i / n), 3);
    let size = radius + i * inter;
    let k = kMax * sqrt(i/n);
    
    let noisiness = maxNoise * noiseProg(i / n);
    let trebNoise, bassNoise, trebAlpha, bassAlpha, hmAlpha, trebColour;
    bassNoise = map(lowMid, 0, 255, 60, 500);
    hmNoise = map(mapHm, 0, 255, 30, 400);
    trebNoise = map(highMid, 0, 255, 60, 500);
    midNoise = map(mid, 0, 255, 50, 350);
    bassAlpha = map(bass, 0, 255, 50, 100);
    hmAlpha = map(highMid, 0, 255, 50, 150);
    midAlpha = map(mid, 0, 255, 50, 150);
    trebAlpha = map(treble, 0, 255, 70, 170);
    bassColour = map(bass, 0, 255, 150, 240);
    trebColour = map(treble, 0, 255, 0, 90);
    midColour = map(mid, 0, 255, 80, 150);
    
    //fill(255, 0, 0, alpha*255);
    //blob(size, width/2, (height/2), k, t - i * step, noisiness);
    //fill(0, 255, 0, alpha*255);
    //blob(size, (width/2)-100, (height/2), k, t - i * step, noisiness);
     //fill(0, 0, 255, alpha*255);
    //blob(size, (width/2)+100, (height/2), k, t - i * step, noisiness);
    fill(trebColour, 100, 100, alpha*trebAlpha);
    blob(size, width/2+50, (height/2)-25, k, t - i * step, (trebNoise*1.7));
    //fill(midColour, 100, 100, alpha*midAlpha);
    //blob(size, (width/2)+100, (height/2)+100, k, t - i * step + 0.2, midNoise);
    fill(bassColour, 100, 100, alpha*bassAlpha);
    blob(size, (width/2)-50, (height/2)+25, k, t - i * step, bassNoise); 
  }                                                                            //BLOBS
  blendMode(BLEND);
  //LINES
  
  translate(width / 2, height / 2);
  push();
  rotate(90);
  stroke(0);
  strokeWeight(6);
  noFill();
  beginShape();
  let noiseMax = map(volume, 0, 1, 0, 50);
  for (let a = 0; a < TWO_PI; a += radians(10)) {
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a - phase), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
    let x = r * cos(a);
    let y = r * sin(a);
    curveVertex(x, y);
  }
  endShape(CLOSE);
  phase += 0.001;
  zoff += 0.001;
  pop();
   noStroke();
  //fill (0,0,100,50);
  //ellipse(windowWidth/2 - 400,windowHeight/4,mapBass+100,mapBass+100); 
  //ellipse(windowWidth/2 - 200,windowHeight/4,mapLm+100,mapLm+100); 
  //ellipse(windowWidth/2,windowHeight/4,mapMid+100,mapMid+100);
  //ellipse(windowWidth/2 + 200,windowHeight/4,mapHm+100,mapHm+100); 
  //ellipse(windowWidth/2 + 400,windowHeight/4,mapTreble+100,mapTreble+100); 
  //ellipse(windowWidth/2 + 600,windowHeight/4,custom+100,custom+100);

  volume = (volume*170)+100;
  noStroke();
  fill (0, 0, 100,20);
  ellipse(0,0,volume*2.6,volume*2.6);
  fill (0, 0, 100,40);
  ellipse(0,0,volume*2.4,volume*2.4); //middle of screen
  fill (0, 0, 100,60);
  ellipse(0,0,volume*2.2,volume*2.2); //middle of screen
  fill(0, 0, 100, 80);
  ellipse(0,0,200,200);
  
  //let pieces = 32;                                         //MANDALA
  //let radius = bass;
  //  // Move the origin to the center of the canvas
  //translate( width/1.5, height/1.5 ); 
  
  //for( i = 0; i < pieces; i++ ) { 
    
  //  rotate( TWO_PI / pieces );
  //  stroke(bass, 255-(bass*2), 255-bass);
  //  strokeWeight(5);
  //  noFill();
  //  // Draw the bass lines
  //  ellipse(radius/2, radius/2, mapBass+100, mapBass+100); //MANDALA
    
    //line( mapBass, radius/2, 0, radius );
    //stroke(100, 97, 160);
    // Draw the mid lines
    //line( mapMid, radius/2, 0, radius );    
    //stroke(97, 231, 134);
    // Draw the treble lines
    //line( mapTreble, radius/2, 0, radius );
  //}
  

translate(0,10);
//fade *= 0.9;
fill(0, 0, 90,fade);
text('chromaesthetor', 0,0);

}                                                        //DRAW END

function blob(size, xCenter, yCenter, k, t, noisiness) {
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
}

function keyPressed(){
  //function mousePressed(){
  //  if (song.isPlaying()){ //when song is playing
  //  song.stop();
  //  song.noLoop();
     if (song.isPlaying()){
    song.pause();
    fade = fade;
  } else {
    song.loop();
    fade *= 0.9;
  } 
}

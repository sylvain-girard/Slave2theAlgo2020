let fft, song, analyzer;

let kMax; //BLOBS
let step;
let n = 30; // number of blobs
let radius = 20; // diameter of the circle
let inter = 8; // difference between the sizes of two blobs
let maxNoise = 20;
let noiseProg = (x) => (x); //BLOBS

function preload(){ //use for bigger size files
  song = loadSound('data/Piano.mp3'); //need directory /data
  
}
function setup() {
  createCanvas(windowWidth, windowHeight); //full window canvas
  colorMode(HSB, 360, 100, 100, 100); //hsb, hue, sat, brightness, alpha //BLOBS 
  angleMode(DEGREES);
  noFill();
  kMax = random(0.1, 0.9);
  step = 0.01;
  noStroke();          //BLOBS
  fft = new p5.FFT();
  fft.setInput(song);
  //fft.analyze(song);
  analyzer = new p5.Amplitude();  // set analyzer to check amplitude
  analyzer.setInput(song);
textSize (32); 
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
  let bass, lowMid,  mid, highMid, treble, custom;
   bass    = fft.getEnergy( "bass" );
   lowMid  = fft.getEnergy( "lowMid" );
   mid     = fft.getEnergy( "mid" ); 
   highMid  = fft.getEnergy( "highMid" );
   treble  = fft.getEnergy( "treble" );
   custom  = fft.getEnergy( 100, 200 );
  let mapBass, mapLm, mapMid, mapHm, mapTreble;
   mapBass = map(bass, 0, 255, -200, 100);
   mapLm   = map(lowMid, 0, 255, -200, 125);
   mapMid  = map(mid, 0, 255, -200, 150);
   mapHm   = map(highMid, 0, 255, -200, 200);
   mapTreble = map(treble, 0, 255, -200, 300);
  for (let i = n; i > 0; i--) {
    let alpha = pow(0.8 - noiseProg(i / n), 3);
    let size = radius + i * inter;
    let k = kMax * sqrt(i/n);
    
    let noisiness = maxNoise * noiseProg(i / n);
    let trebNoise, bassNoise, trebAlpha, bassAlpha;
    bassNoise = map(lowMid, 0, 255, 30, 400);
    trebNoise = map(highMid, 0, 255, 40, 450);
    bassAlpha = map(bass, 0, 255, 50, 150);
    trebAlpha = map(treble, 0, 255, 50, 150);
    
    //fill(255, 0, 0, alpha*255);
    //blob(size, width/2, (height/2), k, t - i * step, noisiness);
    //fill(0, 255, 0, alpha*255);
    //blob(size, (width/2)-100, (height/2), k, t - i * step, noisiness);
     //fill(0, 0, 255, alpha*255);
    //blob(size, (width/2)+100, (height/2), k, t - i * step, noisiness);
    fill(0, 100, 100, alpha*trebAlpha);
    blob(size, width/2+50, (height/2)-25, k, t - i * step, (trebNoise*2));
    //fill(150, 100, 100, alpha*255);
    //blob(size, (width/2)-100, (height/2)+75, k, t - i * step + 0.2, noisiness);
    fill(220, 100, 100, alpha*bassAlpha);
    blob(size, (width/2)-50, (height/2)+25, k, t - i * step + 0.4, bassNoise);  
  }                                                                            //BLOBS
  blendMode(BLEND);
  
   noStroke();
  fill (0,0,100,50);
  ellipse(windowWidth/2 - 400,windowHeight/4,mapBass+100,mapBass+100); 
  ellipse(windowWidth/2 - 200,windowHeight/4,mapLm+100,mapLm+100); 
  ellipse(windowWidth/2,windowHeight/4,mapMid+100,mapMid+100);
  ellipse(windowWidth/2 + 200,windowHeight/4,mapHm+100,mapHm+100); 
  ellipse(windowWidth/2 + 400,windowHeight/4,mapTreble+100,mapTreble+100); 
  //ellipse(windowWidth/2 + 600,windowHeight/4,custom+100,custom+100);
  
  var volume = analyzer.getLevel(); //extracts volume from song
  volume = (volume*200)+100;
  noStroke();
  fill (0, 0, 100,70);
  ellipse(windowWidth/2,windowHeight/2,volume*2.6,volume*2.6);
  fill (0, 0, 100,50);
  ellipse(windowWidth/2,windowHeight/2,volume*2.4,volume*2.4); //middle of screen
  fill (0, 0, 100,30);
  ellipse(windowWidth/2,windowHeight/2,volume*2.2,volume*2.2); //middle of screen
  fill(0, 0, 100, 80);
  ellipse(windowWidth/2,windowHeight/2,300,300);
  
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
fill(80);
text('chromaesthetor', windowWidth/2, windowHeight/2);
}

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
  } else {
    song.loop();
   // fill(212,239,222);
   fill(0);
  } 

}

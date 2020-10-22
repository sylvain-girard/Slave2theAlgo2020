//credit to reona396 for the wavy text https://www.openprocessing.org/sketch/971848

let c;
let q = [];
let t = 0.0;
let d;

let rangeStart = 0;
let rangeEnd = 0;

let isZeroRange = true;
particles = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(width * 0.15);
  textLeading(width*0.13);
  week1 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week01/", "week 1");
  week1.position(windowWidth/2-700, windowHeight/2);
  week1.style("font-family", "helvetica");
  week1.style("font-size", "24px");
  week1.style("font-weight", "600");
  week2 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week02/", "week 2");
  week2.position(windowWidth/2-600, windowHeight/2);
  week2.style("font-family", "helvetica");
  week2.style("font-size", "24px");
  week2.style("font-weight", "600");
  week3 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week03/", "week 3");
  week3.position(windowWidth/2-500, windowHeight/2);
  week3.style("font-family", "helvetica");
  week3.style("font-size", "24px");
  week3.style("font-weight", "600");
  week4 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week04/", "week 4");
  week4.position(windowWidth/2-400, windowHeight/2);
  week4.style("font-family", "helvetica");
  week4.style("font-size", "24px");
  week4.style("font-weight", "600");
  week5 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week05/", "week 5");
  week5.position(windowWidth/2-300, windowHeight/2);
  week5.style("font-family", "helvetica");
  week5.style("font-size", "24px");
  week5.style("font-weight", "600");
  week6 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week06/", "week 6");
  week6.position(windowWidth/2-200, windowHeight/2);
  week6.style("font-family", "helvetica");
  week6.style("font-size", "24px");
  week6.style("font-weight", "600");
  week7 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week07/", "week 7");
  week7.position(windowWidth/2-100, windowHeight/2);
  week7.style("font-family", "helvetica");
  week7.style("font-size", "24px");
  week7.style("font-weight", "600");
  week8 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week08/", "week 8");
  week8.position(windowWidth/2, windowHeight/2);
  week8.style("font-family", "helvetica");
  week8.style("font-size", "24px");
  week8.style("font-weight", "600");
  week9 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week09/", "week 9");
  week9.position(windowWidth/2+100, windowHeight/2);
  week9.style("font-family", "helvetica");
  week9.style("font-size", "24px");
  week9.style("font-weight", "600");
  week10 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week10/", "week 10");
  week10.position(windowWidth/2+200, windowHeight/2);
  week10.style("font-family", "helvetica");
  week10.style("font-size", "24px");
  week10.style("font-weight", "600");
  week11 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week11/", "week 11");
  week11.position(windowWidth/2+300, windowHeight/2);
  week11.style("font-family", "helvetica");
  week11.style("font-size", "24px");
  week11.style("font-weight", "600");
  week12 = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week12/", "week 12");
  week12.position(windowWidth/2+400, windowHeight/2);
  week12.style("font-family", "helvetica");
  week12.style("font-size", "24px");
  week12.style("font-weight", "600");
  chroma = createA("https://sylvain-girard.github.io/Slave2theAlgo2020/week12/Chromaesthetor/", "Chromaesthetor");
  chroma.position(windowWidth/2+500, windowHeight/2);
  chroma.style("font-family", "helvetica");
  chroma.style("font-size", "24px");
  chroma.style("font-weight", "600");
  
 fill(202,255,185);
  strokeWeight(5);
text("slave\nto the\nalgorithm\n2020 - sylvain", width / 2, height / 2);
  c = get();

  for (let i = 0; i <= height; i++) {
    q.push(c.get(0, i, width, 1));
  }
}

function draw() {
  background(223,178,244, 50);
  
  let distance = dist(width / 2, height / 2, mouseX, mouseY) * 0.95;
  rangeStart = -distance;
  rangeEnd = distance;

  for (let k = 0; k < q.length; k += 1) {
    d = map(noise(k * 0.005 + t), 0, 1, rangeStart, rangeEnd);

    image(q[k], d, k);
  }

  t += 0.005;
  
  for (let i = 0; i < 1 ; i++) {
    let p = new Particle();
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 5);
    }
  }
}

class Particle {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    //let vxMap = map(mouseX, 0, windowWidth, -13,0);
    //let vyMap = map(mouseX, 0, windowWidth, -1,-4);
    //this.vx = random(vxMap, -1);
    //this.vy = random(vyMap, -5);
    let n = 0;
    this.vx = random(n, -4);
    this.vy = random(n, -4);
    this.alpha = 20;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx/2;
    this.y += this.vy/2;
    this.alpha -= 0.1;
  }

  show() {
    noStroke();
    //stroke(255);
    fill(133,71,152, this.alpha);
    ellipse(this.x, this.y, 20);
  }
}

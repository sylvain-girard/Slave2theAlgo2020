//sketch 14/8/20
PImage photo;
int smallPoint, largePoint,x,y,dotSize,t;
color pix;
float pointillise;
void setup() {
smallPoint=4;
largePoint=40;
size(480,480);
background (255);
imageMode (CENTER);
photo = loadImage("img1.jpg");
smallPoint=4;
largePoint=40;
frameRate(100);
}


void draw(){
//image (photo,240,240); //loads image to fill sketch

x=int (random(photo.width));//random x point
y=int (random(photo.height));//random y point
pointillise=map(mouseX, 0, photo.width, smallPoint, largePoint);//map(input, lowest val in, highest val in, lowest out, highest out
dotSize=int(pointillise);
pix=photo.get(x,y); //colour picker from the random point on thhe img
t=int(random(256));
fill (pix,t); //udates colour of fill to pixel values as set by colour
//stroke (pix,t);
noStroke();
ellipse (x,y,dotSize,dotSize); //colour picker circle
//line(x,y,x+dotSize,y+dotSize);
}

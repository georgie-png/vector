var myCanvas;


function sketch_eyes(p) {
  let eye;
  p.setup = function () {
    let b = document.getElementById("vec1");
    let w = b.clientWidth;
    let h = b.clientHeight;
    p.createCanvas(w, h);

    eye =  p.createVector(p.width*.5, p.height*.5);
  } 

  p.draw = function () {
    let mouseVector = p.createVector(p.mouseX, p.mouseY);

    let Pupil = eye.copy().add(mouseVector.copy().sub(eye).setMag(p.width*.1));
  //y = p.map(y , 100,-100, -30, 30);

  //p.background(220);
  p.circle(eye.x, eye.y, p.width*0.6 );
  p.circle(Pupil.x, Pupil.y, p.width*0.3 );
}
}
new p5(sketch_eyes, 'vec1')
new p5(sketch_eyes, 'vec3')

function sketch_nose(p) {
  let midle;
  p.setup = function () {
    let b = document.getElementById("vec1");
    let w = b.clientWidth;
    let h = b.clientHeight;
    p.createCanvas(w, h);

    midle =  p.createVector(p.width*.5, p.height*.5);
  } 

  p.draw = function () {
    p.clear();
    let mouseVector = p.createVector(p.mouseX, p.mouseY);
    //p.background(255);
   let dist = p.abs(midle.x-mouseVector.x);

   dist = p.constrain(dist,  0, p.width*0.5);

   dist /= p.width*0.5;
   
   let x = p.lerp(0, 1.25*p.QUARTER_PI,  dist);
   let y = p.lerp(4*p.QUARTER_PI, 2.25*p.QUARTER_PI,  dist);
  //y = p.map(y , 100,-100, -30, 30);
  console.log(dist);
  //p.background(220);
  
  p.arc(midle.x, midle.y, p.width*0.6, p.width*0.6, x, y, p.OPEN);
  //p.(Pupil.x, Pupil.y, p.width*0.3 );
}
}

new p5(sketch_nose, 'vec2')

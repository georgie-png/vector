function sketch_idnameofdiv(p) {
  p.setup = function () {
    var myDiv = document.getElementById('sketch');
    var myWidth = myDiv.clientWidth*0.9;
    var myHeight = myDiv.clientHeight*0.9;
    p.createCanvas(myWidth,myHeight);
    
  }

  p.draw = function () {
    // stuff to draw
    p.background(0);
  }

}

const divs = document.getElementById('sketch')
new p5(sketch_idnameofdiv, divs)
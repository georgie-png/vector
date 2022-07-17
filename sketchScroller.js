var scrollBar;
var isOver=false;
var numEl = 8;
/** This function sets up our sketch. */
function setup() {

  noCanvas();
  scrollBar = document.getElementById('scroller');

  fillScroller(numEl);
  scrollBar.onmouseenter =over;
  
  // Specify the callback function
  // when the mouse is moved out of
  // an element
  scrollBar.onmouseleave=off;

}

function fillScroller(numChild){

  for(let i=0;i<numChild; i++){
    //create initial div
    var iDiv = document.createElement('div');
    iDiv.id = 'menu';
    iDiv.className = 'blockColumn';
    // randomize colour
    iDiv.style.background = "#" + (Math.random() * 0xFFFFFF<<0).toString(16);
    iDiv.style.flexGrow = 0;
    var txt = document.createElement('p');
    txt.textContent='Look!'
    iDiv.append(txt);
    // add it in the body
    scrollBar.appendChild(iDiv);
  }


}
function over(){
  isOver=true;
  console.log("over");

}
function off(){
  isOver=false;
  console.log("off");
}
var scrolledTimer = 0;
var timeGate = 3000;
function mouseWheel(event) {
  
  if(isOver){
    let thisDelta = event.delta;
    console.log(thisDelta);
    
    if(scrolledTimer<millis()-timeGate){
      if(thisDelta>0){
        scrollBar.innerHTML = '';
        fillScroller(numEl)
      }
      scrolledTimer=millis();
    }
  }
}
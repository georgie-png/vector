/** This function loads resources that will be used later. */
let data;
let dataKeys;
let ShownData = [];

let chosenOptions = [];
let total =0;

let tagsSelected = [];

const dataDiv = document.querySelector('.quotes');

function preload() {
    data = loadJSON("./data/researchInfo.json", onFileload)
}

function onFileload(){
    dataKeys = Object.entries(data);
}

function pullOptions(numToPull){

let options = []
    if(ShownData.length+numToPull>dataKeys.length){
        numToPull = dataKeys.length-total;
    }
    for(let i=0; i<numToPull; i++){


        let indx =  findIndx(dataKeys.length);
        
        let thisData = dataKeys[indx];
        append(options, thisData[1]);
        append(ShownData, thisData[1]);
        total++; 
    }

    return options

}

function findIndx(length){

    let indx = random(0,length);
    indx = parseInt(indx);
    let included = chosenOptions.includes(indx);


    if(included){
        indx =  findIndx(length);
    }
    
    append(chosenOptions, indx);

    return indx; 
    
}

let optionHTML;

 function setup() {
    let theseOptions =  pullOptions(8);
    showData(theseOptions)
    let options = document.getElementById("options");
    options.onmouseover = ShowOptions;
    
    var tagChecks = document.querySelectorAll("tag");
    for (var i = 0; i < tagChecks.length; i++) {
        tagChecks[i].onclick  = function() {
            // access properties using this keyword
            if ( this.checked ) {
                append(tagsSelected, this.value);
                console.log( this.value );
                console.log(tagsSelected);
            } else {
                if(tagsSelected.length>0){
                tagsSelected.splice(tagsSelected.indexOf(this.value),1);
                }
                console.log(tagsSelected);
            }
        };
    }
    let panel = document.getElementById("panel");
    optionHTML = panel.innerHTML;
}

function ShowOptions(){
    let panel = document.getElementById("panel");
    panel.innerHTML = optionHTML;

}


    // show the quotes
    const showData = (dataToShow) => {
        
        
        dataToShow.forEach(thisData => {
            const dataEl = document.createElement('div');
            dataEl.classList.add('quote');
            dataEl.classList.add('blockColumn');

            dataEl.addEventListener("mouseover",function(){
                
                var nodes = Array.prototype.slice.call( this.parentElement.children );
                const index = nodes.indexOf( this );
                let panel = document.getElementById("panel");
                
                let chosenData = ShownData[index-2];
                panel.innerHTML = panelInnerHtml(chosenData)
                
            });
            //console.log(thisData);
            dataEl.innerHTML = menuInnerHtml(thisData)
            
            dataDiv.appendChild(dataEl);
            total++;
        });
    };

    function panelInnerHtml(thisData){
        return `
            <div class='blockColumn'>
                <div style="text-align: center;">
                    <h2>${thisData.Title}</h2>
                    <h3>${thisData.Authors}</h3>
                </div>
                <div >
                <img class="researchImg" src=${thisData.image}>
                
                    <p>${thisData.ShortDescription}</p>
                </div>
            </div>
            `;
    }

    function menuInnerHtml(thisData){
       return `
        <p>${thisData.Title}</p>
        <footer>${thisData.ShortDescription}</footer>
        `;
    }
    let scroller = document.getElementById("scroller");
    scroller.addEventListener('scroll', () => {
        
        if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight) {
          if(total<dataKeys.length){
            let theseOptions =  pullOptions(7);
            showData(theseOptions)
          }
        }
        
    }, {
        passive: true
    });
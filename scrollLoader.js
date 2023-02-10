(function () {

    const quotesEl = document.querySelector('.quotes');
    const loaderEl = document.querySelector('.loader');

    let calling = false;
    // get the quotes from API
    const getQuotes = async (page, limit) => {
        const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
        const response = await fetch(API_URL);
        // handle 404
        if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
        }
        return await response.json();
    }

    
    

    // show the quotes
    const showQuotes = (quotes) => {
        
        console.log(Object.keys(quotes).length)
        quotes.forEach(quote => {
            const quoteEl = document.createElement('div');
            quoteEl.classList.add('quote');
            quoteEl.classList.add('blockRow');

            quoteEl.addEventListener("mouseover",function(){
                console.log("over");
                let panel = document.getElementById("panel");
                panel.innerHTML = this.innerHTML;

            });
            
            quoteEl.innerHTML = `
            <p>${quote.quote}</p>
            <footer>${quote.author}</footer>
            `;
            
            quotesEl.appendChild(quoteEl);
        });
    };


    function panelShow(){
        console.log("over");
        //let panel = document.getElementById("panel");
        //panel.innerHTML = element.innerHTML;
    }


    const hasMoreQuotes = (page, limit, total) => {
        const startIndex = (page - 1) * limit + 1;
        return total === 0 || startIndex < total;
    };

    // load quotes
    const loadQuotes = async (page, limit) => {

        // show the loader
       // showLoader();
       calling = true;
        // 0.5 second later
        setTimeout(async () => {
            try {
                // if having more quotes to fetch
                if (hasMoreQuotes(page, limit, total)) {
                    // call the API to get quotes
                    const response = await getQuotes(page, limit);
                    // show quotes
                    showQuotes(response.data);
                    // update the total
                    total = response.total;
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                //hideLoader();
            }
        }, 500);
        calling = false;

    };

    // control variables
    let currentPage = 1;
    const limit = 20;
    let total = 0;

    let scroller = document.getElementById("scroller");
    scroller.addEventListener('scroll', () => {
        

        
        if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight && !calling) {
          
            currentPage++;
            loadQuotes(currentPage, limit);
            console.log("Scroll");
        
        }
    }, {
        passive: true
    });

    // initialize
    loadQuotes(currentPage, limit);

})();
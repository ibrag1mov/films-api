
let elForm = document.querySelector('.js-form');
let elInput = document.querySelector('.js-input');
let elList = document.querySelector('.js-list');
let elPrevBtn = document.querySelector('.js-prev');
let elNextBtn = document.querySelector('.js-next');
let allBtns = document.querySelector('.btn-next-prev');



function renderFilms(array, node){
    
    node.innerHTML='';

    array.forEach((item)=> {
        
        let elItem = document.createElement('li');
        let elLink = document.createElement('a');
        let elImg = document.createElement('img');
        let elTitle = document.createElement('h3');
        let elYear = document.createElement('span');

        elItem.setAttribute('class', 'el-item');
        elLink.setAttribute('class', 'el-link');
        elImg.setAttribute('class', 'el-img');
        elTitle.setAttribute('class', 'el-title text-center text-light fs-6');
        elYear.setAttribute('class', 'el-year');

        elImg.src = item.Poster;
        elTitle.textContent = item.Title;
        elYear.textContent = item.Year;
        elLink.href = `https://www.imdb.com/title/${item.imdbID}/`;
        elLink.target = "_blank"
        elLink.appendChild(elImg);
        elLink.appendChild(elTitle);
        elLink.appendChild(elYear);
        elItem.appendChild(elLink);

        node.appendChild(elItem);

    });
}


let activePage = 1;


async function getFilms(){

    if(activePage == 1) {
        elPrevBtn.setAttribute("disabled", "true")
    }
    if(activePage != 1){
        elPrevBtn.removeAttribute("disabled")
    }

    const response = await fetch(`https://www.omdbapi.com/?apikey=8704b0b0&s=${elInput.value}&page=${activePage}`);
    const data = await response.json();
    if(data.Search){
        renderFilms(data.Search, elList);
        
        console.log(data);
        if(activePage == Math.ceil(data.totalResults / 10)) {
            elNextBtn.setAttribute("disabled", "true")
          }
          else {
            elNextBtn.removeAttribute("disabled")
          }
          allBtns.classList.remove('d-none');
          allBtns.classList.add('d-flex');
    }
    else{ 
         allBtns.classList.remove('d-flex');
         allBtns.classList.add('d-none');
        elList.innerHTML=`<h2 class="py-5 my-5 text-center text-light mx-auto">Films not found🙁</h2>`;
    }
}


elForm.addEventListener('submit', (evt)=>{
    evt.preventDefault()

    if(elInput.value != ''){
        getFilms();
    }
    else{
        elList.innerHTML=`<h2 class="py-5 my-5 text-center text-light mx-auto">Films not found🙁</h2>`; 
    }
    
});

elPrevBtn.addEventListener("click", () => {
    activePage--;
    getFilms();
  })
  
  elNextBtn.addEventListener("click", () => {
    activePage++;
    getFilms();
  })
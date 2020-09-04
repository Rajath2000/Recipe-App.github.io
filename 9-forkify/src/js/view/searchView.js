//UI
import {elements} from './base';

export const getInput =()=>elements.searchInput.value;

export const clearInput=()=>{
    elements.searchInput.value=''
};
export const clearResuts=()=>{
    elements.searchResultList.innerHTML='';
    elements.searchResPages.innerHTML='';
};
export const highlightedSelected=(id)=>{
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}
export const limitRecipeTitle=(title,limit=17)=>{
      const newTite=[];
       if(title.length>limit){
           title.split(' ').reduce((acc,cur)=>{
               if(acc+cur.length<=limit){
                newTite.push(cur);
               }
                return acc+cur.length;
           },0);
           return `${newTite.join(' ') } ...`;
       }
       return title;
};
const renderRecipe = recipe=>{
    const markup = `
    <li>
                    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
                
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend',markup);
};
const createButton=(page,type)=>`
 <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1:page+1}>
                    <span>page ${type === 'prev' ? page-1:page+1}</span>

                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left':'right'}"></use>
                    </svg>
                </button>
`;

const renderButton=(page,numResults,resperpage)=>{
     const pages = Math.ceil(numResults/resperpage);
     let button;
     if(page===1 && pages>1){
         //onnly button to next page
       button = createButton(page,'next');

     }else if(page < pages){
         //button to both
       button =`
       ${createButton(page,'prev')}
       ${createButton(page,'next')}
       `;
         
     }
     else if(page===pages && pages>1){
         //button to prev
       button = createButton(page,'prev');

     }
     elements.searchResPages.insertAdjacentHTML('afterbegin',button);

};
export const renderResuts =(recipies,page=1,resperpage=10)=>{
     //render resuts of cur page
     const start =(page-1)*resperpage;
     const end = page*resperpage;
    recipies.slice(start,end).forEach(renderRecipe);
    renderButton(page,recipies.length,resperpage);
};
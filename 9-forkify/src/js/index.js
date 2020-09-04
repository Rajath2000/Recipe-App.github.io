// Global app controller
//import stri from './models/Search'
/*import {add as a,mul,id} from './models/Search';
//console.log(add(1,2));
console.log(a(1,2));
console.log(mul(1,2));
console.log(mul(1,2));
console.log(mul(id,2));
*/
import Search from './models/Search';
import * as listView from './view/listView';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import {elements,renderLoader,clearLoader} from './view/base';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as likesView from './view/likesView';

const state={};

const contolSearch = async()=>{
   const query = searchView.getInput();
   //console.log(query);
   if(query){
       try{
       //new search obj and add to state
       state.search = new Search(query);
       searchView.clearInput();
       searchView.clearResuts();
       renderLoader(elements.searchRes);
       //prepare for res

       //search for recipe
       

       await state.search.getResult();

       //results in UI
       clearLoader();
       searchView.renderResuts(state.search.recipe);
       //console.log(state.search.recipe)
       }
       catch(err){
           alert(err);
           clearLoader();
       }
   }
};
elements.searchForm.addEventListener('submit',(e)=>{
      e.preventDefault(); //for stop realoading
      contolSearch();
});

elements.searchResPages.addEventListener('click',e=>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goTopage = parseInt(btn.dataset.goto,10);
        searchView.clearResuts();
       searchView.renderResuts(state.search.recipe,goTopage);
    }
});

/*const r = new Recipe(46956);
r.getRecipe();
console.log(r);
*/
const controlRecipe=async()=>{
   const id=window.location.hash.replace('#','');
   if(id){
       recipeView.clearRecipe();
       renderLoader(elements.recipe);
       if(state.search)
       searchView.highlightedSelected(id);
       state.recipe=new Recipe(id);
       try{
       await state.recipe.getRecipe();
       state.recipe.calctime();
       state.recipe.calcserving();
       state.recipe.parseingdrdiens();
       //console.log(state.recipe);

       clearLoader();
       recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
   }
   catch(err){
    alert(err);
   }
   }
};

// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);
['hashchange','load'].forEach(event =>window.addEventListener(event,controlRecipe));
/*
if(state.recipe.serving>1)
elements.recipe.addEventListener('click',e=>{
    if(e.target.matches('.btn-decreas,.btn-decreas *')){
        state.recipe.updateServings('dec');

    }else if(e.target.matches('.btn-increas,.btn-increas *')){
if(state.recipe.serving>1)
        state.recipe.updateServings('inc');
        
    }
    console.log(state.recipe);
});*/
const controllist=()=>{
    if(!state.List) state.list=new List();
    state.recipe.ingerdient.forEach(el=>{
       const item = state.list.addItem(el.count,el.unit,el.ingredient);
       listView.renderItem(item);

    });

};

elements.shopping.addEventListener('click',e=>{
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if(e.target.matches('.shopping__delete,.shopping__delete *')){
        state.list.deleteItem(id);
        listView.deleteItem(id);
    }else if(e.target.matches('.shopping__count-value')){
        const val =parseFloat(e.target.value);
        state.list.updateCount(id,val);
    }
});

//testing



window.addEventListener('load',()=>{
    state.likes=new Likes();
    state.likes.readstorage();


    likesView.toggleLikeMenu(state.likes.getNumberLikes());

    state.likes.likes.forEach(like=>likesView.renderLike(like));


})






const Likecontroller=()=>{
    if(!state.likes) state.likes=new Likes();
    const id= state.recipe.Id;
    //user has not yet liked
    if(!state.likes.isLiked(id)){
        const newlike=state.likes.addLikes(id,state.recipe.title,state.recipe.author,state.recipe.img);
       likesView.toggleLikeBtn(true);
       likesView.renderLike(newlike);
        //console.log(state.likes);
    }else{
        state.likes.deleteLikes(id);
       likesView.toggleLikeBtn(false);
       likesView.deleteLike(id);
        //console.log(state.likes);
    }
    likesView.toggleLikeMenu(state.likes.getNumberLikes());
};













elements.recipe.addEventListener('click',e=>{
    if(e.target.matches('.btn-decrease,.btn-decrease *')){
        if(state.recipe.serving>1){
       state.recipe.updateServings('dec');
       recipeView.upadteservingingreed(state.recipe);
        }
    }else if(e.target.matches('.btn-increase,.btn-increase *')){
       state.recipe.updateServings('inc');
       recipeView.upadteservingingreed(state.recipe);
        
    }else if(e.target.matches('.recipe__btn--add,.recipe__btn--add *')){
        controllist();
    }else if(e.target.matches('.recipe__love,.recipe__love *')){
        Likecontroller();
    }
    /*console.log(state.recipe.serving);
    console.log(state.recipe);*/
});

//window.l= new List();

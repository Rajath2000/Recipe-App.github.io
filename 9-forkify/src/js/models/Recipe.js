import axios from 'axios';
 export default class Recipe{
     constructor(Id){
         this.Id = Id;

     }
     async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.Id}`);
            this.title = res.data.recipe.title;
            this.author=res.data.recipe.publisher;
            this.img= res.data.recipe.image_url;
            this.url=res.data.recipe.source_url;
            this.ingerdient = res.data.recipe.ingredients;
            
            //console.log(res);
        }
        catch(error){
            alert(console.error);
        }
     }
     calctime(){
         const numindg = this.ingerdient.length;
         const periods = Math.ceil(numindg/3);
         this.time = periods*15;

     }
     calcserving(){
         this.serving = 4;
     }
     parseingdrdiens(){
         const unitslong = ['tabrlspoons','tabelspoon','ounces','ounce','teaspoons','teaspoon','cup','pounds'];
         const unitshort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
         const units = [...unitshort,'kg','g'];
         const newIngreediens = this.ingerdient.map(el=>{
                let ingredient = el.toLowerCase();
                unitslong.forEach((unit,i)=>{
                    ingredient = ingredient.replace(unit,unitshort[i]);
                });
        ingredient=ingredient.replace(/ *\([^)]*\) */g, ' ');

        const arring = ingredient.split(' ');
        const unitindex=arring.findIndex(el2=>units.includes(el2));
        let objIng;
        if(unitindex>-1){
                const arrcount=arring.slice(0,unitindex);
                let count;
                if(arrcount.length ===1){
                    count = eval(arring[0].replace('-','+'));
                }
                else{
                    count=eval(arring.slice(0,unitindex).join('+'));
                }
                objIng={
                    count,
                    unit:arring[unitindex],
                    ingredient:arring.slice(unitindex+1).join(' ')
                }
        }else if(parseInt(arring[0],10)){
                objIng={
                    count:1,
                    unit:'',
                    ingredient:arring.slice(1).join(' ')
                }
        }
        else if(unitindex === -1){
            objIng={
                count:1,
                unit:'',
                ingredient
            }
        }
        return objIng;
         });
         this.ingerdient=newIngreediens;
     }
     updateServings(type){
         const newServings =type==='dec'?this.serving-1:this.serving+1;
         this.ingerdient.forEach(ing=>{
             ing.count *=(newServings/this.serving);
         });
         this.serving=newServings;
     }
 }
//export default 'i am exported string';
/*
export const add = (a,b) => a+b;
export const mul =(a,b)=>a*b;
export const id=30;*/
//axios similar to fetch but here it automatically converts ang give json format code
import axios from 'axios';

export default class Search{
    constructor(query){
        this.query=query;
    }
    async  getResult(){
        try{
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
      this.recipe = res.data.recipes;
        }
        catch(error){
            alert(error);
        }
    }
}
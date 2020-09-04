export default class Likes{
    constructor(){
        this.likes=[];
    }
    addLikes(id,title,author,img){
        const like={
            id,
            title,
            author,
            img
        }
        this.likes.push(like);
        this.persistdata();
        return like;
    }
    deleteLikes(id){
        const index=this.likes.findIndex(el=>el.id===id);
        this.likes.splice(index,1);
        this.persistdata();
    }
    isLiked(id){
        return this.likes.findIndex(el=>el.id==id)!==-1;
    }
    getNumberLikes(){
        return this.likes.length;
    }
    //local storge
    persistdata(){
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }
    //restore data to program
    readstorage(){
        const storage =JSON.parse(localStorage.getItem('likes'));
        if(storage){
            this.likes=storage;
        }
    }
  
};
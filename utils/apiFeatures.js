import { remove } from "../models/rooms";

class  APIFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const location = this.queryStr.location ? {
            address:{
                $regex: this.queryStr.location,
                $options: 'i'
            }
        } : {}
        
        
        this.query = this.query.find({...location});
        return this;
    }
   filter(){
       const queryCopy = {...this.queryStr}
       const removeFields = ['location','page']
       
       removeFields.forEach(field=> delete queryCopy[field]);
       
       this.query = this.query.find(queryCopy);
       return this;
   }


   pagination(pageNumber){
     const currentPage =  Number(this.queryStr.page) || 1;
     
     const skip = pageNumber * (currentPage - 1);
     this.query = this.query.limit(pageNumber).skip(skip);

     return this;
   }
}

export default APIFeatures;
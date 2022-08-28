import { remove } from "../models/notifiers";

class  APIFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const location = this.queryStr.location ? {
            'address.city':{
                $regex: this.queryStr.location,
                $options: 'i'
            }
        } : {}

        console.log(this.queryStr,'the location of me')

        
        
        
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
import { remove } from "../models/notifiers";

class  APIFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;        
    }
   async search(){
        const location = this.queryStr.location ? {
            'address.district':{
                $regex: this.queryStr.location,
                $options: 'i'
            }
        } : {}
        
                              
        this.query = await this.query.find({...location});        
        return this;
    }
  async filter(){
       const queryCopy = {...this.queryStr}
       const removeFields = ['location','page']
       
       removeFields.forEach(field=> delete queryCopy[field]);
       
       this.query = await this.query.find(queryCopy);
       return this;
   }


  async pagination(pageNumber){
     const currentPage =  Number(this.queryStr.page) || 1;
     
     const skip = pageNumber * (currentPage - 1);
     this.query = await this.query?.find()?.limit(pageNumber)?.skip(skip);

     return this;
   }
}

export default APIFeatures;
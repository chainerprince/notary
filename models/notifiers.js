const  { Schema,model,models } = require("mongoose");

const notifierSchema = new Schema({
     name:{
         type:String,
         required:[true,"Please enter notifier name"],
         trim:true,
         maxLength:[100,"Notifier name can't exceed 100 characters"]
     },
     pricePerDocument:{
         type:String,
         required:[true,"Please enter notifier price per document"],
         trim:true,        
         default:'1000 RWF'
     },
     description:{
         type:String,
         required:[true,"Please enter notifier description"]
     },
     address:{
          lat:{
              type:Number,
              required:false
          },
          long:{
              type:Number,
              required:false
          },
           city:{
         type:String,
         required:[false]
     },
           sector:{
         type:String,
         required:[false]
     },
           cell:{
         type:String,
         required:[false]
     },
           village:{
         type:String,
         required:[false]
     },
      

           district:{
         type:String,
         required:[false]
     },
     },
       status: {
        type: String,
        required: false,
        default: 'pending'
        
     } ,           
     landServices:{
         type:Boolean,
         default:false
     },
     migrationServices:{
         type:Boolean,
         default:false
     },    
     marriage:{
         type:Boolean,
         default:false
     },
     category:{
         type:String,
         default:'private'
     },
     schoolReports:{
         type:Boolean,
         default:false
     },
     birthCertificates:{
         type:Boolean,
         default:false
     },
      education:{
                 type:String,  
                 default:'bachelors',             
                 required:true
             },
     ratings:{
         type:Number,
         default:0
     },
     numOfReviews:{
         type:Number,
         default:0
     },
          images:[
         {
            public_id:{
                  type:String,
                   required:true
         },
            url:{
                  type:String,
                   required:true
         }
         }
     ]
     ,
     profileImage: {
            public_id:{
                  type:String,
                   required:true
         },
            url:{
                  type:String,
                   required:true
         }
         },         
     reviews:[
         {
             user:{
                 type:Schema.ObjectId,
                 ref:"User",
                 required:false
             },
             name:{
                 type:String,                
                 required:true
             },            
             rating:{
                type:Number,                
                required:true
             },
             comment:{
                 type:String,
                 
                 required:true
             },
         }
     ],
     user:{
         type:Schema.ObjectId,
         required:false
     },
     createdAt:{
         type:Date,
         default:Date.now
     }
})

module.exports = models.Notifier || model('Notifier',notifierSchema)



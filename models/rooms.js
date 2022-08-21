const  { Schema,model,models } = require("mongoose");

const notifierSchema = new Schema({
     name:{
         type:String,
         required:[true,"Please enter notifier name"],
         trim:true,
         maxLength:[100,"Room name can't exceed 100 characters"]
     },
     pricePerDocument:{
         type:Number,
         required:[true,"Please enter notifier price per document"],
         trim:true,
         maxLength:[6,"Notifier price can't exceed 7 numbers"],
         default:0.0
     },
     description:{
         type:String,
         required:[true,"Please enter notifier description"]
     },
     address:{
          lat:{
              type:Number,
              required:true
          },
          long:{
              type:Number,
              required:true
          },
           city:{
         type:String,
         required:[false]
     },
           sector:{
         type:String,
         required:[false]
     },
           district:{
         type:String,
         required:[false]
     },
     },
     totalDocuments:{
         type:String,
         required:[true,"Please enter notifier document capacity"]
     },     
     landServices:{
         type:Boolean,
         default:false
     },
     migrationServices:{
         type:Boolean,
         default:false
     },
     divorce:{
         type:Boolean,
         default:false
     },
     marriage:{
         type:Boolean,
         default:false
     },
     schoolReports:{
         type:Boolean,
         default:false
     },
     birthCertificates:{
         type:Boolean,
         default:false
     },
     ratings:{
         type:Number,
         default:0
     },
     numOfReviews:{
         type:Number,
         default:0
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



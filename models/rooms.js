const  { Schema,model,models } = require("mongoose");

const roomSchema = new Schema({
     name:{
         type:String,
         required:[true,"Please enter room name"],
         trim:true,
         maxLength:[100,"Room name can't exceed 100 characters"]
     },
     pricePerNight:{
         type:Number,
         required:[true,"Please enter room price per night"],
         trim:true,
         maxLength:[4,"Room name can't exceed 5 characters"],
         default:0.0
     },
     description:{
         type:String,
         required:[true,"Please enter room description"]
     },
     address:{
         type:String,
         required:[true,"Please enter room address"]
     },
     guestCapacity:{
         type:String,
         required:[true,"Please enter room guest capacity"]
     },
     numOfBeds:{
         type:String,
         required:[true,"Please enter Number of beds"]
     },
     internet:{
         type:Boolean,
         default:false
     },
     airConditioner:{
         type:Boolean,
         default:false
     },
     breakfast:{
         type:Boolean,
         default:false
     },
     petsAllowed:{
         type:Boolean,
         default:false
     },
     roomCleaning:{
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
     category:{
        type:String,
        required:[true,"Please enter Number of beds"],
        enum:{
            values:[
                'King',
                'Twins',
                'Single'
            ],
            message:"Please select correct category for room"
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

module.exports = models.Room || model('Room',roomSchema)



import { model,Schema,models } from "mongoose";
import timeZone from 'mongoose-timezone'


const bookingSchema = new Schema({
      notifier:{
          type:Schema.Types.ObjectId,
          required:true,
          ref:'Notifier'
      },
      user:{
          type:Schema.Types.ObjectId,
          required:true,
          ref:'User'
      },
      date:{
          required:true,
          type:Date
      },
      time:{
          required:true,
          type:String
      },
      price:{
          type:Number,
          required:true
      },
     status: {
        type: String,
        required: false,
        default: 'pending'
        
     } ,  
      createdAt:{
          type:Date,
          default:Date.now
          
      }


})

bookingSchema.plugin(timeZone);

export default models.Booking || model("Booking",bookingSchema)
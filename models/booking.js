import { model,Schema,models } from "mongoose";
import timeZone from 'mongoose-timezone'


const bookingSchema = new Schema({
      room:{
          type:Schema.Types.ObjectId,
          required:true,
          ref:'Room'
      },
      user:{
          type:Schema.Types.ObjectId,
          required:true,
          ref:'User'
      },
      checkInDate:{
          required:true,
          type:Date
      },
      checkOutDate:{
          required:true,
          type:Date
      },
      amountPaid:{
          type:Number,
          required:true
      },
      daysOfStay:{
           type:Number,
           required:true
      }
      , 
      paymentInfo:{
          id:{
              type:String,
              required:true
          },
          status:{
              type:String,
              required:true
          }
      },
      paidAt:{
          type:Date,
          required:true
      },
      createdAt:{
          type:Date,
          default:Date.now
          
      }


})

bookingSchema.plugin(timeZone);

export default models.Booking || model("Booking",bookingSchema)
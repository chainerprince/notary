import Room from "../models/rooms";
import User from '../models/user'
import Booking from '../models/booking'

import AsyncErrors from "../middlewares/asyncErrors";
import absoluteUrl from 'next-absolute-url'

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);


const stripePayment = AsyncErrors(async(req,res)=>{
     const room = await Room.findById(req.query.roomid);
     console.log(req.query.roomid)

     const {origin} = absoluteUrl(req);

     const {checkInDate,checkOutDate,daysOfStay} = req.query;

     const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            success_url:`${origin}/bookings/me`,
            cancel_url:`${origin}/room/${room._id}`,
            customer_email:req.user.email,
            client_reference_id:req.query.roomid,
            metadata:{
             checkInDate,checkOutDate,daysOfStay
            },
           line_items:[
                {
                    name:room.name,
                    images:[`${room.images[0].url}`],
                    amount:req.query.amount * 100,
                    currency:'USD',
                    quantity:   1
                }
            ]            
     })

     res.status(200).json(session)
})

export {
    stripePayment
}
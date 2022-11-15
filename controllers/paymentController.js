// import Room from "../models/rooms";
// import User from '../models/user'
// import Booking from '../models/booking'

// import AsyncErrors from "../middlewares/asyncErrors";
// import absoluteUrl from 'next-absolute-url'
// import getRawBody from 'raw-body'




// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

 
// const stripePayment = AsyncErrors(async(req,res)=>{
//      const room = await Room.findById(req.query.roomid);
     

//      const {origin} = absoluteUrl(req);

//      const {checkInDate,checkOutDate,daysOfStay} = req.query;

//     //  console.log("the queyr is",req.query)

  

//      const session = await stripe.checkout.sessions.create({
//             payment_method_types:['card'],
//             success_url:`${origin}/appointments/me`,
//             cancel_url:`${origin}/room/${room._id}`,
//             customer_email:req.user.email,
//             client_reference_id:req.query.roomid,
//             metadata:{
//              checkInDate,checkOutDate,daysOfStay
//             },
//            line_items:[
//                 {
//                     name:room.name,
//                     images:[`${room.images[0].url}`],
//                     amount: req.query.amount * 100,
//                     currency:'USD',
//                     quantity:   1
//                 }
//             ]            
//      })
//     //  console.log("The session is ",session)

//      res.status(200).json(session)
// })



// const hookCheckout = AsyncErrors(async(req,res)=>{
    
//     const rawBody = await getRawBody(req)
//     try{
//        const signature = req.headers['stripe-signature']
//        const event = stripe.webhooks.constructEvent(rawBody,signature,process.env.WEB_HOOK_SECRET)
//     //    console.log("The event type not working")
//        if(event.type === 'checkout.session.completed'){
           
//            const session = event.data.object;
//            const room = session.client_reference_id;
//            const user = (await User.findOne({email:session.customer_email}))._id
//            console.log("The user",user,session.customer_email)
//            const amountPaid = session.amount_total /  100
//            const paymentInfo = {
//             id: session.payment_intent,
//             status: session.payment_status
//         }
//         //   console.log("This is the room id that you all want",room)
//         const checkInDate = session.metadata.checkInDate
//         const checkOutDate = session.metadata.checkOutDate
//         const daysOfStay = session.metadata.daysOfStay


 


//         const booking = await Booking.create({
//          room,
//          user,
//          checkInDate, 
//          checkOutDate,
//          daysOfStay, 
//          paidAt:Date.now(),
//          amountPaid,
//          paymentInfo 
//      })

// // console.log(booking)


//       res.status(201).json({
//           success:true,
          
//       })
//        }
       
//     }catch(error){
//                 console.log("Error in Stripe Checkout session",error)
//     }

// })

// export {
//     stripePayment,
//     hookCheckout,
// }
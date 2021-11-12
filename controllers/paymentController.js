import Room from "../models/rooms";
import User from '../models/user'
import Booking from '../models/booking'

import AsyncErrors from "../middlewares/asyncErrors";
import absoluteUrl from 'next-absolute-url'
import getRawBody from 'raw-body'
import Flutterwave from 'flutterwave-node-v3'

const flw=new Flutterwave(process.env.FLW_PUBLIC_KEY,process.env.FLW_PRIVATE_KEY);

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

 
const stripePayment = AsyncErrors(async(req,res)=>{
     const room = await Room.findById(req.query.roomid);
     

     const {origin} = absoluteUrl(req);

     const {checkInDate,checkOutDate,daysOfStay} = req.query;

    //  console.log("the queyr is",req.query)

  

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
                    amount: req.query.amount * 100,
                    currency:'USD',
                    quantity:   1
                }
            ]            
     })
    //  console.log("The session is ",session)

     res.status(200).json(session)
})


const mtnCheckout = AsyncErrors(async(req,res)=>{

    // console.log("The mtn Checkout")
    // const room = await Room.findById(req.query.roomid);
    const {origin} = absoluteUrl(req);
    const {phone,amount} = req.body;
    const current_date = (new Date()).valueOf().toString();
    const random = Math.random().toString();
    // http://localhost:3000/?resp=%7B%22status%22%3A%22success%22%2C%22message%22%3A%22Tx+Fetched%22%2C%22data%22%3A%7B%22id%22%3A2588286%2C%22txRef%22%3A%2216356225436920.7359887892178301%22%2C%22orderRef%22%3A%22URF_MMGH_1635622555415_4907135%22%2C%22flwRef%22%3A%22flwm3s4m0c1635622555987%22%2C%22redirectUrl%22%3A%22http%3A%2F%2F127.0.0%22%2C%22device_fingerprint%22%3A%22N%2FA%22%2C%22settlement_token%22%3Anull%2C%22cycle%22%3A%22one-time%22%2C%22amount%22%3A2000%2C%22charged_amount%22%3A2000%2C%22appfee%22%3A58%2C%22merchantfee%22%3A0%2C%22merchantbearsfee%22%3A1%2C%22chargeResponseCode%22%3A%2200%22%2C%22raveRef%22%3Anull%2C%22chargeResponseMessage%22%3A%22Pending+Payment+Validation%22%2C%22authModelUsed%22%3A%22MOBILEMONEY%22%2C%22currency%22%3A%22RWF%22%2C%22IP%22%3A%2252.209.154.143%22%2C%22narration%22%3A%22Chainer%22%2C%22status%22%3A%22successful%22%2C%22modalauditid%22%3A%22537beb68aecee8879b35222625d29556%22%2C%22vbvrespmessage%22%3A%22N%2FA%22%2C%22authurl%22%3A%22NO-URL%22%2C%22vbvrespcode%22%3A%22N%2FA%22%2C%22acctvalrespmsg%22%3A%22Approved%22%2C%22acctvalrespcode%22%3A%2200%22%2C%22paymentType%22%3A%22mobilemoneyrw%22%2C%22paymentPlan%22%3Anull%2C%22paymentPage%22%3Anull%2C%22paymentId%22%3A%22N%2FA%22%2C%22fraud_status%22%3A%22ok%22%2C%22charge_type%22%3A%22normal%22%2C%22is_live%22%3A0%2C%22retry_attempt%22%3Anull%2C%22getpaidBatchId%22%3Anull%2C%22createdAt%22%3A%222021-10-30T19%3A35%3A55.000Z%22%2C%22updatedAt%22%3A%222021-10-30T19%3A35%3A59.000Z%22%2C%22deletedAt%22%3Anull%2C%22customerId%22%3A1413048%2C%22AccountId%22%3A981811%2C%22customer.id%22%3A1413048%2C%22customer.phone%22%3A%220785369308%22%2C%22customer.fullName%22%3A%22undefined+undefined%22%2C%22customer.customertoken%22%3Anull%2C%22customer.email%22%3A%22mutegetsi2000%40gmail.com%22%2C%22customer.createdAt%22%3A%222021-10-12T19%3A48%3A33.000Z%22%2C%22customer.updatedAt%22%3A%222021-10-12T19%3A48%3A33.000Z%22%2C%22customer.deletedAt%22%3Anull%2C%22customer.AccountId%22%3A981811%2C%22meta%22%3A%5B%5D%2C%22flwMeta%22%3A%7B%7D%7D%7D

    const ref = current_date + random
    console.log(ref)
    const payload = {
        "tx_ref": ref,
        "order_id": "USS_URG_893982923s2323", 
        // "redirect_url": "http://localhost:3000/payment",
        "amount":amount,
        "currency": "RWF",
        "email": req.user.email,
        "phone_number": phone,
        "fullname": req.user.firstname+" "+req.user.lastname,
        "callback": (data)=>{
              
        },
        "customization": {
            title:"Book Hotel",
            description:"Pay to book a hotel",
            
        }
    }
   

    let response=await flw.MobileMoney.rwanda(payload);
    res.status(200).json(response)
   if(!response){
       console.log("The thing couldn't work ")
   }
})

const hookCheckout = AsyncErrors(async(req,res)=>{
    
    const rawBody = await getRawBody(req)
    try{
       const signature = req.headers['stripe-signature']
       const event = stripe.webhooks.constructEvent(rawBody,signature,process.env.WEB_HOOK_SECRET)
    //    console.log("The event type not working")
       if(event.type === 'checkout.session.completed'){
           
           const session = event.data.object;
           const room = session.client_reference_id;
           const user = (await User.findOne({email:session.customer_email}))._id
           console.log("The user",user,session.customer_email)
           const amountPaid = session.amount_total /  100
           const paymentInfo = {
            id: session.payment_intent,
            status: session.payment_status
        }
        //   console.log("This is the room id that you all want",room)
        const checkInDate = session.metadata.checkInDate
        const checkOutDate = session.metadata.checkOutDate
        const daysOfStay = session.metadata.daysOfStay


 


        const booking = await Booking.create({
         room,
         user,
         checkInDate, 
         checkOutDate,
         daysOfStay, 
         paidAt:Date.now(),
         amountPaid,
         paymentInfo 
     })

// console.log(booking)


      res.status(201).json({
          success:true,
          
      })
       }
       
    }catch(error){
                console.log("Error in Stripe Checkout session",error)
    }

})

export {
    stripePayment,
    hookCheckout,
    mtnCheckout
}
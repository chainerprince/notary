import Booking from "../models/booking";

import AsyncErrors from "../middlewares/asyncErrors";

import Moment from 'moment'

import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);




export const checkRoomAvailability = AsyncErrors(async(req,res,next)=>{
    let  {roomId,checkInDate,checkOutDate} = req.query;
    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);
    const bookings = await Booking.find({
        room:roomId,
        $and:[
            {
             checkInDate : {
                    $lte:checkOutDate
                }
           },{
               checkOutDate:{
                   $gte:checkInDate
               }
           }
        ]
    })


    let isAvailable;

    if(bookings && bookings.length === 0){
        isAvailable = true;
    }else{
        isAvailable = false;
    }
    
   
    




  
   
   
    res.status(201).json({
        success:true,
        isAvailable
    })
    
 })






 export const bookingDetails = AsyncErrors(async(req,res,next)=>{
    const booking = await Booking.findById(req.query.id)
    .populate({
        path:'room',
        select:'name pricePerNight  images'
    })
    .populate({
        path:'user',
        select:'name email'
    })
    
    

    res.status(201).json({
        success:true,
        booking
    })
    
 })


 export const deleteBooking = AsyncErrors(async(req,res,next)=>{
    const booking = await Booking.findById(req.query.id)

    if(!booking){
        return next(new ErrorHandler("The room can't be found",404))
    }

    await booking.remove();
    
    

    res.status(201).json({
        success:true,
        booking
    })
    
 })



export const myBookings = AsyncErrors(async(req,res,next)=>{
    const bookings = await Booking.find({
        user:req.user._id
        
    })
    .populate({
        path:'room',
        select:'name pricePerNight  images'
    })
    .populate({
        path:'user',
        select:'name email'
    })
    

    res.status(201).json({
        success:true,
        bookings
    })
    
 })


export const allBookings = AsyncErrors(async(req,res,next)=>{
    const bookings = await Booking.find()
    .populate({
        path:'room',
        select:'name pricePerNight  images'
    })
    .populate({
        path:'user',
        select:'name email'
    })

    res.status(201).json({
        success:true,
        bookings
    })
    
 })




export const checkBookedDates = AsyncErrors(async(req,res,next)=>{
    let  {roomid} = req.query;
    

    const bookings = await Booking.find({
        room:roomid
    })
    

    let bookedDates = [];

    const timeDifference = moment().utcOffset() / 60;
    console.log(timeDifference);
    bookings.forEach(booking=>{
        const checkInDate = moment(booking.checkInDate).add(timeDifference,'hours');
        const checkOutDate = moment(booking.checkOutDate).add(timeDifference,'hours');
        const range = moment.range(moment(checkInDate),moment(checkOutDate))
        
        
        const dates = Array.from(range.by('day'));
       
        bookedDates = bookedDates.concat(dates);

        

    })
    


    

    res.status(201).json({
        success:true,
        bookedDates
    })
    
 })






export const newBooking = AsyncErrors(async(req,res,next)=>{


    
    const {
        room,
        
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paidAt,
        paymentInfo
    } = req.body;
    




  
   const booking = await Booking.create({
       room,
       user:req.user._id,
       checkInDate,
       checkOutDate,
       daysOfStay, 
       paidAt,
       amountPaid,
       paymentInfo 
   })
   
    res.status(201).json({
        success:true,
        booking
    })
    
 })
import Booking from "../models/appointment";
import Notifier from "../models/notifiers";
import AsyncErrors from "../middlewares/asyncErrors";

import Moment from 'moment'

import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);




export const checkNotifierAvailability = AsyncErrors(async(req,res,next)=>{
    let  {notifierId,currentDate} = req.query;   


    const appointments = await Booking.find({
        notifier:notifierId,        
    })
    
    const bookedDates = Array.from(appointments).
    filter(booked=>moment(currentDate).
    isBetween(moment(booked.date), moment(booked.date).add(30,'minutes'))) 

    let isAvailable;

    if(bookedDates && bookedDates.length === 0){
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
        path:'notifier',
        select:'name pricePerDocument  images'
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
        return next(new ErrorHandler("The notifier can't be found",404))
    }

    await booking.remove();
    
    

    res.status(201).json({
        success:true,
        booking
    })
    
 })



export const myBookings = AsyncErrors(async(req,res,next)=>{

    try{
 const bookings = await Booking.find({
        user:req.user._id
    })
    .populate({
        path:'notifier',
        select:'name pricePerDocument  images'
    })
    .populate({
        path:'user',
        select:'name email'
    })
        
    res.status(201).json({
        success:true,
        bookings
    })
    }
    catch(error){
        console.log(error)
res.status(400).json({
        success:true,
        error: error
    })
    }
   
    
 })


export const allBookings = AsyncErrors(async(req,res,next)=>{
    const bookings = await Booking.find()
    .populate({
        path:'notifier',
        select:'name pricePerDocument  images'
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
        notifier,    
        date,
        time,        
        price,
        document,
        status,      
    } = req.body;
  
   const booking = await Booking.create({
       notifier,
       user:req.user && req.user._id,
        date,
        time,        
        price,
        document,
        status,    
        
   })
    console.log(booking,'the booking we want')
    res.status(201).json({
        success:true,
        booking
    })
    
 })


 export const approveAppointment = AsyncErrors(async(req,res,next)=>{
    try{        
 const booking = await Booking.findByIdAndUpdate(req.body.id, { $set: { status: true } });
   
   
    res.status(201).json({
        success:true,        
    })
    }   
    catch(error) {
        console.log(error,'the error')
    }
  
 })
 export const denyAppointment = AsyncErrors(async(req,res,next)=>{
    try{        
 const booking = await Booking.findByIdAndUpdate(req.body.id, { $set: { status: false } });   
   
    res.status(201).json({
        success:true,        
    })
    }   
    catch(error) {
        console.log(error,'the error')
    }
  
 })

 export const notifierBookings = AsyncErrors(async(req,res,next)=>{    
    const notifier = await Notifier.findOne({user: req.user?._id})
    
    const bookings = await Booking.find({notifier:notifier?._id})    
    .populate({
        path:'notifier',
        select:'name pricePerDocument  images'
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
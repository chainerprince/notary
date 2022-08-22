import Notifier from "../models/notifiers";
import Booking from '../models/appointment'
import ErrorHandler from "../utils/errorHandler";
import AsyncErrors from "../middlewares/asyncErrors";
import APIFeatures from "../utils/apiFeatures";

import cloudinary from 'cloudinary'

const allRooms = AsyncErrors(async(req,res)=>{
     const resPerPage = 4;
     const roomsCount = await Notifier.countDocuments();
     console.log(roomsCount,'the number of rooms')
     const apiFeatures = new APIFeatures(Notifier.find(),req.query).
     search().
     filter()
     
     let rooms = await apiFeatures.query;
     let filteredRoomsCount = rooms.length;
     apiFeatures.pagination(resPerPage);
     rooms = await apiFeatures.query;
    res.status(200).json(
      {
        success:true, 
        roomsCount,
        resPerPage,
        filteredRoomsCount,
        rooms
      }  
    )
   
   
})



const singleRoom = AsyncErrors(async(req,res,next)=>{
   
      const room = await Notifier.findById(req.query.id);
     
      if(!room){
        return next(new ErrorHandler("That Room is not saved",404));
      }

      res.status(200).json({
        success:true,
        room
      })

    
})


export const roomReviews = AsyncErrors(async(req,res,next)=>{
   
      const room = await Notifier.findById(req.query.id);
     
      if(!room){
        return next(new ErrorHandler("That Room is not saved",404));
      }

      res.status(200).json({
        success:true,
         reviews: room.reviews
      })

    
})


export const deleteReview = AsyncErrors(async(req,res,next)=>{
   
      const room = await Notifier.findById(req.query.roomid);
      if(!room){
        return next(new ErrorHandler("That Room is not saved",404));
      }

      const reviews = room.reviews.filter(review => review._id.toString() !== req.query.id.toString())

      const numOfReviews = reviews.length;
  
      const ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

      await Notifier.findByIdAndUpdate(req.query.roomid,{
        reviews,
        ratings,
        numOfReviews
      },
      {
        new:true,
        runValidators:true,
        
      }
      )
     
     

      res.status(200).json({
        success:true,
         reviews: room.reviews
      })

    
})

const updateRoom = AsyncErrors(async(req,res,next)=>{
  
    
    let room = await Notifier.findById(req.query.id);
    if(!room){
      return next(new ErrorHandler("That Room doesn't Exist",404));
    }
   

    if(req.body.images){
      for(let i=0;i<room.images.length;i++){
        await cloudinary.v2.uploader.destroy(room.images[i].public_id)
      }
    }

    let imageLinks=[];
    

    for(let i = 0; i < req.body.images.length ; i++){
      const result = await cloudinary.v2.uploader.upload(req.body.images[i],{
        folder:"bookit/rooms",
       
    })
    
   imageLinks.push({
    public_id:result.public_id,
    url:result.secure_url
  }) 
  
    }
  
    req.body.images = imageLinks;

    room = await Notifier.findByIdAndUpdate(req.query.id,req.body,{
      new:true,
      runValidators: true
    })
    res.status(200).json({
      success:true,
      room
    })
    
 
})


const deleteRoom = AsyncErrors(async(req,res,next)=>{
  
    const room = await Notifier.findById(req.query.id);
    if(!room){
      return next(new ErrorHandler("That Room doesn't Exist",404));
    }
    for(let i=0;i<room.images.length;i++){
      await cloudinary.v2.uploader.destroy(room.images[i].public_id)
    }
    await room.remove();
    res.status(200).json({
      success:true,
      message:"The room has been deleted succesfully"
    })

 
})


export const createRoomReview = AsyncErrors(async(req,res,next)=>{

  const {rating , roomId, comment } = req.body;
  const review = {
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }
    const room = await Notifier.findById(roomId);
    

    


  

    const isReviewed = room.reviews.find(r=>r.user.toString() === req.user._id.toString());
   if(isReviewed){
          room.reviews.forEach(review=>{
            review.comment = comment,
            review.rating = rating
          })
   }else{
     room.reviews.push(review);
     room.numOfReviews = room.reviews.length;
   }

   room.ratings = room.reviews.reduce((tot,item)=> tot + item.rating,0) /room.reviews.length
  
  

   await room.save({validateBeforeSave:true});




   
    
    res.status(200).json({
      success:true,
      
    })

 
})

export const canReview = AsyncErrors(async(req,res,next)=>{

  const {roomid} = req.query;
  
    const bookings = await Booking.find({user:req.user._id,room:roomid})

      let booked = false;
    bookings.length > 0 ? booked = true : null;
    
    res.status(200).json({
      success:true,
      booked
    })

 
})


export const allAdminRooms = AsyncErrors(async(req,res,next)=>{

     const rooms = await Notifier.find();
    
    res.status(200).json({
      success:true,
      rooms
    })

 
})

const saveRoom = AsyncErrors(async (req,res)=>{
  const images = req.body.images;

  let imageLinks = [];
  
  
  for(let i = 0; i < images.length ; i++){
    const result = await cloudinary.v2.uploader.upload(req.body.images[i],{
      folder:"bookit/rooms",
      width:'150',
      crop:'scale'
  })
  
 imageLinks.push({
  public_id:result.public_id,
  url:result.secure_url
}) 

  }

  req.body.images = imageLinks;
  req.body.user = req.user._id;
  
  const room = await Notifier.create(req.body);
  console.log(room)
  res.status(201).json(
    {
      success:true,
      room

    }
  )

})






export {
    allRooms,saveRoom,singleRoom,updateRoom,deleteRoom
}
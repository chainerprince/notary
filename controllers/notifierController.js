import Notifier from "../models/notifiers";
import Booking from '../models/appointment'
import ErrorHandler from "../utils/errorHandler";
import AsyncErrors from "../middlewares/asyncErrors";
import APIFeatures from "../utils/apiFeatures";
import User from "../models/user";
import cloudinary from 'cloudinary'

const allNotifiers = AsyncErrors(async(req,res)=>{
     const resPerPage = 4;
     const notifiersCount = await Notifier.countDocuments();     
     const apiFeatures = await new APIFeatures(Notifier,req.query).
     search()                    
     let notifiers =  apiFeatures.query;         
     let filteredNotifiersCount = notifiers.length;
     apiFeatures.pagination(resPerPage);
     notifiers = await apiFeatures.query;
    res.status(200).json(
      {
        success:true, 
        notifiersCount,
        resPerPage,
        filteredNotifiersCount,
        notifiers
      }  
    )
   
   
})



const singleNotifier = AsyncErrors(async(req,res,next)=>{
   
        const notifier = await Notifier.findById(req.query.id);
      
     
      if(!notifier ){
        const notifierFromUser = await Notifier.findOne({user:req.query.id});
         if(notifierFromUser){
        res.status(200).json({
          success:true,
          notifier:notifierFromUser
        })}
        return next(new ErrorHandler("That Notifier is not registered",404));
      }
   
      res.status(200).json({
        success:true,
        notifier
      })   

    
})


export const notifierReviews = AsyncErrors(async(req,res,next)=>{      
      const notifier = await Notifier.findOne({user:req.query.id});          
      if(!notifier){
        return next(new ErrorHandler("That Notifier is not saved",404));
      }           
      res.status(200).json({
        success:true,
         reviews: notifier.reviews
      })    
})


export const deleteReview = AsyncErrors(async(req,res,next)=>{
   
      const notifier = await Notifier.findById(req.query.roomid);
      if(!notifier){
        return next(new ErrorHandler("That notifier is not saved",404));
      }

      const reviews = notifier.reviews.filter(review => review._id.toString() !== req.query.id.toString())

      const numOfReviews = reviews.length;
  
      const ratings = notifier.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

      await Notifier.findByIdAndUpdate(req.query.notifierid,{
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
         reviews: notifier.reviews
      })

    
})

const updateNotifier = AsyncErrors(async(req,res,next)=>{
  
    
    let notifier = await Notifier.findById(req.query.id);
    if(!notifier){
      return next(new ErrorHandler("That Notifier doesn't Exist",404));
    }
   

    if(req.body.images){
      if(notifier.images){
 for(let i=0;i<notifier?.images?.length;i++){
        await cloudinary.v2.uploader.destroy(notifier?.images[i]?.public_id)
      }
      }
     
    }

    let imageLinks=[];
    

    for(let i = 0; i < req.body?.images?.length ; i++){
      const result = await cloudinary.v2.uploader.upload(req.body.images[i],{
        folder:"bookit/rooms",
       
    })
    
   imageLinks.push({
    public_id:result.public_id,
    url:result.secure_url
  }) 
  
    }
  
    req.body.images = imageLinks;

    notifier = await Notifier.findByIdAndUpdate(req.query.id,req.body,{
      new:true,
      runValidators: true
    })
    res.status(200).json({
      success:true,
      notifier
    })
    
 
})


const deleteNotifier = AsyncErrors(async(req,res,next)=>{
  
    const notifier = await Notifier.findById(req.query.id);    
    if(!notifier){
      return next(new ErrorHandler("That notifier doesn't Exist",404));
    }
//     if(notifier.images){
// for(let i=0;i<notifier.images.length;i++){
//       await cloudinary.v2.uploader.destroy(notifier.images[i].public_id)
//     }
//     }    
     notifier.status='canceled';
     await notifier.save();
    res.status(200).json({
      success:true,
      message:"The notifier has been canceled succesfully"
    })

 
})


export const createNotifierReview = AsyncErrors(async(req,res,next)=>{

  const {rating , notifierId, comment } = req.body;
  const review = {
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }
    const notifier = await Notifier.findById(notifierId);    

    const isReviewed = notifier.reviews.find(r=>r.user.toString() === req.user._id.toString());
    
   if(isReviewed){
          notifier.reviews.forEach(review=>{
            review.comment = comment,
            review.rating = rating
          })
   }else{
     notifier.reviews.push(review);
     notifier.numOfReviews = notifier.reviews.length;
   }

   notifier.ratings = notifier.reviews.reduce((tot,item)=> tot + item.rating,0) /notifier.reviews.length
  
  

   await notifier.save({validateBeforeSave:true});




   
    
    res.status(200).json({
      success:true,
      
    })

 
})

export const canReview = AsyncErrors(async(req,res,next)=>{

  const {notifier} = req.query;  

  
    const bookings = await Booking.find({user:req.user._id,notifier})      
    const approved = bookings?.filter(booking=>booking.status == 'true')
    // console.log(approved,'the approved')
      let booked = false;
    ( (bookings.length  > 0) && (approved.length > 0))  ? booked = true : null;    
    res.status(200).json({
      success:true,
      booked
    })

 
})


export const allAdminNotifiers = AsyncErrors(async(req,res,next)=>{

     const notifiers = await Notifier.find();         
    res.status(200).json({
      success:true,
      notifiers
    })

 
})

const saveNotifier = AsyncErrors(async (req,res)=>{
  const images = req.body.images;
  const profileImage = req.body.profileImage;

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
    const profileResult = await cloudinary.v2.uploader.upload(profileImage,{
      folder:"bookit/avatars",
      width:'150',
      crop:'scale'
  })  
  const profileImageLink = {
    public_id : profileResult.public_id,
    url:profileResult.secure_url
  }  
  req.body.images = imageLinks;
  req.body.profileImage = profileImageLink;
  req.body.user = req.user._id;

  const updateduser = await User.findByIdAndUpdate(req.user._id,{role: 'notifier'})
  console.log(updateduser)
  
  const notifier = await Notifier.create(req.body);  
  res.status(201).json(
    {
      success:true,
      notifier

    }
  )

})


export {
    allNotifiers,saveNotifier,singleNotifier,updateNotifier,deleteNotifier
}
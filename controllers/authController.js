
import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import AsyncErrors from "../middlewares/asyncErrors";

import cloudinary from 'cloudinary'
import absoluteUrl from "next-absolute-url";
import sendEmail from '../utils/sendEmail'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY,
    
})
const currentUser = AsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user._id);
    
    res.status(201).json({
      success:true,
      user
  })
  })


export  const allUsers = AsyncErrors(async (req,res,next)=>{
    const user = await User.find();
    
    res.status(201).json({
      success:true,
      user
  })
  })


export  const userDetails = AsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.query.id);
   
    if(!user){
        return next(new ErrorHandler('That user is not recorded in the system',404));
        
    }
    res.status(201).json({
      success:true,
      user
  })
  })


export  const deleteUser = AsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.query.id);
   
    if(!user){
        return next(new ErrorHandler('That user is not recorded in the system',404));
        
    }
    await user.remove();
    
    res.status(201).json({
      success:true,
      
  })
  })


export  const adminUpdateUser = AsyncErrors(async (req,res,next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.query.id,newUserData,{
        runValidators:true
    });
    if(!user){
        return next(new ErrorHandler('That user is not recorded in the system',404));
        
    }
    res.status(201).json({
      success:true,
      
  })
  })




const updateUser = AsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user._id);
        
    if(user){
        user.name = req.body.name;
        user.email = req.body.email
        if(req.body.password) user.password = req.body.password;
    }
    
    if(req.body.avatar !== ''){
         const prev_avatar = user.avatar.public_id;
         await cloudinary.v2.uploader.destroy(prev_avatar);
         const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"bookit/avatars",
            width:'150',
            crop:'scale'
        })
        user.avatar = {
            public_id:result.public_id,
            url:result.secure_url
        }

    }
    await user.save();


    res.status(201).json({
      success:true
    })
  })



const resetPassword = AsyncErrors(async (req,res,next)=>{

    const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    });

    if(!user){
        return next(new ErrorHandler('Invalid password reset token or has expired',404));
        
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Passwords don't match",404));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
   



    res.status(201).json({
      success:true,
      message:"Password updated succesfully"
    })
  })
  
const forgotPassword = AsyncErrors(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler('User with this email not found',404));
        // user.name = req.body.name;
        // user.email = req.body.email
        // if(req.body.password) user.password = req.body.password;
    }
    const resetToken = user.getPasswordToken();
    await user.save({validateBeforeSave:false})
    const origin = absoluteUrl(req)

    const resetUrl = `${origin}/password/reset/${resetToken}`


    const message = `The reset url is: \n\n ${resetUrl}
    If you have not requested this email, then report it to google
    `;

    try {
       await sendEmail({
           email:user.email,
           subject:"Bookit Recovery Email",
           message
       })

       res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} `
      })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500));
    }



    res.status(201).json({
      success:true
    })
  })
  






const registerUser = AsyncErrors(async(req,res,next)=>{
  
  
// })
const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'bookit/avatars',
    // width: '150',
    // crop: 'scale'
})


const { name, email, password } = req.body;
const userExists = await User.find({email});
if(userExists?.length > 0){
    return next(new ErrorHandler('User with this email already exists',400));
}

const user = await User.create({
    name,
    email:email.toLowerCase(),
    password,
    avatar: {
        public_id: result.public_id,
        url: result.secure_url
    }
});

res.status(200).json({
    success: true,
    message: 'Account Registered successfully'
})

})



export {
    registerUser,
    currentUser,
    updateUser,
    forgotPassword,
    resetPassword
}
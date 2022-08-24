
import AsyncErrors from "./asyncErrors";

import { getSession } from "next-auth/client";
import ErrorHandler from "../utils/errorHandler";
  const isAuthenticated = AsyncErrors(async (req,res,next)=>{
    const session = await getSession({req})    
    if(!session){
      return  next(new ErrorHandler("You must first login",304));
    
    }
    req.user = session.user;
    next();
})


export const authorize = (...roles) => {
  return (req,res,next) => {
    if(!roles.includes(req.user.role)){
      console.log(req.user);  

      return next(new ErrorHandler('You are not authorized to view this',403))
    }
    next();
  }
}


  export default isAuthenticated
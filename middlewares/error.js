/* eslint-disable import/no-anonymous-default-export */
import ErrorHandler from "../utils/errorHandler";

export default (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    let error = {...err}
    error.message = err.message
    if(err.name == "CastError"){
        const message = `Not found : Invalid ${err.path}`
        error = new ErrorHandler(message,404)
    }
    if(err.name == "ValidationError"){
        const message = Object.values(err.errors).map(val=>val.message);
        error = new ErrorHandler(message,404)
    }
     res.status(err.statusCode).json({
         success:false,
         error,
         message:error.message,
         stack:error.stack
     })
}
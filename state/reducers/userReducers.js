
import {
   USER_REGISTER_FAIL,
   USER_REGISTER_SUCCESS, 
   USER_REGISTER_REQUEST, 
   CLEAR_ERRORS,


   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGIN_FAIL,


   FORGOT_PASSWORD_REQUEST,
   FORGOT_PASSWORD_SUCCESS,
   FORGOT_PASSWORD_FAIL,

   RESET_PASSWORD_REQUEST,
   RESET_PASSWORD_SUCCESS,
   RESET_PASSWORD_FAIL,


   UPDATE_PROFILE_REQUEST,
   UPDATE_PROFILE_SUCCESS,
   UPDATE_PROFILE_FAIL,
   UPDATE_PROFILE_RESET,

   ALL_USER_REQUEST,
   ALL_USER_SUCCESS,
   ALL_USER_FAIL,

   UPDATE_USER_REQUEST,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_FAIL,
   UPDATE_USER_RESET,
   
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_DETAILS_FAIL,
   DELETE_USER_FAIL,
   DELETE_USER_SUCCESS,
   DELETE_USER_REQUEST,
   DELETE_USER_RESET,

  

}
from '../constants/userConstants'


export const userDetailReducer = (state={user:{}},action)=>{
    
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading:true  
            }
       
        case USER_DETAILS_SUCCESS:
            return {
                loading:false,                
                user:action.payload
            }
     
            
        case USER_DETAILS_FAIL:
            return {
                 error:action.payload
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                     error:null
                }
                
            default:
                return state

    }
}


export const AllUserReducer = (state={user:null},action)=>{
    switch(action.type){
        case ALL_USER_REQUEST:
            return {
                loading:true
                
            }
       
        case ALL_USER_SUCCESS:
            return {
                loading:false,
                
                users:action.payload
                
            }
     
            
        case ALL_USER_FAIL:
            return {
                 error:action.payload
            }
        case CLEAR_ERRORS:
                return {
                    ...state,
                     error:null
                }
                
            default:
                return state

    }
}


export const authReducer = (state={user:null},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {
                loading:true
                
            }
       
        case USER_REGISTER_SUCCESS:
            return {
                loading:false,
                success:true
                
            }
     
            
        case USER_REGISTER_FAIL:
            return {
                 error:action.payload
            }
        case CLEAR_ERRORS:
                return {
                    ...state,
                     error:null,
                     success:false
                }
                
        default:
                return state

    }
}


export const loginReducer = (state={user:null,loading:true},action) => {
    switch(action.type){

        case USER_LOGIN_REQUEST:
            return {
                loading:true,
                isAuthenticated:false,
                
    
            }

            case USER_LOGIN_SUCCESS:
                return {
                    loading:false,
                    isAuthenticated:true,
                    user:action.payload
                    
                    
                }
                case USER_LOGIN_FAIL:
                    return {
                        loading:false,
                        isAuthenticated:false,
                         error:action.payload
                    }

                    case CLEAR_ERRORS:
                        return {
                            ...state,
                             error:null
                        }
                        
                    default:
                        return state
    }

    
}


export const resetPasswordReducer = (state={},action)=>{
    switch(action.type){
        case RESET_PASSWORD_REQUEST:
            return {
                loading:true
                
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                loading:false,
                success:action.payload,
                

            }
        case RESET_PASSWORD_FAIL:
            return {
               loading:false,
               error: action.payload
                
            }
       
            
        
        case CLEAR_ERRORS:
            return {
                ...state,
                 error:null
            }
            
        default:
            return state
    }
}


export const forgotPasswordReducer = (state={},action)=>{
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
            return {
                loading:true
                
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                loading:false,
                message:action.payload,
                

            }
        case FORGOT_PASSWORD_FAIL:
            return {
               loading:false,
               error: action.payload
                
            }
       
            
        
        case CLEAR_ERRORS:
            return {
                ...state,
                 error:null
            }
            
        default:
            return state
    }
}





export const userReducer = (state={},action)=>{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
            case UPDATE_USER_REQUEST:
            case DELETE_USER_REQUEST:
                
            return {
                ...state,
                loading:true
                
            }
        case UPDATE_PROFILE_SUCCESS:
            case UPDATE_USER_SUCCESS:
            return {
                loading:false,
                isUpdated:action.payload,
                
                

            }

            case DELETE_USER_SUCCESS:

                return {
                    loading:false,
                    isDeleted:action.payload,
                    
                    
    
                }
    
        case UPDATE_PROFILE_FAIL:
            case UPDATE_USER_FAIL:
            case DELETE_USER_FAIL:
            return {
               loading:false,
               error: action.payload
                
            }
        case UPDATE_PROFILE_RESET:
            case UPDATE_USER_RESET:
            case DELETE_USER_RESET:
            return {
                loading:false,
                isUpdated:false,
                isDeleted:false
                
            }
            
        
        case CLEAR_ERRORS:
            return {
                ...state,
                 error:null
            }
            
        default:
            return state
    }
}
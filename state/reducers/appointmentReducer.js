

import {
    CHECK_BOOKING_FAIL,
    CHECK_BOOKING_SUCCESS, 
    CHECK_BOOKING_REQUEST, 
    CLEAR_ERRORS,
    BOOKING_DETAILS_SUCCESS,
    BOOKING_DETAILS_FAIL,
 
    BOOKED_DATES_FAIL, BOOKED_DATES_SUCCESS, CHECK_BOOKING_RESET, MY_BOOKINGS_SUCCESS, MY_BOOKINGS_FAIL, ADMIN_BOOKING_SUCCESS, ADMIN_BOOKING_FAIL , ADMIN_BOOKING_REQUEST, DELETE_BOOKING_REQUEST, DELETE_BOOKING_SUCCESS, DELETE_BOOKING_FAIL, DELETE_BOOKING_RESET, NOTIFIER_BOOKING_REQUEST, NOTIFIER_BOOKING_SUCCESS, NOTIFIER_BOOKING_FAIL
 }
 from '../constants/appointmentConstants'


 
export const myAppointmentReducer = (state={bookings:[],error:null},action)=>{
    switch(action.type){
        case ADMIN_BOOKING_REQUEST:
        case NOTIFIER_BOOKING_REQUEST:
            
            return {
                loading:true   ,
                bookings: [],
                error: false
            }
        
        case MY_BOOKINGS_SUCCESS:
            case ADMIN_BOOKING_SUCCESS:
            case NOTIFIER_BOOKING_SUCCESS:
            return {
                loading:false,
                bookings:action.payload,
                error: false
                
            }

        case MY_BOOKINGS_FAIL:
            case ADMIN_BOOKING_FAIL:
            case NOTIFIER_BOOKING_FAIL:
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


export const deleteBookingReducer = (state={bookings:[],error:null},action)=>{
    switch(action.type){
        case DELETE_BOOKING_REQUEST:
            return {
                loading:true   
            }
        
            case DELETE_BOOKING_SUCCESS:
            return {
                loading:false,
                isDeleted:action.payload
                
            }

            case DELETE_BOOKING_FAIL:
            return {
                 error:action.payload
            }

            case DELETE_BOOKING_RESET:
            return {
                 loading:false,
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






export const bookingDetailsReducer = (state = { booking:{}, error:null},action)=>{
    switch(action.type){
        
        case BOOKING_DETAILS_SUCCESS:
            return {
                loading:false,
                booking : action.payload
                
            }

        case BOOKING_DETAILS_FAIL:
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






export const bookedDatesReducer = (state={dates:[]},action)=>{
    switch(action.type){
        
        case BOOKED_DATES_SUCCESS:
            return {
                loading:false,
                dates:action.payload
                
            }

        case BOOKED_DATES_FAIL:
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








export const checkBookingReducer = (state={user:null},action)=>{
    switch(action.type){
        case CHECK_BOOKING_REQUEST:
            return {
                loading:true
                
            }
       
        case CHECK_BOOKING_SUCCESS:
            return {
                loading:false,
                available:action.payload
                
            }
            
        case CHECK_BOOKING_RESET:
            return {
                loading:false,
                available:null
                
            }
     
            
        case CHECK_BOOKING_FAIL:
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
import axios from "axios";
import absoluteUrl from "next-absolute-url";

import {
   CHECK_BOOKING_FAIL,
   CHECK_BOOKING_SUCCESS, 
   CHECK_BOOKING_REQUEST, 
   CLEAR_ERRORS,
   BOOKED_DATES_FAIL,
   BOOKED_DATES_SUCCESS,
   MY_BOOKINGS_SUCCESS,
   MY_BOOKINGS_FAIL,
   BOOKING_DETAILS_FAIL,
   BOOKING_DETAILS_SUCCESS,
   ADMIN_BOOKING_SUCCESS,
   ADMIN_BOOKING_FAIL,
   ADMIN_BOOKING_REQUEST,
   DELETE_BOOKING_REQUEST,
   DELETE_BOOKING_SUCCESS,
   DELETE_BOOKING_FAIL,
   NOTIFIER_BOOKING_REQUEST,
   NOTIFIER_BOOKING_SUCCESS,
   NOTIFIER_BOOKING_FAIL

    
   

 }
 from '../constants/appointmentConstants'

 
export const bookingDetails = (authCookie, req, id) => async (dispatch) => {
    try {

        const { origin } = absoluteUrl(req);

        const config = {
            headers: {
                
                cookie: authCookie
            }
        }

        const { data } = await axios.get(`${origin}/api/appointments/${id}`, config)
        

        dispatch({
            type: BOOKING_DETAILS_SUCCESS,
            payload: data.booking
        })

    } catch (error) {

        dispatch({
            type: BOOKING_DETAILS_FAIL,
            payload: error?.response?.data?.message
        })
    }

}


export const deleteBooking = (id) => async(dispatch) => {
    try {
     dispatch({type:DELETE_BOOKING_REQUEST})
     
        
        const {data} = await axios.delete(`/api/admin/appointments/${id}`)
        
        
        dispatch({
            type: DELETE_BOOKING_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        
        dispatch({
            type:DELETE_BOOKING_FAIL,
            payload:error.response.data.message
        })
    }
  }
  



export const bookings = (authCookie, req) => async (dispatch) => {
    try {

        const { origin } = absoluteUrl(req);

        const config = {
            headers: {
                
                cookie: authCookie
            }
        }

        const { data } = await axios.get(`${origin}/api/appointments/me`, config)
        console.log(data)

        dispatch({
            type: MY_BOOKINGS_SUCCESS,
            payload: data.bookings
        })

    } catch (error) {

        dispatch({
            type: MY_BOOKINGS_FAIL,
            payload: error.response.data.message
        })
    }

}


export const adminBookings = () => async (dispatch) => {
    try {
        dispatch({type:ADMIN_BOOKING_REQUEST})

        const { data } = await axios.get(`/api/admin/appointments/`)

        dispatch({
            type:ADMIN_BOOKING_SUCCESS,
            payload: data.bookings
        })

    } catch (error) {

        dispatch({
            type:ADMIN_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }

}
export const notifierBookings = () => async (dispatch) => {
    try {
        dispatch({type:NOTIFIER_BOOKING_REQUEST})
        const { data } = await axios.get(`/api/notifier/appointments/`)
        
        dispatch({
            type:NOTIFIER_BOOKING_SUCCESS,
            payload: data.bookings
        })

    } catch (error) {

        dispatch({
            type:NOTIFIER_BOOKING_FAIL,
            payload: error?.response?.data?.message
        })
    }

}


export const bookedDates = (roomId) => async(dispatch) => {
    try {
      
       let link = `/api/bookings/check_booked_dates?roomid=${roomId}`
       

       const {data} = await axios.get(link);
       
       
       dispatch({
        type:BOOKED_DATES_SUCCESS,
        payload: data.bookedDates
       })


    } catch (error) {
        dispatch({
            type:BOOKED_DATES_FAIL,
            payload:error.response.data.message
        })
    }

}




export const checkBooking = (notifierId,currentDate) => async(dispatch) => {
    try {
       dispatch({
           type:CHECK_BOOKING_REQUEST
       })

     

       let link = `/api/appointments/check?notifierId=${notifierId}&currentDate=${currentDate}`

       const {data} = await axios.get(link);
       
       dispatch({
        type:CHECK_BOOKING_SUCCESS,
        payload: data.isAvailable
       })


    } catch (error) {
        
        dispatch({
            type:CHECK_BOOKING_FAIL,
            payload:error.response.data.message
        })
    }

}




export const clearErrors = () => (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}
import axios from "axios";
import absoluteUrl from "next-absolute-url";

import {
    NOTIFIER_SUCCESS,
    NOTIFIER_FAIL,
    NOTIFIER_DETAILS_SUCCESS,
    NOTIFIER_DETAILS_FAIL,
    CLEAR_ERRORS,


    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,

    CAN_REVIEW_REQUEST,
    CAN_REVIEW_SUCCESS,
    CAN_REVIEW_FAIL,


    ADMIN_ROOMS_REQUEST,
    ADMIN_ROOMS_SUCCESS,
    ADMIN_ROOMS_FAIL,


    NEW_NOTIFIER_REQUEST,
    NEW_NOTIFIER_SUCCESS,
    NEW_NOTIFIER_FAIL,

    UPDATE_NOTIFIER_REQUEST,
   UPDATE_NOTIFIER_SUCCESS,
   UPDATE_NOTIFIER_FAIL,
   UPDATE_NOTIFIER_RESET,


   DELETE_NOTIFIER_REQUEST,
   DELETE_NOTIFIER_SUCCESS,
   DELETE_NOTIFIER_FAIL,
   GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS

    
}
from '../constants/notifierConstants'


export const getNotifiers = (req,currentPage=1,location='',document) => async(dispatch) => {
  try {
      const {origin} = absoluteUrl(req)
      console.log(origin,'the original page')
      let link = `${origin}/api/notifier?page=${currentPage}&location=${location}`
      if(document) link = link.concat(`&document=${document}`)
      
      const {data} = await axios.get(link);
      dispatch({
          type: NOTIFIER_SUCCESS,
          payload: data
      })
  } catch (error) {
      dispatch({
          type:NOTIFIER_FAIL,
          payload:error.response.data.message
      })
  }
}



export const getRoomDetails = (req,id) => async(dispatch) => {
    
  try {
    
      const {origin} = absoluteUrl(req)
      const {data} = await axios.get(`${origin}/api/notifier/${id}`)
      
      dispatch({
          type: NOTIFIER_DETAILS_SUCCESS,
          payload: data.room
      })
  } catch (error) {
      
      console.log(error)
      dispatch({
          type:NOTIFIER_DETAILS_FAIL,
          payload:error.response.data.message
      })
  }
}


export const getAdminRooms = (req,id) => async(dispatch) => {
  try {
      dispatch({
         type: ADMIN_ROOMS_REQUEST
      })
      const {origin} = absoluteUrl(req)
      const {data} = await axios.get(`${origin}/api/admin/rooms`)
      
      dispatch({
          type: ADMIN_ROOMS_SUCCESS,
          payload: data.rooms
      })
  } catch (error) {
      dispatch({
          type:ADMIN_ROOMS_FAIL,
          payload:error.response.data.message
      })
  }
}



export const newRoomReviews = (reviewData) => async(dispatch) => {
  try {
   dispatch({type:NEW_REVIEW_REQUEST})
    const config = {
        headers:{
            'Content-Type':"Application/json"
        }
    }
      
      const {data} = await axios.put(`/api/reviews/`,reviewData,config)
      console.log(data)
      dispatch({
          type: NEW_REVIEW_SUCCESS,
          payload: data.success
      })
  } catch (error) {
      
      dispatch({
          type:NEW_REVIEW_FAIL,
          payload:error.response.data.message
      })
  }
}


export const newRoom = (roomData) => async(dispatch) => {
  try {
   dispatch({type:NEW_NOTIFIER_REQUEST})
    const config = {
        headers:{
            'Content-Type':"Application/json"
        }
    }
      
      const {data} = await axios.post(`/api/rooms/`,roomData,config)
      
      dispatch({
          type: NEW_NOTIFIER_SUCCESS,
          payload: data
      })
  } catch (error) {
      console.log(error)
      dispatch({
          type:NEW_NOTIFIER_FAIL,
          payload:error.response.data.message
      })
  }
}


export const updateRoom = (id,roomData) => async(dispatch) => {
  try {
   dispatch({type:UPDATE_NOTIFIER_REQUEST})
    const config = {
        headers:{
            'Content-Type':"Application/json"
        }
    }
      
      const {data} = await axios.put(`/api/notifier/${id}`,roomData,config)
      console.log(data)
      dispatch({
          type: UPDATE_NOTIFIER_SUCCESS,
          payload: data.success
      })
  } catch (error) {
      console.log(error)
      dispatch({
          type:UPDATE_NOTIFIER_FAIL,
          payload:error.response.data.message
      })
  }
}


export const deleteRoom = (id) => async(dispatch) => {
  try {
   dispatch({type:DELETE_NOTIFIER_REQUEST})
    // const config = {
    //     headers:{
    //         'Content-Type':"Application/json"
    //     }
    // }
      
      const {data} = await axios.delete(`/api/notifier/${id}`)
      console.log(data);
      
      dispatch({
          type: DELETE_NOTIFIER_SUCCESS,
          payload: data.success
      })
  } catch (error) {
      
      dispatch({
          type:DELETE_NOTIFIER_FAIL,
          payload:error.response.data.message
      })
  }
}


export const deleteReview = (id,roomId) => async(dispatch) => {
  try {
   dispatch({type:DELETE_REVIEW_REQUEST})
    // const config = {
    //     headers:{
    //         'Content-Type':"Application/json"
    //     }
    // }
      
      const {data} = await axios.delete(`/api/reviews/?id=${id}&roomid=${roomId}`)
      console.log(data);
      
      dispatch({
          type: DELETE_REVIEW_SUCCESS,
          payload: data.success
      })
  } catch (error) {
      console.log(error);
      dispatch({
          type:DELETE_REVIEW_FAIL,
          payload:error.response.data.message
      })
  }
}


export const canReview = (roomId) => async(dispatch) => {
  try {
   dispatch({type:CAN_REVIEW_REQUEST})

      
      const {data} = await axios.get(`/api/reviews/if_review?roomid=${roomId}`)
      console.log("The data in booked",data)
      
      dispatch({
          type: CAN_REVIEW_SUCCESS,
          payload: data.booked
      })
  } catch (error) {
      
      dispatch({
          type:CAN_REVIEW_FAIL,
          payload:error.response.data.message
      })
  }
}

export const getReviews = (roomId) => async(dispatch) => {
  try {
   dispatch({type:GET_REVIEWS_REQUEST})

      
      const {data} = await axios.get(`/api/reviews/?id=${roomId}`)
      
      dispatch({
          type: GET_REVIEWS_SUCCESS,
          payload: data.reviews
      })
  } catch (error) {
      
      dispatch({
          type:GET_REVIEWS_FAIL,
          payload:error.response.data.message
      })
  }
}




export const clearErrors = () => (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}
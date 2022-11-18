import axios from "axios";

import {
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_REQUEST, 

    CLEAR_ERRORS,
    USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGIN_FAIL,

   UPDATE_PROFILE_REQUEST,
   UPDATE_PROFILE_SUCCESS,
   UPDATE_PROFILE_FAIL,

   FORGOT_PASSWORD_REQUEST,
   FORGOT_PASSWORD_SUCCESS,
   FORGOT_PASSWORD_FAIL,
   ALL_USER_FAIL,
   ALL_USER_REQUEST,
   ALL_USER_SUCCESS,


   DELETE_USER_FAIL,
   DELETE_USER_SUCCESS,
   DELETE_USER_REQUEST,


   
   UPDATE_USER_REQUEST,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_FAIL,
   
   
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_DETAILS_FAIL,
   

 }
 from '../constants/userConstants'

 
export const userRegister = (userData) => async(dispatch) => {
    try {
       dispatch({
           type:USER_REGISTER_REQUEST
       })

       const config = {
        headers: {
            'Content-Type': 'application/json', 
        },
       }
       
       const {data} = await axios.post('/api/auth/register',userData,config)
       console.log(data)
            
       dispatch({
        type:USER_REGISTER_SUCCESS
       }) 


    } catch (error) {        
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response.data.message
        })
    }

}
 
export const userLogin = () => async(dispatch) => {
    try {
       dispatch({
           type:USER_LOGIN_REQUEST
       })



       const {data} = await axios.get('/api/me')
       
       
       dispatch({
        type:USER_LOGIN_SUCCESS,
        payload: data.user
       })


    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response.data.message
        })
    }

}
export const allUser = () => async(dispatch) => {
    try {
       dispatch({
           type:ALL_USER_REQUEST
       })



       const {data} = await axios.get('/api/admin/users')
       
       console.log(data.user)
       
       dispatch({
        type:ALL_USER_SUCCESS,
        payload: data.user
       })


    } catch (error) {
        console.log(error)
        dispatch({
            type:ALL_USER_FAIL,
            payload:error.response.data.message
        })
    }

}


export const userDetails = (id) => async(dispatch) => {
    try {
       dispatch({
           type:USER_DETAILS_REQUEST
       })



       const {data} = await axios.get(`/api/admin/users/${id}`)
       
       console.log("The actions are working")
       
       dispatch({
        type:USER_DETAILS_SUCCESS,
        payload: data.user
       })


    } catch (error) {
        console.log(error)
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }

}



export const resetPassword =(token,passwords)=> async(dispatch) => {
    try {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        })

        const config = {
            headers:{
                'Content-Type':"Application/json"
            }
        }
 
        const {data} = await axios.put(`/api/password/reset/${token}`,passwords,config)
        
        dispatch({
         type:RESET_PASSWORD_SUCCESS,
         payload: data.success
        })

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload:error.response.data.message
        })
    }
}

export const updateUser =(id,userData)=> async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST,
        })

        const config = {
            headers:{
                'Content-Type':"Application/json"
            }
        }
 
        const {data} = await axios.put(`/api/admin/users/${id}`,userData,config)
        
        
        dispatch({
         type:UPDATE_USER_SUCCESS,
         payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload:error.response.data.message
        })
    }
}


export const deleteUser =(id)=> async(dispatch) => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST,
        })

        const config = {
            headers:{
                'Content-Type':"Application/json"
            }
        }
 
        const {data} = await axios.delete(`/api/admin/users/${id}`)
        
        
        dispatch({
         type:DELETE_USER_SUCCESS,
         payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload:error.response.data.message
        })
    }
}
export const forgotPassword = email => async(dispatch) => {
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        })

        const config = {
            headers:{
                'Content-Type':"Application/json"
            }
        }
 
        const {data} = await axios.post('/api/password/forgot',email,config)
        console.log("The data here is "+ data);
        
        dispatch({
         type:FORGOT_PASSWORD_SUCCESS,
         payload: data.message
        })

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload:error.response.data.message
        })
    }
}









export const userUpdate = (userData) => async(dispatch) => {
    try {
       dispatch({
           type:UPDATE_PROFILE_REQUEST
       })

       const config = {
           headers:{
               'Content-Type':"Application/json"
           }
       }
       const {data} = await axios.put('/api/me/update',userData,config)
       console.log(data)
       dispatch({
        type:UPDATE_PROFILE_SUCCESS,
        payload:data.success
       })


    } catch (error) {
        console.log(error)
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload:error.response.data.message
        })
    }

}

export const clearErrors = () => (dispatch) =>{
    dispatch({
        type: CLEAR_ERRORS
    })
}
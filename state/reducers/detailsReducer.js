import {
    NOTIFIER_DETAILS_SUCCESS,
    NOTIFIER_DETAILS_FAIL,
    CLEAR_ERRORS
    
}
from '../constants/notifierConstants'


export const notifierDetailsReducer = (state={notifier:{} },action)=>{
    switch(action.type){
        case NOTIFIER_DETAILS_SUCCESS:
            return {
               notifier:action.payload.notifier
            }
            
        case NOTIFIER_DETAILS_FAIL:
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
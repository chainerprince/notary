import {
    NOTIFIER_DETAILS_SUCCESS,
    NOTIFIER_DETAILS_FAIL,
    CLEAR_ERRORS
    
}
from '../constants/notifierConstants'
515038

export const roomDetailsReducer = (state={room:{} },action)=>{
    switch(action.type){
        case NOTIFIER_DETAILS_SUCCESS:
            return {
               room:action.payload
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
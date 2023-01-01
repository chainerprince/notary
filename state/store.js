import { createStore, applyMiddleware } from "redux";
import { createWrapper,HYDRATE } from "next-redux-wrapper";
import thunkMiddleware  from "redux-thunk";
import reducers from "./reducers/reducers";

const bindMiddleware = (middleware) => {
   return applyMiddleware(...middleware);
}

const reducer = (state,action) => {
    if(action.type === HYDRATE){
        const nextState = {
            ...state,
            ...action.payload
        }
        return nextState;
    }
    else{
        return reducers(state,action);  
    }
}


const initState = ()=>{
   return createStore(reducer,bindMiddleware([ thunkMiddleware ]))
}


export const wrapper = createWrapper(initState);
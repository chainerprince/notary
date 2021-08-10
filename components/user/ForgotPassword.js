import React,{useState,useEffect} from 'react'

import { useRouter } from 'next/dist/client/router'
import {toast} from 'react-toastify'
import Loader from '../layout/Loader'

import { useDispatch,useSelector } from 'react-redux'

import { clearErrors, forgotPassword } from '../../state/actions/userActions'


const ForgotPassword = () => {
    const [email,setEmail] = useState('');
    const dispatch = useDispatch();
    const {error,loading,message} = useSelector(state=>state.forgotPassword);
    useEffect(() => {
        console.log(error)
        console.log(message)
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(message){
            toast.success(message)
        }
             
    }, [dispatch,message,error])
   
   
    const handleSubmit = e=>{
        
        e.preventDefault();
   
        const userData = {
            email
        }
        dispatch(forgotPassword(userData));
    }

    return (
        <div class="row wrapper">
        <div class="col-10 col-lg-5">
            <form class="shadow-lg" onSubmit={handleSubmit}>
                <h1 class="mb-3">Forgot Password</h1>
                <div class="form-group">
                    <label htmlFor="email_field">Enter Email</label>
                    <input
                        type="email"
                        id="email_field"
                        class="form-control"
                        value={email}
                        onChange = {e=>setEmail(e.target.value)}
                    />
                </div>

                <button
                    id="forgot_password_button"
                    type="submit"
                    class="btn btn-block py-3"
                    disabled = {loading ? true : false}
                    >
                      
                   {loading ? <Loader /> : "SEND EMAIL"}
                </button>

            </form>
        </div>
    </div>

    )
}

export default ForgotPassword

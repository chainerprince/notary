import React,{useState,useEffect} from 'react'

import { useRouter } from 'next/dist/client/router'
import {toast} from 'react-toastify'
import Loader from '../layout/Loader'

import { useDispatch,useSelector } from 'react-redux'

import { clearErrors, forgotPassword, resetPassword } from '../../state/actions/userActions'


const NewPassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [password,setPassword] = useState('');
    const [confirm,setConfirm] = useState('');
    const {error,loading,success} = useSelector(state=>state.resetPassword);
    useEffect(() => {


        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        if(success){
            router.push('/login')

        }
             
    }, [dispatch, success, error, router])
   
   
    const handleSubmit = e=>{
        
        e.preventDefault();
   
        const userData = {
             password,confirmPassword:confirm
        }
        dispatch(resetPassword(router.query.token,userData));
    }
    return (
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
                <h1 className="mb-3">New Password</h1>

                <div className="form-group">
                    <label htmlFor="password_field">Password</label>
                    <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        value={password}
                        onChange = {e=>setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm_password_field">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password_field"
                        className="form-control"
                        value={confirm}
                        onChange = {e=>setConfirm(e.target.value)}
                    />
                </div>

                <button
                    id="new_password_button"
                    type="submit"
                    className="btn btn-block py-3" 
                     disabled={loading ? true: false}
                    >
                    {loading? <Loader/> : "RESET PASSWORD "}
                </button>

            </form>
        </div>
    </div>

    )
}

export default NewPassword

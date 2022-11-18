import React,{useState,useEffect} from 'react'

import { useRouter } from 'next/dist/client/router'
import {toast} from 'react-toastify'
import Loader from '../layout/Loader'
import { useDispatch,useSelector } from 'react-redux'

import { userRegister,clearErrors } from '../../state/actions/userActions'


const Register = () => {
 const dispatch = useDispatch()
 const router = useRouter();

 const [user, setuser] = useState({
     name:'',
     email:'',
     password:''
 })



 const {name,email,password } = user;

 const [avatar, setavatar] = useState('')
 const [avatarPreview, setavatarPreview] = useState('/vercel.svg')

 const {success,error,loading } = useSelector(state=>state.auth);

 useEffect(() => {
     if(success){
         setTimeout(_=>{
            toast.success("Registered successfully login to continue")
         },2000)
         router.push('/login');
         dispatch(clearErrors());
     }else{
        console.log(error,'on the homepage')
         toast.error(error);
         dispatch(clearErrors());
     }

 }, [dispatch,success,loading,error,router])


 const handleSubmit = e=>{
     
     e.preventDefault();

     const userData = {
         name,email,password,avatar
     }
     if(avatar?.length  < 1){
        toast.error('The avatar is required')
        return;
     }
     dispatch(userRegister(userData));
    
 }
  const onChange = e => {

    
      if(e.target.name === 'avatar'){
           const reader = new FileReader();
           reader.onload = ()=>{
               if(reader.readyState === 2){
                //    console.log(reader.result)
                   setavatar(reader.result);
                   setavatarPreview(reader.result);
               }
           }
           reader.readAsDataURL(e.target.files[0])
      }else{
          
          setuser({...user,[e.target.name]:e.target.value});
          
      }
  }

    return (
        
                <div className="container container-fluid">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handleSubmit}  method="POST"> 
            <h1 className="mb-3">Join Us</h1>

            <div className="form-group">
                <label htmlFor="name_field">Full Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  
                  onChange={onChange}
                />
              </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                  name="email"
                  value={email}
                  
                  onChange={onChange}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
                <label htmlFor='avatar_upload'>Avatar</label>
                <div className='d-flex align-items-center'>
                    <div>
                        <figure className='avatar mr-3 item-rtl'>
                            <img
                                src={avatarPreview}
                                className='rounded-circle'
                                alt='image'
                            />
                        </figure>
                    </div>
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='avatar'
                            className='custom-file-input'
                            id='customFile'
                            accept="images/*"
                            onChange={onChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Avatar
                        </label>
                    </div>
                </div>
            </div>

  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ?true : false}
              >
               {loading ? <Loader /> : "REGISTER"}
              </button>
          </form>
		  </div>
    </div>
</div>
        
    )
}

export default Register

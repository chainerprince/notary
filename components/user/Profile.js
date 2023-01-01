import React,{useState,useEffect} from 'react'

import { useRouter } from 'next/dist/client/router'
import {toast} from 'react-toastify'
import Loader from '../layout/Loader'
import Loading from '../layout/Loading'
import { useDispatch,useSelector } from 'react-redux'

import { clearErrors, userUpdate } from '../../state/actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../state/constants/userConstants'
import { getNotifierDetails } from '../../state/actions/notifierAction'


const Profile = () => {
 const dispatch = useDispatch()
 const router = useRouter();
 const updatePage = router.asPath.includes('update');

 const [userData, setuser] = useState({
     name:'',
     email:'',
     password:''
 })



 const {name,email,password } = userData;
 

 const [avatar, setavatar] = useState('')
 const [avatarPreview, setavatarPreview] = useState('/vercel.svg')

 const {user,loading } = useSelector(state=>state.login);
 const [status,setStatus] = useState('');
 const {error,isUpdated,loading:updateLoading } = useSelector(state=>state.user);
 const { notifier, loading: detailsLoading, error: detailsError } = useSelector((state) => state.notifierDetails);
 useEffect(() => {
    if(user && user?.role == 'notifier'){
        dispatch(getNotifierDetails("", user?._id));
    }
 }, [dispatch,user])
  useEffect(() => {
        if(notifier){
            setStatus(notifier.status)
        }
  },[notifier])
 
 useEffect(() => {
     if(user){
         
       setuser({
           name:user.name,
           email:user.email
       })
       console.log(user.avatar);
       setavatarPreview(user.avatar.url)
     }else{
         toast.error(error);
         dispatch(clearErrors());
     }
     if(isUpdated){
         router.push('/')
         dispatch({type:UPDATE_PROFILE_RESET})
     }

 }, [dispatch,isUpdated,error,user])


 const handleSubmit = e=>{
     
     e.preventDefault();

     const userData = {
         name,email,password,avatar
     }
     dispatch(userUpdate(userData));
 }
  const onChange = e => {
      if(e.target.name === 'avatar'){
           const reader = new FileReader();
           reader.onload = ()=>{
               if(reader.readyState === 2){
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
        <>
        {loading ? <Loading/> : 
        
        
                <div className="container container-fluid">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">                
                {updatePage ? 'My Profile' : 'Join Us'}
                </h1>
                
                  <h3>
                   {status && `Status: ${status}` }
                  </h3>
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
               {loading ? <Loader /> : "UPDATE"}
              </button>
          </form>
		  </div>
    </div>
</div>
        }
        </>
        
    )
}

export default Profile

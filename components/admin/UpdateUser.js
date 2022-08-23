
import React,{useEffect,useState} from 'react'
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import Loader from '../layout/Loader';
import { updateUser, userDetails } from '../../state/actions/userActions';
import { UPDATE_USER_RESET } from '../../state/constants/userConstants';


const UpdateUser = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [role,setRole] = useState('')
    // const router = useRouter();
    const {isUpdated,error} = useSelector(state=>state.user)
    const {user,loading,error:userError} = useSelector(state=>state.userDetails)
    
    const userId = router.query.id;
    // console.log(userError)
        
    

    useEffect(() => {
        if(user && user._id !== userId){
            dispatch(userDetails(userId))
        }
        else{
          
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }
        
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
        // if(deleteError){
        //     toast.error(deleteError)
        //     dispatch(clearErrors())
        // }

        if(isUpdated){
          console.log("reached here");
            router.push('/admin/users');
            dispatch({type:UPDATE_USER_RESET})
        }

    }, [dispatch,user,isUpdated,error])

    


  const handleSubmit = (e) => {
    
      e.preventDefault();
      const userData = {
          name,email,role
      }
   dispatch(updateUser(user._id,userData))
  }
  
    return (
        <div className="container container-fluid">
            {loading ? <Loader /> : 
            <>
 <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mt-2 mb-5">Update User</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={e=>setName(e.target.value)}
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
                onChange={e=>setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="role_field">Role</label>

              <select 
              id="role_field" 
              className="form-control" 
              name="role" 
              value={role}
              onChange={e=>setRole(e.target.value)}
              
              >
                <option value="user">user</option>
                <option value="notifier">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>

            </>            
            }
    </div>
    )
}

export default UpdateUser

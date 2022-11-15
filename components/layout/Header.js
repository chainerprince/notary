/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { userLogin } from '../../state/actions/userActions';
import {signOut} from 'next-auth/client'
import { useRouter } from 'next/router';


function Header() {
  const dispatch = useDispatch();
  const {user,loading} = useSelector(state=>state.login);
  const [canAppy,setCanAppy] = useState(false);
  const logoutHandler = () =>{
    signOut(); 
  }  
  const router = useRouter();
  useEffect(() => {
    dispatch(userLogin())
     
  }, [dispatch])
  const redirectHome = () => {
    router.push('/')
    // typeof window !== 'undefined' && window.location.reload();
  }
  
    return (
        <nav className="navbar row justify-content-center   sticky-top">
      <div className="container-fluid">
      <div className="col-3 p-0">
        <div className="navbar-brand">
            {/* <img src="./images/bookit_logo.png" alt="BookIT" /> */}
            
            <h2 onClick={()=>redirectHome()} style={{cursor:'pointer'}}>Notary</h2>            
           
        </div>
      </div>

      <div className="col-4 mt-3 mt-md-0 text-center">
        {user ? (
          <div className="ml-4 dropdown show d-flex justify-content-center align-items-center">
              <a 
              className="btn dropdown-toggle mr-4" 
              id="dropdownMenuButton"
              data-target="#menu" 
              data-toggle="dropdown" 
              aria-haspopup="true">
                     <figure className="avatar avatar-nav">
                       <img
                       src={user.avatar && user.avatar.url} 
                       alt={user && user.name} 
                       className="rounded-circle"
                       
                       />
                     </figure>
                        <span>{user && user.name}</span>
              </a>
              <div className="dropdown-menu " id="menu">
                {
                  user.role == 'admin' && (
                    <>
                    <Link href="/admin/notifiers">
                      <a  className="dropdown-item">Notifiers</a>            
                  </Link>
                    {/* <Link href="/admin/appointments">
                      <a  className="dropdown-item">Appointments</a>            
                  </Link> */}


                    <Link href="/admin/users">
                      <a  className="dropdown-item">Users</a>            
                  </Link>
                    {/* <Link href="/admin/reviews">
                      <a  className="dropdown-item">Reviews</a>            
                  </Link> */}

                  <hr/>
                    </>
                  )}
                  {
                  user.role == 'notifier' && (
                    <>                                 
                    <Link href="/notifier/appointments">
                      <a  className="dropdown-item">Appointments</a>            
                  </Link>                   
                    <Link href="/notifier/reviews">
                      <a  className="dropdown-item">Reviews</a>            
                  </Link>

                  <hr/>
                    </>
                  )
                }
                 {(user.role !== 'admin') && (user.role !== 'notifier') ? ( <Link href="/appointments/me">
                      <a  className="dropdown-item">My Appointments</a>
                  </Link>) : null
                  }
                  <Link href="/me/update">
                      <a  className="dropdown-item">My Profile</a>
                  </Link>
                  <Link href="/">
                      <a onClick={logoutHandler}  className="dropdown-item text-danger">Logout</a>
                  </Link>
              </div>
               {
                user.role == 'user' && (
<Link href="/application">
         <a className="btn bg-choco px-2 text-white  mx-2 float-right">Apply as notifier</a>
        </Link>
                )
         
       }
          </div>
        ):
      !loading &&  (
        <>
        <Link href="/login">
         <a className="btn bg-choco px-4 text-white login-header-btn float-right">Login</a>
        </Link>      
        </>
        
        )

      }
        
      </div>
    </div>
    </nav>

    )
}

export default Header

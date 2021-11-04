import Link from 'next/link'
import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { userLogin } from '../../state/actions/userActions';
import {signOut} from 'next-auth/client'


function Header() {
  const dispatch = useDispatch();
  const {user,loading} = useSelector(state=>state.login);
  

  const logoutHandler = () =>{
    signOut(); 
  }
  
  useEffect(() => {
    dispatch(userLogin())
    
  }, [dispatch])
  
    return (
        <nav className="navbar row justify-content-center   sticky-top">
      <div className="container-fluid">
      <div className="col-3 p-0">
        <div className="navbar-brand">
            {/* <img src="./images/bookit_logo.png" alt="BookIT" /> */}
            <Link href="/">
            <h2 style={{cursor:'pointer'}}>Book It</h2>
            </Link>
           
        </div>
      </div>

      <div className="col-3 mt-3 mt-md-0 text-center">
        {user ? (
          <div className="ml-4 dropdown show d-inline">
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
                    <Link href="/admin/rooms">
                      <a  className="dropdown-item">Rooms</a>            
                  </Link>

                 

                    <Link href="/admin/bookings">
                      <a  className="dropdown-item">Bookings</a>            
                  </Link>


                    <Link href="/admin/users">
                      <a  className="dropdown-item">Users</a>            
                  </Link>

                    <Link href="/admin/reviews">
                      <a  className="dropdown-item">Reviews</a>            
                  </Link>

                  <hr/>
                    </>
                  )
                }
                  <Link href="/bookings/me">
                      <a  className="dropdown-item">My Bookings</a>
                  </Link>
                  <Link href="/me/update">
                      <a  className="dropdown-item">My Profile</a>
                  </Link>
                  <Link href="/">
                      <a onClick={logoutHandler}  className="dropdown-item text-danger">Logout</a>
                  </Link>
              </div>
          </div>
        ):
      !loading &&  (
          <Link href="/login">
         <a className="btn bg-choco px-4 text-white login-header-btn float-right">Login</a>
        </Link>
        )

      }
        
      </div>
    </div>
    </nav>

    )
}

export default Header

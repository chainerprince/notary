import React,{useState} from 'react'
import {signIn} from 'next-auth/client'
import Link from 'next/link'
import {toast} from 'react-toastify'
import Loader from '../layout/Loader'
import Loading from '../layout/Loading'

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setloading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true)
        const result = await signIn('credentials',{
            redirect:false,
            email,
            password
        })
        setloading(false);
        if(result.error){
            toast.error(result.error)
        }else{           
            window.location.href = '/'
        }
    }
    return (
      <>
      {loading ? <Loading /> : (
        <div className="container container-fluid">
        <div className="row wrapper"> 
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
            </div>
              <Link href="/password/forgot">

            <a  className="float-right mb-4">Forgot Password?</a>
              </Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ?true : false}
            >
             {loading ? <Loader /> : "LOGIN"}
            </button>

            <Link href="/register" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div>
    </div>
    
    )
      }
      </>
    )
}

export default Login

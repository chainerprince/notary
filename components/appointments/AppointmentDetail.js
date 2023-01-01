import { MDBDataTable } from 'mdbreact';
import React,{useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors } from '../../state/actions/appointmentAction';
import { useRouter } from 'next/router';

const AppointmentDetails = () => {
     const dispatch = useDispatch();
     const {booking,error} = useSelector(state=>state.bookingDetails)
     const {user,error:userError} = useSelector(state=>state.login)
        
     
     useEffect(() => {
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
        if(userError){
            toast.error(userError)
            dispatch(clearErrors())
        }

    }, [dispatch])
    
    
  const isPaid = booking && booking.paymentInfo && booking.paymentInfo.status  === 'paid' ? true : false;
  const router = useRouter();
  const finalSlashIndex = router.asPath.lastIndexOf('/')
const previousPath = router.asPath.slice(0, finalSlashIndex)
    return (
        <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 booking-details">
           {booking && booking.user && booking.notifier &&
           <>
           <div className="container">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 booking-details">
           <Link  href={previousPath}> 
                      <a  className='ml-2 back-to-search'>
                      <i className='fa fa-arrow-left'></i> Back
                      </a> 
            </Link>
          <h2 className="my-5">Appointment # {booking._id}</h2>
          <h4 className="mb-4">User Info</h4>
          <p><b>Name:</b> {booking.user && booking.user.name}</p>
          <p><b>Email:</b> {booking.user && booking.user.email}</p>
          <p><b>Amount:</b> {booking.price}</p>

          <hr />          
          <h4 className="mb-4">Appointment Info</h4>
         
          {/* <p><b>Check In:</b> {new Date(booking.date).toLocaleString('en-UK')}</p>                  */}

          <hr />

          <h4 className="my-4">Payment Status</h4>
          <p className={isPaid ? "text-success" : 'text-danger'}><b>{isPaid? "Paid": "Not Paid"}</b></p>

          {/* {
            user && user.role === 'admin' && 
            <>
              <h4 className= "my-4">Stripe Payment Id</h4>
              <p className="text-danger">{booking.paymentInfo.id}</p>
            </>
          } */}

          <h4 className="mt-5 mb-4">Booked Appointment:</h4>

          <hr />
          <div className="cart-item my-1">
            <div className="row my-5">
              <div className="col-4 col-lg-2">
                <Image
                 src={ booking.notifier?.images[0]?.url}
                 alt={ booking.notifier?.name} 
                 height={45}
                 width={65}
                 />
              </div>

              

              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                <p>${ booking.price}</p>
              </div>

              <div className="col-4 col-lg-3 mt-4  mt-lg-0">
                <p>{booking.document}</p>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
           </>
           
           }
          </div>
        </div>
      </div>
    )
}

export default AppointmentDetails

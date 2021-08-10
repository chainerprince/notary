import { MDBDataTable } from 'mdbreact';
import React,{useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors } from '../../state/actions/bookingAction';

const BookingDetails = () => {
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
    return (
        <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8 mt-5 booking-details">
           {booking && booking.user && booking.room &&
           <>
           <div class="container">
      <div class="row d-flex justify-content-between">
        <div class="col-12 col-lg-8 mt-5 booking-details">
          <h2 class="my-5">Booking # {booking._id}</h2>

          <h4 class="mb-4">User Info</h4>
          <p><b>Name:</b> {booking.user && booking.user.name}</p>
          <p><b>Email:</b> {booking.user && booking.user.email}</p>
          <p><b>Amount:</b> {booking.amountPaid}</p>

          <hr />

          <h4 class="mb-4">Booking Info</h4>
          <p><b>Check In:</b> {new Date(booking.checkInDate).toLocaleString('en-UK')}</p>
          <p><b>Check Out:</b>{new Date(booking.checkOutDate).toLocaleString('en-US')}</p>
          <p><b>Days of Stay: {booking.daysOfStay}</b> </p>

          <hr />

          <h4 class="my-4">Payment Status</h4>
          <p class={isPaid ? "text-success" : 'text-danger'}><b>{isPaid? "Paid": "Not Paid"}</b></p>

          {
            user && user.role === 'admin' && 
            <>
              <h4 className= "my-4">Stripe Payment Id</h4>
              <p className="text-danger">{booking.paymentInfo.id}</p>
            </>
          }

          <h4 class="mt-5 mb-4">Booked Room:</h4>

          <hr />
          <div class="cart-item my-1">
            <div class="row my-5">
              <div class="col-4 col-lg-2">
                <Image
                 src={ booking.room.images[0].url}
                 alt={ booking.room.name} 
                 height={45}
                 width={65}
                 />
              </div>

              <div class="col-5 col-lg-5">
                <Link href={`room/${booking.room._id}`}>{ booking.room.name}</Link>
                
              </div>

              <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                <p>${ booking.room.pricePerNight}</p>
              </div>

              <div class="col-4 col-lg-3 mt-4  mt-lg-0">
                <p>{booking.daysOfStay} Day(s)</p>
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

export default BookingDetails

import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors } from '../../state/actions/roomAction';
import Head from 'next/dist/next-server/lib/head';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import {useRouter} from 'next/router'
import RoomFeatures from './RoomFeatures' 
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import { checkBooking , bookedDates} from '../../state/actions/bookingAction';
import { CHECK_BOOKING_RESET } from '../../state/constants/bookingConstants';
// import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import getStripe from '../../utils/stripe'
import NewReview from '../review/NewReview';
import ListReview from '../review/ListReview'
// import RoomItem from './room/RoomItem';

const RoomDetails = () => {
    const [checkInDate,setCheckInDate] = useState();
    const [checkOutDate,setCheckOutDate] = useState();
    const [daysOfStay,setDaysOfStay] = useState();
    const [phoneNumber,setPhoneNumber] = useState();
    
    const {room,error} = useSelector(state=>state.roomDetails)
    const {user} = useSelector(state=>state.login)
    const {available,loading:bookingLoader} = useSelector(state=>state.checkBooking)

    

     console.log(user);
    const [paymentLoading, setPaymentLoading] = useState(false)
    
    const router = useRouter();
    const {id} = router.query;
   const dispatch = useDispatch();
    useEffect(() => {
        dispatch(bookedDates(id))
        if(error){
           toast.error(error)
           dispatch(clearErrors)
        }

        return () =>{
            dispatch({
                type:CHECK_BOOKING_RESET
            })
        }
        
       },[dispatch,id])

       const {dates} = useSelector(state=>state.bookedDates)
    

       const booked = [];
       dates.forEach(dat=>{
           booked.push(new Date(dat))
       })

       const bookRoom = async(id,pricePerNight) =>{
              setPaymentLoading(true);
              const amount = daysOfStay * pricePerNight;
              try{
               const link = `/api/checkout/${id}?checkOutDate=${checkOutDate.toISOString()}&checkInDate=${checkInDate.toISOString()}&daysOfStay=${daysOfStay}`;

            const {data} = await axios.get(link,{params:{amount}})
            console.log(getStripe)
            const stripe = await getStripe()
            // console.log(stripe)
            console.log(data)
            stripe.redirectToCheckout({sessionId:data.id})
            setPaymentLoading(false)
              }catch(error){
                  setPaymentLoading(false)
                  
                  toast.error(error.message)
              }
       }

       
       const bookMtn = async(id,pricePerNight) =>{
        setPaymentLoading(true);
        // const amount = daysOfStay * pricePerNight;
        try{
            const link = `http://localhost:3000/api/checkout/mtn/${id}`;
            const {data} = await axios.post(link,{'amount':amount,'phone':phoneNumber,'enteringDate':checkInDate.toISOString(),'leavingDate':checkOutDate.toISOString(),stayingDays:daysOfStay})
            // console.log(data);
            if(data.status='success') {
                window.location.assign(data.meta.authorization.redirect) 
            }
      setPaymentLoading(false)
        }catch(error){
            setPaymentLoading(false)
            
            toast.error(error.message)
        }
 }

 


       const onchange = (dates) =>{
           const [checkInDate,checkOutDate] = dates;
           setCheckInDate(checkInDate)
           setCheckOutDate(checkOutDate)
           if(checkInDate && checkOutDate){
               const days = Math.floor( (new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1
               
               setDaysOfStay(days);
                 
               dispatch(checkBooking(id,checkInDate.toISOString(),checkOutDate.toISOString()))
           }
       }

    //    const amount = daysOfStay * room.pricePerNight;
      const config = {
        public_key: process.env.FLW_PUBLIC_KEY,
        tx_ref: Date.now(),
        amount: room && daysOfStay * room.pricePerNight*100,
        currency: 'RWF',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email:user && user.email,
          name: user && user.name,
        },
        customizations: {
          title: 'Book it',
          description: 'Pay to book the room',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
    
      const handleFlutterPayment = useFlutterwave(config);

          const newBookingHandler = async(response)=>{
              
           const booking = {
               room: router.query.id,
               checkInDate, 
               checkOutDate,
               daysOfStay,
               paidAt: Date.now(),
               amountPaid: response.amount,
               paymentInfo:{
                   id:response.transaction_id,
                   status:response.status     
               }
           }

           
           try {
               const config = {
                    headers:{
                        'content-Type':'application/json'
                    }
               }
               
               const { data } = await axios.post('/api/bookings',booking,config)
               if(data.success) {
                   toast.success("The room was booked succesfully");
               }
               closePaymentModal()
               
               
           } catch (error) {
               console.log(error)
           }
       }
    
       
    return (
        <>
        <Head>
            <title>{ room && room.name} - BookIt</title>
        </Head>
        {
            room && <div className="container container-fluid">
            <h2 className='mt-5'>{room.name}</h2>
            <p>{room.address}</p>
    
            <div className="ratings mt-auto mb-3">
                <div className="rating-outer">
                  <div className="rating-inner"
                   style={{width:`${room.ratings / 5 * 100}%`}}
                  ></div>
                </div>
                <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
              </div> 
    
              {/* <img src="https://a0.muscache.com/im/pictures/a8f6a489-d236-4d2d-a57b-a95d928970af.jpg?im_w=960" className="d-block w-100 property-details-image m-auto" alt="Hotel" /> */}
    
               <Carousel hover="pause">
                         {
                             room.images && room.images.map(img=>(
                                 <Carousel.Item key={img.public_id}>
                                     <div className="w-full" style={{height:'440px'}}>
                                        <Image 
                                         className="d-block m-auto"
                                         src={img.url}
                                         alt={room.name}
                                         layout="fill"
                                        />
                                     </div>
                                 </Carousel.Item>
                             ))
                         }
               </Carousel>
              <div className="row my-5">
                  <div className="col-12 col-md-6 col-lg-8">
                      <h3>Description</h3>
                      <p>{room.description}</p>
    
    
                  </div>
    
                  <div className="col-12 col-md-6 col-lg-4">
                      <div className="booking-card shadow-lg p-4">
                        <p className='price-per-night'><b>${room.pricePerNight}</b> / night</p> <hr/>
    
                                 <p className="mt-3 mb-3">
                                     Pick Check in & Check Out Date
                                 </p>
    
                                 <DatePicker 
                                  className="w-100"
                                  selected={checkInDate}
                                  onChange = {onchange}
                                  startDate= {checkInDate}
                                  endDate = {checkOutDate}
                                  minDate = {new Date()}
                                  selectsRange
                                  excludeDates = {booked}
                                  inline
                                 />
    
                           {available ?
                           <div className="alert alert-success font-weight-bold  my-3">
                               Room is available. Book it
                            </div>
                            :
                           <div className="alert alert-danger font-weight-bold  my-3">
                               Room not available. Try a different Date
                            </div>
                            
                            }
                            {available && !user && <div className="alert alert-danger font-weight-bold  my-3">First login to book the room</div>}
                            {available && user &&  
                            <>
                            
                            <button 
                            onClick={()=>bookRoom(room._id,room.pricePerNight)} 
                            disabled={paymentLoading || bookingLoader ? true : false}
                            className="btn btn-block py-3 booking-btn bg-danger text-white">
                            Pay - ${daysOfStay*room.pricePerNight}
                            </button>
                            <button  className="btn btn-block py-3 booking-btn bg-warning text-white"
        onClick={() => {
            
          handleFlutterPayment({
            callback: (response)=>{
                newBookingHandler(response)
            },
            onClose: () => {},
          });
        }}
      >
        Use MTN - {daysOfStay*room.pricePerNight*1000} Rwf
      </button>
                            {/* <div class="d-flex align-items-center my-5">
                                <input name="number" required placeholder="Mtn Phone Number" value={phoneNumber} className="py-3 mx-2 flex-1 form-control" onChange={e=>setPhoneNumber(e.target.value)} />
                                <button 
                            onClick={()=>bookMtn(room._id,room.pricePerNight)} 
                            disabled={paymentLoading || bookingLoader ? true : false}
                            className="btn btn-block btn-sm py-2 w-25  bg-warning border-0 text-white">
                                ${daysOfStay*room.pricePerNight}
                            </button>
                            </div>
                             */}
                            </>                    
                        
                        }
    
    
                      </div>
                  </div>
              </div>
           <RoomFeatures room={room} />
    

           <NewReview />
    
            {room.reviews && room.reviews.length > 0 ? <ListReview reviews = {room.reviews} /> : 
             <div>No Reviews available for this room</div>
            } 
        </div>
    
        }
         
        </>
       


    )
}

export default RoomDetails

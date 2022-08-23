import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors } from '../../state/actions/notifierAction';
import Head from 'next/head';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import {useRouter} from 'next/router'
import NotifierDocs from './NotifierDocs' 
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import { checkBooking , bookedDates} from '../../state/actions/appointmentAction';
import { CHECK_BOOKING_RESET } from '../../state/constants/appointmentConstants';
// import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import getStripe from '../../utils/stripe'
import NewReview from '../review/NewReview';
import ListReview from '../review/ListReview'
import Link from 'next/link';
import Loader from '../layout/Loader';
import BasicDateTimePicker from './DatePicker';
import { MenuItem, TextField } from '@mui/material';


const NotifierDetails = () => {
    const [checkInDate,setCheckInDate] = useState();
    const [checkOutDate,setCheckOutDate] = useState();
    const [daysOfStay,setDaysOfStay] = useState();
    const [phoneNumber,setPhoneNumber] = useState();
    
    const {notifier,error} = useSelector(state=>state.notifierDetails)
    const {user} = useSelector(state=>state.login)
    const {available,loading:bookingLoader} = useSelector(state=>state.checkBooking)
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
    

     console.log(user);
    const [paymentLoading, setPaymentLoading] = useState(false)
    const documents = [
  {
    value: 'landServices 2000',
    label: 'Land Services',    
  },
  {
    value: 'migrationServices 1500',
    label: 'Migration Services',
  },
  {
    value: 'schoolReports 2000',
    label: 'School Reports',
  },
  {
    value: 'others 1500',
    label: 'Others',
  },
];
const [document, setDocument] = useState('landServices 2000');

  const handleChange = (event) => {
    
    setDocument(event.target.value);
    setPrice(document.split(' ')[1])
  };
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
       dates?.forEach(dat=>{
           booked.push(new Date(dat))
       })

    //    const bookAppointment = async(id,pricePerDocument) =>{
    //           setPaymentLoading(true);
    //           const amount = daysOfStay * pricePerDocument;
    //           try{
    //            const link = `/api/checkout/${id}?checkOutDate=${checkOutDate.toISOString()}&checkInDate=${checkInDate.toISOString()}&daysOfStay=${daysOfStay}`;

    //         const {data} = await axios.get(link,{params:{amount}})
    //         console.log(getStripe)
    //         const stripe = await getStripe()
    //         // console.log(stripe)
    //         console.log(data)
    //         stripe.redirectToCheckout({sessionId:data.id})
    //         setPaymentLoading(false)
    //           }catch(error){
    //               setPaymentLoading(false)
                  
    //               toast.error(error.message)
    //           }
    //    }

       
     
     const [dateValue,setDateValue] = useState(new Date())
     const [price,setPrice] = useState('')             



    //    const onchange = (dates) =>{
    //        const [checkInDate,checkOutDate] = dates;
    //        setCheckInDate(checkInDate)
    //        setCheckOutDate(checkOutDate)
    //        if(checkInDate && checkOutDate){
    //            const days = Math.floor( (new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1
               
    //            setDaysOfStay(days);
                 
    //            dispatch(checkBooking(id,checkInDate.toISOString(),checkOutDate.toISOString()))
    //        }
    //    }
          const newBookingHandler = async()=>{                        
           const booking = {
               notifier: router.query.id,
               date: dateValue.toDateString(), 
               time:dateValue.toTimeString(),
               price,  
               document: document.split(' ')[0],                                         
           }                    
           try {
               const config = {
                    headers:{
                        'content-Type':'application/json'
                    }
               }               
               const { data } = await axios.post('/api/appointments/new',booking,config)               
               if(data.success) {
                   toast.success("The appointment created succesfully");
               }                                             
           } catch (error) {
               console.log(error)
           }
       }
    
       
   
    
   
       return (
        <>
        <Head>
            <title>{ notifier && notifier.name} - Notary</title>
        </Head>
        {
            notifier && <div className="container container-fluid">
            <h2 className='mt-5'>{notifier.name}</h2>
            <p>{notifier.address?.city}</p>
    
            <div className="ratings mt-auto mb-3">
                <div className="rating-outer">
                  <div className="rating-inner"
                   style={{width:`${notifier.ratings / 5 * 100}%`}}
                  ></div>
                </div>
                <span id="no_of_reviews">({notifier.numOfReviews} Reviews)</span>
              </div> 
    
              {/* <img src="https://a0.muscache.com/im/pictures/a8f6a489-d236-4d2d-a57b-a95d928970af.jpg?im_w=960" className="d-block w-100 property-details-image m-auto" alt="Hotel" /> */}
    
               <Carousel hover="pause">
                         {
                             notifier.images && notifier.images.map(img=>(
                                 <Carousel.Item key={img.public_id}>
                                     <div className="w-full" style={{height:'440px'}}>
                                        <Image 
                                         className="d-block m-auto"
                                         src={img.url}
                                         alt={notifier.name}
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
                      <p>{notifier.description}</p>
    
    
                  </div>
    
                  <div className="col-12 col-md-6 col-lg-4">
                      <div className="booking-card shadow-lg p-4">
                        <p className='price-per-night'><b>{price} RWF</b> / document</p> <hr/>
    
                                 <p className="mt-3 mb-3">
                                     Please fill the following info
                                 </p>
    
                                 
                                 <form  onSubmit={handleSubmit}>
                                    
           
            <div className="form-group">              
              <BasicDateTimePicker value={dateValue} setValue={setDateValue}/>
            </div>
  
            <div className="form-group">
              
<TextField
          id="outlined-select-document"
          select
          fullWidth
          label="Select your document"
          value={document}
          onChange={handleChange}
        //   helperText="Please select your document"
        >
          {documents.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
            </div>                               
          </form>
    
                           {!available ?
                           <div className="alert alert-success font-weight-bold  my-3">
                               Notifier is available. Book Appointment
                            </div>
                            :
                           <div className="alert alert-danger font-weight-bold  my-3">
                               Notifier not available. Try a different Date
                            </div>
                            
                            }
                            {available && !user && <div className="alert alert-danger font-weight-bold  my-3">First login to book the notifier</div>}
                            {!available && user &&  
                            <>
                            
                            <button 
                            onClick={()=>newBookingHandler()} 
                            disabled={paymentLoading || bookingLoader ? true : false}
                            className="btn btn-block py-3 booking-btn bg-danger text-white">
                            Book
                            </button>
                            {/* <button  className="btn btn-block py-3 booking-btn bg-warning text-white"
        onClick={() => {
            
          handleFlutterPayment({
            callback: (response)=>{
                newBookingHandler(response)
            },
            onClose: () => {},
          });
        }}
      >
        Use MTN - {daysOfStay*notifier.pricePerDocument*1000} Rwf
      </button> */}
                            {/* <div class="d-flex align-items-center my-5">
                                <input name="number" required placeholder="Mtn Phone Number" value={phoneNumber} className="py-3 mx-2 flex-1 form-control" onChange={e=>setPhoneNumber(e.target.value)} />
                                <button 
                            onClick={()=>bookMtn(notifier._id,notifier.pricePerDocument)} 
                            disabled={paymentLoading || bookingLoader ? true : false}
                            className="btn btn-block btn-sm py-2 w-25  bg-warning border-0 text-white">
                                ${daysOfStay*notifier.pricePerDocument}
                            </button>
                            </div>
                             */}
                            </>                    
                        
                        }
    
    
                      </div>
                  </div>
              </div>
           <NotifierDocs notifier={notifier} />
    

           <NewReview />
    
            {notifier.reviews && notifier.reviews.length > 0 ? <ListReview reviews = {notifier.reviews} /> : 
             <div>No Reviews available for this notifier</div>
            } 
        </div>
    
        }
         
        </>
       


    )
}

export default NotifierDetails
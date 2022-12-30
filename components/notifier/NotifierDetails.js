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
import moment from 'moment';


const NotifierDetails = () => {   
    
    const {notifier,error} = useSelector(state=>state.notifierDetails)
    const {user} = useSelector(state=>state.login)
    const {available,loading:bookingLoader} = useSelector(state=>state.checkBooking)
    
 const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setloading] = useState(false);
    const dispatch = useDispatch();
 const router = useRouter();
    const {id} = router.query;
    

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
    
     
    const [paymentLoading, setPaymentLoading] = useState(false)    
    const documents = [
  {
    value: 'landServices',
    label: 'Land Services',    
  },
  {
    value: 'migrationServices',
    label: 'Migration Services',
  },
  {
    value: 'schoolReports',
    label: 'School Reports',
  },
  {
    value: 'birthCertificates',
    label: 'Birth Certificates',
  },
  {
    value: 'marriage',
    label: 'Marriage',
  },
];

const prices = {
  landServices: 1000,
  migrationServices: 2000,
  schoolReports: 3000,
  birthCertificates: 4000,
  marriage: 5000,

}
const [document, setDocument] = useState('');
const [price,setPrice] = useState()  

  const handleChange = (event) => {      
    setDocument(event.target.value);        
    setPrice(prices[event.target.value])
  };
    
   
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
        
       },[dispatch,id,error])

       const {dates} = useSelector(state=>state.bookedDates)
    

       const booked = [];
       dates?.forEach(dat=>{
           booked.push(new Date(dat))
       })

    
       
     
     const [dateValue,setDateValue] = useState(new Date())
                



   
          const newBookingHandler = async()=>{                        
           const booking = {
               notifier: router.query.id,
               date: moment(dateValue).format("YYYY-MM-DD HH:mm:ss"),            
               price,  
               document,                                         
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
                    router.push('/appointments/me')
               }                                             
           } catch (error) {
               toast.error(error.response.data.message)
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
              <BasicDateTimePicker value={dateValue} setValue={setDateValue} id={id} />
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
          
          {documents.filter(doc=>notifier[doc.value]).map((option) => (
            <MenuItem key={option.value} value={option.value}>
              
              {option.label}
            </MenuItem>
          ))}
        </TextField>

            </div>                               
          </form>
    
                           {available ?
                           <div className="alert alert-success font-weight-bold  my-3">
                               Notifier is available. Book Appointment
                            </div>
                            :
                           <div className="alert alert-danger font-weight-bold  my-3">
                               Notifier not available. Try a different Date
                            </div>
                            
                            }
                            {available && !user && <div className="alert alert-danger font-weight-bold  my-3">First login to book the notifier</div>}
                            {available && user &&  
                            <>
                            
                            <button 
                            onClick={()=>newBookingHandler()} 
                            disabled={paymentLoading || bookingLoader ? true : false}
                            className="btn btn-block py-3 booking-btn bg-danger text-white">
                            Book
                            </button>                           
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

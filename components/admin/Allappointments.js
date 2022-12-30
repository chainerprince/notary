import { MDBDataTable } from 'mdbreact';
import React,{useEffect} from 'react'
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { adminBookings, clearErrors, deleteBooking } from '../../state/actions/appointmentAction';
import easyinvoice from 'easyinvoice';
import Loader from '../layout/Loader';
import { useRouter } from 'next/router';
import { DELETE_BOOKING_RESET } from '../../state/constants/appointmentConstants';
import axios from 'axios';



 
const AllBookings = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {bookings,error,loading} = useSelector(state=>state.bookings)    
    const {isDeleted,error:deleteError} = useSelector(state=>state.deleteBooking)    
    useEffect(() => {
        dispatch(adminBookings())
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
            toast.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            router.push('/admin/appointments');
            dispatch({type:DELETE_BOOKING_RESET})
        }

    }, [dispatch,isDeleted,deleteError,router,error])
         const approveHandler = async(id)=>{                                                       
           try {
               const config = {
                    headers:{
                        'content-Type':'application/json'
                    }
               }               
               const { data } = await axios.put('/api/appointments/approve',{id},config) 
                            
               if(data.success) {
                   toast.success("The appointment approved succesfully");
               }                                             
           } catch (error) {
               console.log(error)
           }
       }
    const deleteHandler = (id) => {
        dispatch(deleteBooking(id));
    }

    const setAppointments = () => {
        const data = {
            columns :[
                {
                    label: "Appointment Id",
                    field:'id',
                    sort:'asc'
                },
                {
                    label: "Date",
                    field:'date',
                    sort:'asc'
                },
                {
                    label: "Time",
                    field:'time',
                    sort:'asc'
                },
                {
                    label: "Price",
                    field:'price',
                    sort:'asc'
                },
                {
                    label: "User",
                    field:'user',
                    sort:'asc'
                },
                {
                    label: "Document",
                    field:'document',
                    sort:'asc'
                },
                {
                    label: "Approve",
                    field:'status',
                    sort:'asc'
                },
                {
                    label: "Actions",
                    field:'action',
                    sort:'asc'
                },
            ],
            rows:[]
        }

        bookings && bookings.forEach(booking => {
              data.rows.push({
                  id:booking._id,
                  date:new Date(booking.date).toLocaleString('en-UK')?.split(',')[0],
                  time:booking.date?.split(' ')[0],
                  price:`${booking.price} RWF`,
                  user: booking?.user?.name,
                  document: booking.document,
                  status:
                  <div className="d-flex justify-content-center align-items-center ">
                {
                    booking.status !== 'true' ? (<span onClick={()=>approveHandler(booking._id)}>
                      <a  className="btn btn-success">
                          <i className="fa fa-check"></i>
                          
                      </a>
                   </span>
                   
                   )
                   : 'approved'
                }
                   
                   
                  </div>,
                  action:
                  <div className='d-flex justify-content-between flex-nowrap'>
                   <Link href={`/admin/appointments/${booking._id}`}>
                      <a  className="btn btn-primary">
                          <i className="fa fa-eye"></i>
                          
                      </a>
                   </Link>                 
                   <button 
                   className="btn-danger btn mx-2"
                   onClick={_=>deleteHandler(booking._id)}
                   >
                       <i className="fa fa-trash"></i>
                   </button>
                  </div>
              })
        });


        return data;
    }


   


    return (
        <div className="container container-fluid">
            {
                loading ? <Loader /> : 
                <>
                            <h1 className="my-4">{`${bookings && bookings.length} Appointments` }</h1>
            <MDBDataTable
             data={setAppointments()}
             className="px-3"
             bordered
             striped
             hover
            />
                </>
            }


        </div>
    )
}

export default AllBookings

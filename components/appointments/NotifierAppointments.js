import { MDBDataTable } from 'mdbreact';
import React,{useEffect} from 'react'
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { notifierBookings, clearErrors, deleteBooking } from '../../state/actions/appointmentAction';
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
        dispatch(notifierBookings())
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
        if(deleteError){
            toast.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            router.push('/notifier/appointments');
            dispatch({type:DELETE_BOOKING_RESET})
        }

    }, [dispatch,isDeleted,deleteError])
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
                   dispatch(notifierBookings())
               }                                             
           } catch (error) {
               console.log(error)
           }
       }
        const denyHandler = async(id)=>{                                                       
           try {
               const config = {
                    headers:{
                        'content-Type':'application/json'
                    }
               }               
               const { data } = await axios.put('/api/appointments/deny',{id},config) 
                        
               if(data.success) {
                   toast.success("The appointment denied succesfully");
                   dispatch(notifierBookings())
               }                                             
           } catch (error) {
               console.log(error)
           }
       }
    // const deleteHandler = (id) => {
    //     dispatch(deleteBooking(id));
    // }

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
                  time:booking.date?.split(' ')[1],
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
                   <Link href={`/notifier/appointments/${booking._id}`}>
                      <a  className="btn btn-primary">
                          <i className="fa fa-eye"></i>
                          
                      </a>
                   </Link>                 
                   <div className="d-flex justify-content-center align-items-center ">
                {
                    booking.status == 'true' ? (<span onClick={()=>denyHandler(booking._id)}>
                      <a  className="btn btn-success">
                          <i className="fa fa-trash"></i>                          
                      </a>
                   </span>
                   
                   )
                   : 'Denied'
                }
                   
                   
                  </div>
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
                            <h1 className="my-4">{`${bookings?.length ?? 0} Appointments` }</h1>
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

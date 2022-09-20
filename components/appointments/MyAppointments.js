import { MDBDataTable } from 'mdbreact';
import React,{useEffect} from 'react'
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors } from '../../state/actions/appointmentAction';
import easyinvoice from 'easyinvoice';

const MyAppointments = () => {
    const dispatch = useDispatch();
    const {bookings,error} = useSelector(state=>state.bookings)

    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch])

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
                  time:booking.time?.split(' ')[0],
                  price:`${booking.price} RWF`,
                  user: booking?.user?.name,
                  document: booking.document,
                  status:
                
                    booking.status !== 'true' ?  'pending' : 'approved',                                                                                                               
                  
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
            <h1 className="my-4">My Appointments</h1>
            <MDBDataTable
             data={setAppointments()}
             className="px-3"
             bordered
             striped
             hover
            />

        </div>
    )
}

export default MyAppointments

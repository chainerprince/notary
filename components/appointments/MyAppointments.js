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

    }, [dispatch, error])

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
                    label: "Notifier",
                    field:'notary',
                    sort:'asc'
                },
                {
                    label: "Document",
                    field:'document',
                    sort:'asc'
                },
                {
                    label: "Approve Status",
                    field:'status',
                    sort:'asc'
                }                
            ],
            rows:[]
        }
        
        bookings && bookings.forEach(booking => {
              data.rows.push({
                  id:booking._id,
                  date:new Date(booking.date).toLocaleString('en-UK')?.split(',')[0],
                  time:booking.date?.split(' ')[1],
                  price:`${booking.price} RWF`,
                  notary: booking?.notifier?.name,
                  document: booking.document,
                  status:
                
                    booking.status !== 'true' ?  'pending' : 'approved',                                                                                                                                                  
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

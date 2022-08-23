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

    }, [dispatch,isDeleted,deleteError])

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
                    label: "Check In",
                    field:'checkIn',
                    sort:'asc'
                },
                {
                    label: "Check Out",
                    field:'checkOut',
                    sort:'asc'
                },
                {
                    label: "Amount Paid",
                    field:'amountPaid',
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
                  checkIn:new Date(booking.checkInDate).toLocaleString('en-UK'),
                  checkOut:new Date(booking.checkOutDate).toLocaleString('en-US'),
                  amountPaid:`$${booking.amountPaid}`,
                  action:
                  <>
                   <Link href={`/admin/appointments/${booking._id}`}>
                      <a  className="btn btn-primary">
                          <i className="fa fa-eye"></i>
                          
                      </a>
                   </Link> 
                   <button className="btn-success btn mx-2" onClick={()=>downloadInvoice(booking)}>
                       <i className="fa fa-download"></i>
                   </button>
                   <button 
                   className="btn-danger btn mx-2"
                   onClick={_=>deleteHandler(booking._id)}
                   >
                       <i className="fa fa-trash"></i>
                   </button>
                  </>
              })
        });


        return data;
    }


    const downloadInvoice = async (booking) => {

        const data = {
            "documentTitle": "Booking INVOICE", //Defaults to INVOICE
            "currency": "USD",
            "taxNotation": "vat", //or gst
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            "logo": "https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png",
            "sender": {
                "company": "Book IT",
                "address": "13th Street. 47 W 13th St",
                "zip": "10001",
                "city": "New York",
                "country": "United States"
            },
            "client": {
                "company": `${booking.user.name}`,
                "address": `${booking.user.email}`,
                "zip": "",
                "city": `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
                "country": `Check In: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`
            },
            "invoiceNumber": `${booking._id}`,
            "invoiceDate": `${new Date(Date.now()).toLocaleString('en-US')}`,
            "products": [
                {
                    "quantity": `${booking.daysOfStay}`,
                    "description": `${booking.room.name}`,
                    "tax": 0,
                    "price": booking.room.pricePerNight
                }
            ],
            "bottomNotice": "This is auto generated Invoice of your booking on Book IT."
        };

        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)

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

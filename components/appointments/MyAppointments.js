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
                   <button className="btn-success btn mx-2" onClick={()=>downloadInvoice(booking)}>
                       <i className="fa fa-download"></i>
                   </button>
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
                "company": `${booking?.user?.name ?? ''}`,
                "address": `${booking?.user?.email}`,
                "zip": "",
                "city": `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
                "country": `Check In: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`
            },
            "invoiceNumber": `${booking._id}`,
            "invoiceDate": `${new Date(Date.now()).toLocaleString('en-US')}`,
            "products": [
                {
                    "document": `${booking?.document ?? ''}`,
                    "description": `${ booking?.notifier?.name ?? ''}`,
                    "tax": 0,
                    "price": booking?.price ?? ''
                }
            ],
            "bottomNotice": "This is auto generated Invoice of your booking on Book IT."
        };

        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)

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

import { MDBDataTable } from 'mdbreact';
import React,{useEffect} from 'react'
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors } from '../../state/actions/bookingAction';
import easyinvoice from 'easyinvoice';




const MyBookings = () => {
    const dispatch = useDispatch();
    const {bookings,error} = useSelector(state=>state.bookings)

    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch])

    const setBookings = () => {
        const data = {
            columns :[
                {
                    label: "Booking Id",
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
                   <Link href={`/bookings/${booking._id}`}>
                      <a  className="btn btn-primary">
                          <i className="fa fa-eye"></i>
                          
                      </a>
                   </Link>
                   <button className="btn-success btn mx-2" onClick={()=>downloadInvoice(booking)}>
                       <i className="fa fa-download"></i>
                   </button>
                  </>
              })
        });


        return data;
    }

    const downloadInvoice = async (booking) => {
         console.log(booking)
         console.log(booking.room)
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
                    "description": `${ booking.room.name}`,
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
            <h1 className="my-4">My Bookings</h1>
            <MDBDataTable
             data={setBookings()}
             className="px-3"
             bordered
             striped
             hover
            />

        </div>
    )
}

export default MyBookings
import React from 'react'
import {getSession} from 'next-auth/client'


import Layout from '../../../components/layout/Layout'

import { wrapper } from '../../../state/store';
import { bookingDetails } from '../../../state/actions/appointmentAction'
import BookingDetail from '../../../components/appointments/AppointmentDetail';

const BookingDetails = () => {
    return (
        <div>  
           <Layout>
               <BookingDetail />
           </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store,params }) => {
    const session = await getSession({ req })

    if (!session || session.user.role !== 'notifier') {
        return {
            redirect: { 
                destination: '/login',
                permanent: false 
            }
        }
    }

    await store.dispatch(bookingDetails(req.headers.cookie, req,params.id))

})

export default BookingDetails

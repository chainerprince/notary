import React from 'react'
import {getSession} from 'next-auth/client'


import Layout from '../../components/layout/Layout'
import MyAppointments from '../../components/appointments/MyAppointments'
import { wrapper } from '../../state/store';
import { bookings } from '../../state/actions/appointmentAction'

const MyBookingsPage = () => {
    return (
        <div>  
           <Layout>
               <MyAppointments/>
           </Layout>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store }) => {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false 
            }
        }
    }

    await store.dispatch(bookings(req.headers.cookie, req))

})

export default MyBookingsPage

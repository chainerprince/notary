import React from 'react'
import {getSession, session} from 'next-auth/client'


import Layout from '../../../components/layout/Layout'

import AllBookings from '../../../components/admin/AllBookings'

const AllBookingsPage = () => {
    return (
        <div>
           <Layout>
               <AllBookings  />
           </Layout>
        </div>
    )
}

export async function getServerSideProps(context){
       const session = await getSession({req:context.req})
       if(!session || session.user.role !== 'admin'){
           return {
               redirect:{
                   destination:"/login",
                   permanent:false
               }
           }
       }

       return {
           props:{
               
           }
       }
}

export default AllBookingsPage

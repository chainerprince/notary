import React from 'react'
import {getSession, session} from 'next-auth/client'


import Layout from '../../../components/layout/Layout'

import Allappointments from '../../../components/appointments/NotifierAppointments'

const AllappointmentsPage = () => {
    return (
        <div>
           <Layout>
               <Allappointments  />
           </Layout>
        </div>
    )
}

export async function getServerSideProps(context){
       const session = await getSession({req:context.req})
       if(!session || session.user.role !== 'notifier'){
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

export default AllappointmentsPage

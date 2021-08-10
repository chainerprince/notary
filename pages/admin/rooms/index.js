import React from 'react'
import {getSession, session} from 'next-auth/client'


import Layout from '../../../components/layout/Layout'
import AllRooms from '../../../components/admin/AllRooms'

const AllRoom = () => {
    return (
        <div>
           <Layout>
               <AllRooms  />
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

export default AllRoom

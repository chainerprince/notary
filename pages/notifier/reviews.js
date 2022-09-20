import React from 'react'
import {getSession, session} from 'next-auth/client'
import Layout from '../../components/layout/Layout'
import Reviews from '../../components/notifier/Reviews'
const Review = () => {
    return (
        <div>
           <Layout>
               <Reviews  />
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

export default Review

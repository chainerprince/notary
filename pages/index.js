import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Home from '../components/Home'
import Layout from '../components/layout/Layout'

import { wrapper } from '../state/store';
import { getRooms } from '../state/actions/roomAction'


export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({req,store,query})=>{
    await store.dispatch(getRooms(req,query.page,query.location,query.guests,query.category))
    
})

// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import Layout from '../../components/layout/Layout'

import { wrapper } from '../../state/store';
import { getRoomDetails } from '../../state/actions/notifierAction'
import RoomDetails from '../../components/room/RoomDetails'


export default function Index() {
  return (
    <Layout>
      <RoomDetails />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({req,store,params})=>{
    await store.dispatch(getRoomDetails(req,params.id))
    
})

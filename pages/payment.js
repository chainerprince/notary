import { getSession } from 'next-auth/client'
import Payment from '../components/Payment'
import Layout from '../components/layout/Layout'

// import { wrapper } from '../state/store';
// import { getRooms } from '../state/actions/roomAction'


export default function search() {
  return (
    <Layout>
      <Payment />
    </Layout>
  )
}

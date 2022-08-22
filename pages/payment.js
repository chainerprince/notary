import { getSession } from 'next-auth/client'
import Payment from '../components/Payment'
import Layout from '../components/layout/Layout'

export default function search() {
  return (
    <Layout>
      <Payment />
    </Layout>
  )
}

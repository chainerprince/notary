import { getSession } from 'next-auth/client'
import Register from '../../components/application/form'
import Layout from '../../components/layout/Layout'



export default function search() {
  return (
    <Layout>
      <Register />
    </Layout>
  )
}


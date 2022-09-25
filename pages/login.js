import { getSession } from 'next-auth/client'
import Login from '../components/Auth/Login'
import Layout from '../components/layout/Layout'

export default function search() {
  return (
    <Layout>
      <Login />
    </Layout>
  )
}

export async function getServerSideProps(context){
  const session = await getSession({req:context.req})
  if(session){
      return {
          redirect:{
              destination:"/",
              permanent:false
          }
      }
  }

  return {
      props:{}
  }
}

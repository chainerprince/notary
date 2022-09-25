
import { wrapper } from '../../state/store';
import { getSession } from 'next-auth/client'
import Register from '../../components/application/form'
import Layout from '../../components/layout/Layout'
import { bookingDetails } from '../../state/actions/appointmentAction'


export default function search() {
  return (
    <Layout>
      <Register />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ req, store,params }) => {
    const session = await getSession({ req })    
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false 
            }
        }
    }

  req.params?.id &&  await store.dispatch(bookingDetails(req.headers.cookie, req.params.id))

})
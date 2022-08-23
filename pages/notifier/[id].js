

import Layout from '../../components/layout/Layout'

import { wrapper } from '../../state/store';
import { getNotifierDetails } from '../../state/actions/notifierAction'
import NotifierDetails from '../../components/notifier/NotifierDetails'


export default function Index() {
  return (
    <Layout>
      <NotifierDetails />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({req,store,params})=>{
    await store.dispatch(getNotifierDetails(req,params.id))
    
})

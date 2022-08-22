
import styles from '../styles/Home.module.css'
import Home from '../components/Home'
import Layout from '../components/layout/Layout'

import { wrapper } from '../state/store';
import { getNotifiers  } from '../state/actions/notifierAction'


export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({req,store,query})=>{
    await store.dispatch(getNotifiers(req,query.page,query.location,query.document))
    
})

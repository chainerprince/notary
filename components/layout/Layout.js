import React from 'react'
import Head from 'next/head'
import Header from './Header';
import { Footer } from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



const Layout = ({children}) => {
    return (
        <div>
      <Head>
        <title>Notary Services</title>
        <meta name="description" content="The best hotel booking application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
       
       <Header />
       <ToastContainer />
       {children}
       {/* <Footer /> */}

        </div>
    )
}

export default Layout;

import React from 'react'
import Link from 'next/link'
import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const NotifierItem = ({notifier}) => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
  const {user} = useSelector(state=>state.login);
  
  
    return (
        <div className="col-sm-12   col-md-6 col-lg-3 my-3">
        <div className="card p-2">
          <div >
       <Image
            className=" mx-auto"
            src={notifier.profileImage ?? 'https://images.unsplash.com/photo-1657879438367-f28d3855b9c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'}
            height = {300}
            alt="notifier"
            width={400}
          />
    </div>
          
          <div className="card-body d-flex  flex-column">
            <h5 className="card-title">
              <Link href={`/notifier/${notifier._id}`}>

                  <a className=" text-sm">{notifier.name.length> 20 ? notifier.name.slice(0,20) + "..." : notifier.name}</a>
              </Link>
            </h5>

            <div className="ratings mt-auto mb-3">
              <p className="card-text"><b>{notifier.pricePerDocument}</b> RWF / documents</p>
              <p className="card-text"><b>{notifier.address.city ?? '' + " " +notifier.address.district + " " + notifier.address.sector}</b> </p>

              <div className="rating-outer">
                  <div className="rating-inner" 
                   style={{width:`${(notifier.ratings / 5) * 100}%`}}
                   
                  ></div>
              </div>
              <span id="no_of_reviews">({notifier.numOfReviews} Reviews)</span>
          </div>

         {
          (user?.role == 'admin') || (user?.role == 'notifier')  ? null: ( <button className="btn btn-block rounded  ">
              
              <Link  href={`/notifier/${notifier._id}`}>
                 <a className="text-white bg-choco p-2 ">Book Appointment</a> 
              </Link>
          </button>)
         }
        </div>
        </div>
        </div>
    )
}

export default NotifierItem

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
  console.log(notifier,'the notifier')
  
    return (
        <div className="col-sm-12   col-md-6 col-lg-3 my-3">
        <div className="card p-2">
          <div >
       <Image
            className=" mx-auto"
            src={notifier?.profileImage?.url ?? '/download.png'}
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

         
           <button className="btn btn-block rounded  ">
              
              <Link  href={`/notifier/${notifier._id}`}>
                 <a className="text-white bg-choco p-2 ">Book Appointment</a> 
              </Link>
          </button>
         
        </div>
        </div>
        </div>
    )
}

export default NotifierItem

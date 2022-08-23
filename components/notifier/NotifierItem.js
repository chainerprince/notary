import React from 'react'
import Link from 'next/link'
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const NotifierItem = ({notifier}) => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
    return (
        <div className="col-sm-12   col-md-6 col-lg-3 my-3">
        <div className="card p-2">
          <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
          
          <div className="card-body d-flex  flex-column">
            <h5 className="card-title">
              <Link href={`/notifier/${notifier._id}`}>

                  <a className=" text-sm">{notifier.name.length> 20 ? notifier.name.slice(0,20) + "..." : notifier.name}</a>
              </Link>
            </h5>

            <div className="ratings mt-auto mb-3">
              <p className="card-text"><b>{notifier.pricePerDocument}</b> RWF / documents</p>

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

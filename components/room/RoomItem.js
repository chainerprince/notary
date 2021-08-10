import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const RoomItem = ({room}) => {
    return (
        <div className="col-sm-12  col-md-6 col-lg-3 my-3">
        <div className="card p-2">
          <Image
            className="card-img-top mx-auto"
            src={room.images[0].url}
            height = {170}
            width = ""
          />
          <div className="card-body d-flex bg-dark flex-column">
            <h5 className="card-title">
              <Link href={`/rooms/${room._id}`}>
                  <a class="text-danger text-sm">{room.name}</a>
              </Link>
            </h5>

            <div className="ratings mt-auto mb-3">
              <p className="card-text"><b>{room.pricePerNight}</b> / night</p>

              <div className="rating-outer">
                  <div className="rating-inner" 
                   style={{width:`${(room.ratings / 5) * 100}%`}}
                  ></div>
              </div>
              <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
          </div>

          <button className="btn btn-block bg-danger ">
              
              <Link  href={`/rooms/${room._id}`}>
                 <a className="text-white">View Details</a> 
              </Link>
          </button>
        </div>
        </div>
        </div>
    )
}

export default RoomItem

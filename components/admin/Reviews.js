import { MDBDataTable } from 'mdbreact';
import React,{useEffect,useState} from 'react'
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import Loader from '../layout/Loader';


import { getReviews,clearErrors, deleteReview } from '../../state/actions/roomAction';
import { DELETE_REVIEW_RESET } from '../../state/constants/roomConstants';

const Reviews = () => {
    const dispatch = useDispatch();
    const [roomId,setRoomId] = useState('')
    const router = useRouter();
    const {reviews,loading,error} = useSelector(state=>state.reviews)
    
    const {isDeleted,error:deleteError}  = useSelector(state=>state.deleteReview)
    

    useEffect(() => {
        
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
        if(roomId !== ''){
            dispatch(getReviews(roomId))
        }
        if(deleteError){
            toast.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            toast.success("Review is deleted")
            dispatch({type:DELETE_REVIEW_RESET})
        }

    }, [dispatch,roomId,deleteError,isDeleted])

    


  const deleteHandler = (id) =>{
    
      dispatch(deleteReview(id,roomId));
      
  }
  const setReviews = () => {
    const data = {
        columns: [
            {
                label: 'Review ID',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'Rating',
                field: 'rating',
                sort: 'asc'
            },
            {
                label: 'Comment',
                field: 'comment',
                sort: 'asc'
            },
            {
                label: 'User',
                field: 'user',
                sort: 'asc'
            },
            {
                label: 'Actions',
                field: 'actions',
                sort: 'asc'
            }

        ],
        rows: []
    }

    reviews && reviews.forEach(review => {
        data.rows.push({
            id: review._id,
            rating: review.rating,
            comment: review.comment,
            user: review.name,
            actions:
            // 
                <button 
                className="btn btn-danger mx-2"
                onClick={() => deleteHandler(review._id)}
                >
                    <i className="fa fa-trash"></i>
                </button>
        })
    })

    return data;

}

    return (
        <div className="container container-fluid">
                       <div className="row justify-content-center mt-5">
                <div className="col-5">
                    <form>
                        <div className="form-group">
                            <label htmlFor="roomId_field">Enter Room ID</label>
                            <input
                                type="email"
                                id="roomId_field"
                                className="form-control"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>

            {
                reviews && reviews.length > 0 ?
                <MDBDataTable
                data={setReviews()}
                className='px-3'
                bordered
                striped
                hover
            />
                :

                <div className="alert alert-danger mt-5 text-center">
                    Zero Reviews Available
                </div>
            }

    </div>
    )
}

export default Reviews

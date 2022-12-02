import { MDBDataTable } from 'mdbreact';
import React,{useEffect,useState} from 'react'
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';



import { getReviews,clearErrors, deleteReview } from '../../state/actions/notifierAction';
// import { DELETE_REVIEW_RESET } from '../../state/constants/notifierConstants';

const Reviews = () => {
    const dispatch = useDispatch();    
    const router = useRouter();
    const {reviews,loading,error} = useSelector(state=>state.reviews)
    
    const {isDeleted,error:deleteError}  = useSelector(state=>state.deleteReview)
    const {user} = useSelector(state=>state.login)        
    useEffect(() => {        
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
            
          user?._id && dispatch(getReviews(user?._id))
        
        // if(deleteError){
        //     toast.error(deleteError)
        //     dispatch(clearErrors())
        // }

        // if(isDeleted){
        //     toast.success("Review is deleted")
        //     dispatch({type:DELETE_REVIEW_RESET})
        // }

    }, [dispatch,deleteError,isDeleted,user])

    


  const deleteHandler = (id) =>{
    
      dispatch(deleteReview(id,notifierId));
      
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
        })
    })

    return data;

}

    return (
        <div className="container container-fluid">                       
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
